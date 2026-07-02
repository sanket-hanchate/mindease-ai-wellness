import { useEffect, useRef, useState } from "react";
import laraAvatar from "../../assets/lara.png";

interface LivePortraitAvatarProps {
  isListening: boolean;
  isThinking: boolean;
  isSpeaking: boolean;
  crisisMode: boolean;
  text?: string;
}

export default function LivePortraitAvatar({
  isListening,
  isSpeaking,
  text = "",
}: LivePortraitAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  
  // Animation states
  const [imageLoaded, setImageLoaded] = useState(false);

  // References for keeping track of the loop states
  const isSpeakingRef = useRef(isSpeaking);
  const keyframesRef = useRef<number[]>([]);
  const keyframeIndexRef = useRef(0);
  const textRef = useRef(text);

  // Mouth openness values (0 = closed, 1 = open)
  const currentMouthOpenness = useRef(0);
  const targetMouthOpenness = useRef(0);
  const lastKeyframeTime = useRef(0);

  // Blinking state
  const isBlinking = useRef(false);
  const nextBlinkTime = useRef(0);
  const blinkEndTime = useRef(0);

  // Synchronize refs with props
  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  // Fetch keyframes from backend when speaking starts
  useEffect(() => {
    if (isSpeaking && text) {
      const fetchKeyframes = async () => {
        try {
          const token = localStorage.getItem("mindease.token");
          const res = await fetch("http://localhost:5000/api/liveportrait/animate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ text }),
          });
          const data = await res.json();
          if (data.success && data.keyframes) {
            keyframesRef.current = data.keyframes;
            keyframeIndexRef.current = 0;
            console.log("LivePortrait: Loaded", data.keyframes.length, "keyframes");
          }
        } catch (error) {
          console.error("LivePortrait: Failed to fetch keyframes, falling back to procedural speaking", error);
          keyframesRef.current = [];
        }
      };

      fetchKeyframes();
    } else {
      // Reset keyframes when not speaking
      keyframesRef.current = [];
      keyframeIndexRef.current = 0;
      targetMouthOpenness.current = 0;
    }
  }, [isSpeaking, text]);

  // Load avatar image
  useEffect(() => {
    const img = new Image();
    img.src = laraAvatar;
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
      console.log("LivePortrait: Avatar image loaded successfully");
    };
  }, []);

  // Main canvas animation loop
  useEffect(() => {
    let animationFrameId: number;
    nextBlinkTime.current = Date.now() + 2000 + Math.random() * 3000;

    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = imageRef.current;

      if (!canvas || !ctx || !img || !imageLoaded) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const now = Date.now();

      // Clear Canvas
      ctx.clearRect(0, 0, 1024, 1024);

      // 1. Draw base Lara image (size 1024x1024)
      ctx.drawImage(img, 0, 0, 1024, 1024);

      // 2. Handle Blink Logic
      if (now > nextBlinkTime.current && !isBlinking.current) {
        isBlinking.current = true;
        blinkEndTime.current = now + 120; // Blink lasts 120ms
      }

      if (isBlinking.current) {
        if (now > blinkEndTime.current) {
          isBlinking.current = false;
          nextBlinkTime.current = now + 3000 + Math.random() * 4000; // Next blink in 3-7 seconds
        } else {
          // Draw Eyelids (Skin-colored circles) over eyes
          // Left Eye center: (428, 340), Right Eye center: (596, 340) in 1024x1024
          ctx.save();
          
          const drawEyelid = (cx: number, cy: number) => {
            const grad = ctx.createRadialGradient(cx, cy - 10, 10, cx, cy, 28);
            grad.addColorStop(0, "#dfaf97");
            grad.addColorStop(1, "#cca088");
            
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.ellipse(cx, cy, 42, 23, 0, 0, 2 * Math.PI);
            ctx.fill();

            // Lash line
            ctx.strokeStyle = "#4d3429";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.ellipse(cx, cy + 5, 42, 11, 0, 0.1 * Math.PI, 0.9 * Math.PI);
            ctx.stroke();
          };

          drawEyelid(428, 340);
          drawEyelid(596, 340);
          ctx.restore();
        }
      }

      // 3. Handle Mouth Lip Sync / Speaking Animation
      if (isSpeakingRef.current) {
        if (keyframesRef.current.length > 0) {
          // Advance keyframe index every 50ms
          if (now - lastKeyframeTime.current > 50) {
            const idx = keyframeIndexRef.current;
            if (idx < keyframesRef.current.length) {
              targetMouthOpenness.current = keyframesRef.current[idx];
              keyframeIndexRef.current = idx + 1;
            } else {
              // Loop keyframes if we run out but are still speaking (fallback)
              keyframeIndexRef.current = 0;
            }
            lastKeyframeTime.current = now;
          }
        } else {
          // Procedural fallback speaking animation using sine wave + random noise
          if (now - lastKeyframeTime.current > 60) {
            const baseSin = Math.sin(now * 0.015);
            const noise = Math.random() * 0.35;
            targetMouthOpenness.current = Math.max(0, baseSin * 0.5 + 0.5 + noise - 0.2);
            lastKeyframeTime.current = now;
          }
        }
      } else {
        targetMouthOpenness.current = 0;
      }

      // Interpolate mouth openness smoothly (inertia effect)
      currentMouthOpenness.current += (targetMouthOpenness.current - currentMouthOpenness.current) * 0.25;
      const openness = currentMouthOpenness.current;

      // Draw speaking lips warping if openness > 0.02
      if (openness > 0.02) {
        ctx.save();

        // A. Draw Dark Inner Mouth Cavity
        // Mouth center: (512, 475)
        ctx.fillStyle = "#330b0b";
        ctx.beginPath();
        ctx.ellipse(512, 475, 60, 23 * openness, 0, 0, 2 * Math.PI);
        ctx.fill();

        // B. Draw Teeth (Subtle light line inside mouth cavity)
        if (openness > 0.3) {
          ctx.fillStyle = "#fcf9f6";
          ctx.beginPath();
          ctx.ellipse(512, 475 - 7 * openness, 46, 5.5 * openness, 0, 0, 2 * Math.PI);
          ctx.fill();
        }

        // C. Draw Warped Upper & Lower Lips by cropping from base image
        // Base image crop coordinates for mouth:
        // Center: x = 512, y = 475. Width = 180, Height = 70 in 1024x1024
        // Upper lip: y = 440 to 475, Height = 35
        // Lower lip: y = 475 to 510, Height = 35

        // Upper Lip Crop & Draw (Shifted slightly UP during speech)
        ctx.beginPath();
        ctx.rect(420, 410, 180, 65);
        ctx.clip();
        ctx.drawImage(
          img,
          420, 440, 180, 35, // Source Upper Lip
          420, 440 - 5.5 * openness, 180, 35 // Destination Upper Lip
        );

        ctx.restore();
        ctx.save();

        // Lower Lip Crop & Draw (Shifted DOWN during speech)
        ctx.beginPath();
        ctx.rect(420, 475, 180, 70);
        ctx.clip();
        ctx.drawImage(
          img,
          420, 475, 180, 35, // Source Lower Lip
          420, 475 + 10.2 * openness, 180, 35 // Destination Lower Lip
        );

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [imageLoaded]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        width={1024}
        height={1024}
        className="avatar"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  );
}
