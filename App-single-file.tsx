import React, { useState, useRef, useCallback } from "react";
import { motion } from "motion/react";

type AppMode = "speak" | "ask";

type SpeechConfig = {
  rate: number;
  pitch: number;
  volume: number;
};

type OpenAIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OpenAIRequest = {
  model: string;
  messages: OpenAIMessage[];
  max_tokens: number;
  temperature: number;
};

type OpenAIResponse = {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
};

const MOUTH_PATHS = {
  closed: "M 4,10 A 3,2 0 0 0 12,10 L 4,10",
  open: "M 4,10 A 3,3 0 0 0 12,10 L 4,10",
};

const TOOTH_CONFIGS = [
  { x: 5.1, topY: 10.3, topYEnd: 10.8, bottomY: 11.1, bottomYEnd: 11.9 },
  { x: 6.2, topY: 10.3, topYEnd: 11, bottomY: 11.3, bottomYEnd: 12.5 },
  { x: 7.4, topY: 10.3, topYEnd: 11.2, bottomY: 11.5, bottomYEnd: 12.7 },
  { x: 8.6, topY: 10.3, topYEnd: 11.2, bottomY: 11.5, bottomYEnd: 12.7 },
  { x: 9.8, topY: 10.3, topYEnd: 11, bottomY: 11.3, bottomYEnd: 12.7 },
  { x: 10.9, topY: 10.3, topYEnd: 10.8, bottomY: 11.1, bottomYEnd: 12.1 },
];

const SPEAKING_OFFSET = 0.9;

const DEFAULT_SPEECH_CONFIG: SpeechConfig = {
  rate: 0.8,
  pitch: 0.5,
  volume: 0.8,
};

