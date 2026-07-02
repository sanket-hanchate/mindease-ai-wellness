import { useEffect, useState } from "react";
import WebcamFeed from "@/components/WebcamFeed";
import LivePortraitAvatar from "@/components/LivePortraitAvatar";
import "../../assets/avatar.css";
import { useNavigate } from "@tanstack/react-router";
import { useLanguage } from "@/context/LanguageContext";

export default function VideoChat() {
  const navigate = useNavigate();
  const { language } = useLanguage();
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

  const [currentSpeechText, setCurrentSpeechText] =
    useState("");


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

    const languageMap: Record<string, string> = {
      en: "en-US",
      hi: "hi-IN",
      mr: "mr-IN",
      ta: "ta-IN",
      te: "te-IN",
    };

    recognition.lang =
      languageMap[language] || "en-US";

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

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);

      let langCode = "en-US";

      switch (language) {

        case "hi":
          langCode = "hi-IN";
          break;

        case "mr":
          langCode = "mr-IN";
          break;

        case "ta":
          langCode = "ta-IN";
          break;

        case "te":
          langCode = "te-IN";
          break;

        default:
          langCode = "en-US";
      }

      let voice;

      if (language === "en") {
        voice = voices.find(
          (v) =>
            v.name.includes("Zira") ||
            v.name.includes("Female")
        );
      } else {
        voice = voices.find(
          (v) =>
            v.lang === langCode
        );
      }

      if (voice) {
        utterance.voice = voice;
      }

      utterance.lang = langCode;

      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
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
          language
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

    setCurrentSpeechText(data.reply);
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
            transition: "border 0.3s ease, box-shadow 0.3s ease", 
            overflow: "hidden",
          }}
        >
          {/* Avatar occupies 80-90% of the container height */}
          <div
            style={{
              width: "100%",
              height: "85%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LivePortraitAvatar
              isListening={isListening}
              isThinking={isThinking}
              isSpeaking={isSpeaking}
              crisisMode={crisisMode}
              text={currentSpeechText}
            />
          </div>

          {/* Floating Crisis Mode Indicator */}
          {crisisMode && (
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "#ff4444",
                color: "white",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "0.875rem",
                fontWeight: "bold",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                zIndex: 10,
              }}
            >
              🚨 Crisis Mode Activated
            </div>
          )}

          {/* BOTTOM SECTION OVERLAY */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(10px)",
              padding: "15px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              zIndex: 10,
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                }}
              >
                {crisisMode ? "Lara - Crisis Support" : "Lara"}
              </h2>
              <p
                style={{
                  margin: "2px 0 0 0",
                  color: "#ccc",
                  fontSize: "0.875rem",
                }}
              >
                Mental Wellness Companion
              </p>
            </div>
            
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: isSpeaking ? "rgba(139, 92, 246, 0.2)" : isListening ? "rgba(34, 197, 94, 0.2)" : isThinking ? "rgba(245, 158, 11, 0.2)" : "rgba(255, 255, 255, 0.1)",
                padding: "6px 14px",
                borderRadius: "20px",
                border: `1px solid ${isSpeaking ? "#8b5cf6" : isListening ? "#22c55e" : isThinking ? "#f59e0b" : "rgba(255, 255, 255, 0.2)"}`,
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: isSpeaking ? "#8b5cf6" : isListening ? "#22c55e" : isThinking ? "#f59e0b" : "#3b82f6",
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                {isListening
                  ? "Listening..."
                  : isThinking
                    ? "Thinking..."
                    : isSpeaking
                      ? "Speaking..."
                      : "Ready"}
              </span>
            </div>
          </div>
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