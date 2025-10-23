import "./App.css";
import { useState, useRef } from "react";
import { motion } from "motion/react";

const MOUTH_PATHS = {
  closed: "M 4,10 A 3,2 0 0 0 12,10 L 4,10",
  open: "M 4,10 A 3,3 0 0 0 12,10 L 4,10",
};

function App() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"speak" | "ask">("speak");
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const askAI = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful robot assistant. Keep your responses concise and friendly, under 100 words.",
              },
              {
                role: "user",
                content: text,
              },
            ],
            max_tokens: 150,
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      speakText(aiResponse);
    } catch (error) {
      console.error("AI Error:", error);
      speakText("Sorry, I couldn't process your question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const speakText = (textToSpeak: string) => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.8;
    utterance.pitch = 0.5;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current = window.speechSynthesis;
    synthRef.current.speak(utterance);
  };

  const speak = () => {
    if (!text.trim()) return;
    speakText(text);
  };

  return (
    <div className="container">
      <svg
        className={`head ${isSpeaking ? "speaking" : ""}`}
        viewBox="0 0 16 16"
      >
        <circle className="face" cx="8" cy="8" r="7" />
        <ellipse className="eye" cx="5" cy="6.5" rx="1.5" ry="2.5" />
        <ellipse className="pupil" cx="5" cy="7.5" rx="0.375" ry="0.625" />
        <ellipse className="eye" cx="11" cy="6.5" rx="1.5" ry="2.5" />
        <ellipse className="pupil" cx="11" cy="7.5" rx="0.375" ry="0.625" />
        <motion.path
          className="mouth"
          initial={{ d: MOUTH_PATHS.closed }}
          animate={{
            d: isSpeaking ? MOUTH_PATHS.open : MOUTH_PATHS.closed,
          }}
          transition={{
            duration: 0.3,
            repeat: isSpeaking ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        {/* top teeth */}
        <line className="tooth" x1="5.1" y1="10.3" x2="5.1" y2="10.8" />
        <line className="tooth" x1="6.2" y1="10.3" x2="6.2" y2="11" />
        <line className="tooth" x1="7.4" y1="10.3" x2="7.4" y2="11.2" />
        <line className="tooth" x1="8.6" y1="10.3" x2="8.6" y2="11.2" />
        <line className="tooth" x1="9.8" y1="10.3" x2="9.8" y2="11" />
        <line className="tooth" x1="10.9" y1="10.3" x2="10.9" y2="10.8" />

        {/* bottom teeth */}
        <motion.line
          className="tooth"
          x1="5.1"
          y1="11.1"
          x2="5.1"
          y2="11.9"
          animate={{
            y1: isSpeaking ? 12.0 : 11.1,
            y2: isSpeaking ? 12.8 : 11.9,
          }}
          transition={{
            duration: 0.3,
            repeat: isSpeaking ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.line
          className="tooth"
          x1="6.2"
          y1="11.3"
          x2="6.2"
          y2="12.5"
          animate={{
            y1: isSpeaking ? 12.2 : 11.3,
            y2: isSpeaking ? 13.4 : 12.5,
          }}
          transition={{
            duration: 0.3,
            repeat: isSpeaking ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.line
          className="tooth"
          x1="7.4"
          y1="11.5"
          y2="12.7"
          x2="7.4"
          animate={{
            y1: isSpeaking ? 12.4 : 11.5,
            y2: isSpeaking ? 13.6 : 12.7,
          }}
          transition={{
            duration: 0.3,
            repeat: isSpeaking ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.line
          className="tooth"
          x1="8.6"
          y1="11.5"
          x2="8.6"
          y2="12.7"
          animate={{
            y1: isSpeaking ? 12.4 : 11.5,
            y2: isSpeaking ? 13.6 : 12.7,
          }}
          transition={{
            duration: 0.3,
            repeat: isSpeaking ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.line
          className="tooth"
          x1="9.8"
          y1="11.3"
          x2="9.8"
          y2="12.7"
          animate={{
            y1: isSpeaking ? 12.2 : 11.3,
            y2: isSpeaking ? 13.6 : 12.7,
          }}
          transition={{
            duration: 0.3,
            repeat: isSpeaking ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.line
          className="tooth"
          x1="10.9"
          y1="11.1"
          x2="10.9"
          y2="12.1"
          animate={{
            y1: isSpeaking ? 12.0 : 11.1,
            y2: isSpeaking ? 12.8 : 12.1,
          }}
          transition={{
            duration: 0.3,
            repeat: isSpeaking ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.path
          className="lips"
          initial={{ d: MOUTH_PATHS.closed }}
          animate={{
            d: isSpeaking ? MOUTH_PATHS.open : MOUTH_PATHS.closed,
          }}
          transition={{
            duration: 0.3,
            repeat: isSpeaking ? Infinity : 0,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </svg>

      <div className="controls">
        <div className="mode-toggle">
          <button
            className={`mode-button ${mode === "speak" ? "active" : ""}`}
            onClick={() => setMode("speak")}
          >
            Speak
          </button>
          <button
            className={`mode-button ${mode === "ask" ? "active" : ""}`}
            onClick={() => setMode("ask")}
          >
            Ask AI
          </button>
        </div>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            mode === "speak"
              ? "Enter text for the robot to speak..."
              : "Ask the robot a question..."
          }
          className="text-input"
        />

        <button
          onClick={mode === "speak" ? speak : askAI}
          disabled={!text.trim() || isLoading}
          className="action-button"
        >
          {isLoading
            ? "Thinking..."
            : isSpeaking
            ? "Speaking..."
            : mode === "speak"
            ? "Say it"
            : "Ask"}
        </button>
      </div>
    </div>
  );
}

export default App;