function Tooth({
  config,
  isSpeaking,
}: {
  config: (typeof TOOTH_CONFIGS)[0];
  isSpeaking: boolean;
}) {
  return (
    <>
      <line
        className="tooth"
        x1={config.x}
        y1={config.topY}
        x2={config.x}
        y2={config.topYEnd}
      />
      <motion.line
        className="tooth"
        x1={config.x}
        y1={config.bottomY}
        x2={config.x}
        y2={config.bottomYEnd}
        animate={{
          y1: isSpeaking ? config.bottomY + SPEAKING_OFFSET : config.bottomY,
          y2: isSpeaking
            ? config.bottomYEnd + SPEAKING_OFFSET
            : config.bottomYEnd,
        }}
        transition={{
          duration: 0.3,
          repeat: isSpeaking ? Infinity : 0,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </>
  );
}

function RobotHead({ isSpeaking }: { isSpeaking: boolean }) {
  return (
    <svg className={`head ${isSpeaking ? "speaking" : ""}`} viewBox="0 0 16 16">
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

      {TOOTH_CONFIGS.map((config, index) => (
        <Tooth key={index} config={config} isSpeaking={isSpeaking} />
      ))}

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
  );
}

function Controls({
  mode,
  text,
  isLoading,
  isSpeaking,
  onModeChange,
  onTextChange,
  onAction,
}: {
  mode: AppMode;
  text: string;
  isLoading: boolean;
  isSpeaking: boolean;
  onModeChange: (mode: AppMode) => void;
  onTextChange: (text: string) => void;
  onAction: () => void;
}) {
  const getButtonText = () => {
    if (isLoading) return "Thinking...";
    if (isSpeaking) return "Speaking...";
    return mode === "speak" ? "Say it" : "Ask";
  };

  const getPlaceholder = () => {
    return mode === "speak"
      ? "Enter text for the robot to speak..."
      : "Ask the robot a question...";
  };

  return (
    <div className="controls">
      <div className="mode-toggle">
        <button
          className={`mode-button ${mode === "speak" ? "active" : ""}`}
          onClick={() => onModeChange("speak")}
        >
          Speak
        </button>
        <button
          className={`mode-button ${mode === "ask" ? "active" : ""}`}
          onClick={() => onModeChange("ask")}
        >
          Ask AI
        </button>
      </div>

      <input
        type="text"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder={getPlaceholder()}
        className="text-input"
      />

      <button
        onClick={onAction}
        disabled={!text.trim() || isLoading}
        className="action-button"
      >
        {getButtonText()}
      </button>
    </div>
  );
}

function App() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<AppMode>("speak");
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const speak = useCallback((textToSpeak: string) => {
    if (!textToSpeak.trim()) return;

    if (synthRef.current) {
      synthRef.current.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = DEFAULT_SPEECH_CONFIG.rate;
    utterance.pitch = DEFAULT_SPEECH_CONFIG.pitch;
    utterance.volume = DEFAULT_SPEECH_CONFIG.volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current = window.speechSynthesis;
    synthRef.current.speak(utterance);
  }, []);

  const askAI = useCallback(async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const requestBody: OpenAIRequest = {
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
      };

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              (import.meta as any).env.VITE_OPENAI_API_KEY
            }`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data: OpenAIResponse = await response.json();
      const aiResponse = data.choices[0].message.content;

      speak(aiResponse);
    } catch (error) {
      console.error("AI Error:", error);
      speak("Sorry, I couldn't process your question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [text, speak]);

  const handleAction = () => {
    if (mode === "speak") {
      speak(text);
    } else {
      askAI();
    }
  };

  return (
    <>
      <style>{`
        :root {
          --color-bg-primary: hsl(210deg 15% 6%);
          --color-bg-secondary: hsl(210deg 15% 8%);
          --color-bg-hover: hsl(210deg 15% 12%);
          --color-bg-disabled: hsl(210deg 10% 20%);
          --color-border: hsl(210deg 10% 30%);
          --color-text-primary: white;
          --color-text-secondary: hsl(210deg 10% 50%);
          --color-text-dark: hsl(210deg 15% 6%);
          --color-accent: hsl(52, 100%, 50%);
          --color-accent-hover: hsl(52, 100%, 60%);
          --color-face: hsl(52, 100%, 50%);
          --color-eye: hsl(0, 0%, 100%);
          --color-lips: hsl(0, 99%, 35%);

          --spacing-xs: 0.5rem;
          --spacing-sm: 0.75rem;
          --spacing-md: 1rem;
          --spacing-lg: 1.5rem;
          --spacing-xl: 2rem;

          --border-radius: 0.5rem;
          --transition: all 0.2s;
        }

        * {
          box-sizing: border-box;
        }

        html {
          display: grid;
          place-content: center;
          height: 100vh;
          color: var(--color-text-primary);
          background: var(--color-bg-primary);
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-xl);
          padding: var(--spacing-xl);
        }

        .head {
          width: 300px;
          height: 300px;
        }

        .face {
          fill: var(--color-face);
          stroke-width: 1px;
        }

        .eye {
          fill: var(--color-eye);
        }

        .pupil {
          fill: var(--color-border);
          stroke: none;
        }

        .lips {
          fill: none;
          stroke: var(--color-lips);
          stroke-width: 0.75px;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .mouth {
          fill: var(--color-border);
          stroke: none;
        }

        .tooth {
          stroke: var(--color-eye);
          stroke-width: 1px;
          stroke-linecap: butt;
          stroke-linejoin: round;
        }

        .tooth:first-of-type,
        .tooth:last-of-type,
        .tooth:nth-of-type(6),
        .tooth:nth-of-type(7) {
          stroke-width: 0.75px;
        }

        .tooth:nth-of-type(2),
        .tooth:nth-of-type(5),
        .tooth:nth-of-type(8),
        .tooth:nth-of-type(11) {
          stroke-width: 0.88px;
        }

        .controls {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          align-items: center;
        }

        .mode-toggle {
          display: flex;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-xs);
        }

        .mode-button {
          padding: var(--spacing-xs) var(--spacing-md);
          background: var(--color-bg-secondary);
          color: var(--color-text-primary);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: var(--transition);
          font-size: 0.9rem;
        }

        .mode-button:hover {
          background: var(--color-bg-hover);
        }

        .mode-button.active {
          background: var(--color-accent);
          color: var(--color-text-dark);
          border-color: var(--color-accent);
        }

        .text-input {
          padding: var(--spacing-sm) var(--spacing-md);
          border: 1px solid var(--color-border);
          border-radius: var(--border-radius);
          background: var(--color-bg-secondary);
          color: var(--color-text-primary);
          font-size: 1rem;
          width: 300px;
          outline: none;
        }

        .text-input:focus {
          border-color: var(--color-accent);
        }

        .action-button {
          padding: var(--spacing-sm) var(--spacing-lg);
          background: var(--color-accent);
          color: var(--color-text-dark);
          border: none;
          border-radius: var(--border-radius);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .action-button:hover:not(:disabled) {
          background: var(--color-accent-hover);
        }

        .action-button:disabled {
          background: var(--color-bg-disabled);
          color: var(--color-text-secondary);
          cursor: not-allowed;
        }
      `}</style>
      <div className="container">
        <RobotHead isSpeaking={isSpeaking} />
        <Controls
          mode={mode}
          text={text}
          isLoading={isLoading}
          isSpeaking={isSpeaking}
          onModeChange={setMode}
          onTextChange={setText}
          onAction={handleAction}
        />
      </div>
    </>
  );
}

export default App;
