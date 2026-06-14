import { useEffect, useState } from "react";
import WebcamFeed from "@/components/WebcamFeed";
import laraAvatar from "../../assets/lara.png";
import "../../assets/avatar.css";
import { useNavigate } from "@tanstack/react-router";

export default function VideoChat() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<any[]>([]);
  const [conversationId, setConversationId] = useState<string>("");
  const [isListening, setIsListening] =
    useState(false);

  const [isThinking, setIsThinking] =
    useState(false);

  const [isSpeaking, setIsSpeaking] =
    useState(false);

  const [crisisMode, setCrisisMode] =
    useState(false);




  const createConversation =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "mindease.token"
          );

        const res = await fetch(
          "http://localhost:5000/api/conversations",
          {
            method: "POST",
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await res.json();

        if (data.crisisMode) {

          setCrisisMode(true);


        } else {

          setCrisisMode(false);

        }

        setConversationId(
          data._id
        );

        console.log(
          "Video Conversation:",
          data._id
        );

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {
    createConversation();
  }, []);

  const startListening = () => {

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {

      alert(
        "Speech Recognition not supported"
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;
    setIsListening(true);

    recognition.start();

    recognition.onend = () => {
      setIsListening(false);
    };


    recognition.onresult = async (
      event: any
    ) => {

      const transcript =
        event.results[0][0].transcript;
      console.log("Transcript:", event.results[0][0].transcript);

      await sendMessage(transcript);
    };
  };

  const speak = (text: string) => {

    setIsSpeaking(true);

    const utterance =
      new SpeechSynthesisUtterance(text);

    const setVoiceAndSpeak = () => {

      const voices =
        window.speechSynthesis.getVoices();

      const hindiVoice =
        voices.find(
          v =>
            v.name === "Google हिन्दी"
        );

      if (hindiVoice) {

        console.log(
          "Using Voice:",
          hindiVoice.name
        );

        utterance.voice =
          hindiVoice;

        utterance.lang =
          "hi-IN";
      }

      utterance.rate = 1.05;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.cancel();

      window.speechSynthesis.speak(
        utterance
      );
    };

    if (
      window.speechSynthesis
        .getVoices().length === 0
    ) {

      window.speechSynthesis.onvoiceschanged =
        setVoiceAndSpeak;

    } else {

      setVoiceAndSpeak();
    }
  };

  const sendMessage = async (
    message: string
  ) => {

    const token =
      localStorage.getItem("mindease.token");

    setIsThinking(true);

    const res = await fetch(
      "http://localhost:5000/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
          conversationId,
        }),
      }
    );
    setIsThinking(false);

    const data =
      await res.json();

    if (data.crisisMode) {

      setCrisisMode(true);

    }

    if (!res.ok) {

      console.log(data);

      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: message,
      },
      {
        role: "ai",
        text: data.reply,
      },
    ]);

    speak(data.reply);
  };


  const endCall = () => {

    window.speechSynthesis.cancel();

    setIsListening(false);
    setIsSpeaking(false);
    setIsThinking(false);

    navigate({
      to: "/",
    });
  };


  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f5f7fa",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Lara Video Chat
      </h1>

      {/* VIDEO AREA */}

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >

        {/* USER CAMERA */}

        <div
          style={{
            background: "#000",
            borderRadius: "15px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <WebcamFeed />

          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
              background: "rgba(0,0,0,0.6)",
              color: "white",
              padding: "5px 12px",
              borderRadius: "20px",
            }}
          >
            You
          </div>
        </div>

        {/* AI VIDEO */}

        <div
          style={{
            background:
              crisisMode
                ? "#8B0000"
                : "#111",
            borderRadius: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "white",
            position: "relative",
          }}
        >
          <img
            src={laraAvatar}
            alt="Lara"
            className={
              isSpeaking
                ? "avatar avatar-speaking"
                : "avatar"
            }
            style={{
              border: crisisMode
                ? "5px solid #ff4444"
                : isListening
                  ? "5px solid #22c55e"
                  : isThinking
                    ? "5px solid #f59e0b"
                    : isSpeaking
                      ? "5px solid #8b5cf6"
                      : "5px solid #3b82f6",

              boxShadow: crisisMode
                ? "0 0 40px #ff4444"
                : isListening
                  ? "0 0 30px #22c55e"
                  : isThinking
                    ? "0 0 30px #f59e0b"
                    : isSpeaking
                      ? "0 0 35px #8b5cf6"
                      : "0 0 20px #3b82f6",
            }}
          />

          <h2
            style={{
              marginTop: "20px",
              marginBottom: "5px",
            }}
          >
            {
              crisisMode
                ? "Lara - Crisis Support"
                : "Lara"
            }
          </h2>

          <p
            style={{
              color: "#ccc",
              marginBottom: "15px",
            }}
          >
            AI Mental Wellness Companion
          </p>

          {
            crisisMode && (
              <div
                style={{
                  background: "#ff4444",
                  color: "white",
                  padding: "10px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                }}
              >
                🚨 Crisis Mode Activated
              </div>
            )
          }

          <p>
            {isListening
              ? "Listening..."
              : isThinking
                ? "Thinking..."
                : isSpeaking
                  ? "Speaking..."
                  : "Ready"}
          </p>
        </div>
      </div>

      {/* BUTTON */}

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "15px",
        }}
      >
        <button
          onClick={startListening}
          style={{
            flex: 1,
            padding: "18px",
            fontSize: "20px",
            borderRadius: "12px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          🎤 Talk To Lara
        </button>

        <button
          onClick={endCall}
          style={{
            flex: 1,
            padding: "18px",
            fontSize: "20px",
            borderRadius: "12px",
            border: "none",
            background: "#ef4444",
            color: "white",
            cursor: "pointer",
          }}
        >
          📞 End Call
        </button>
      </div>
    </div>
  );
}