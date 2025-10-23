import "./App.css";
import { useState, useRef } from "react";
import { RobotHead } from "./components/RobotHead/RobotHead";
import { Controls } from "./components/Controls/Controls";
import { useConsonantMouthAnimation } from "./hooks/useConsonantMouthAnimation";
import { analyzeText } from "./utils/textAnalysis";

function App() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"speak" | "ask">("speak");
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const { mouthState, startAnimation, stopAnimation } =
    useConsonantMouthAnimation();

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

    const wordAnalysis = analyzeText(textToSpeak, utterance.rate);

    utterance.onstart = () => {
      startAnimation(wordAnalysis);
    };
    utterance.onend = () => {
      stopAnimation();
    };
    utterance.onerror = () => {
      stopAnimation();
    };

    synthRef.current = window.speechSynthesis;
    synthRef.current.speak(utterance);
  };

  const speak = () => {
    if (!text.trim()) return;
    speakText(text);
  };

  return (
    <div className="container">
      <RobotHead
        isSpeaking={mouthState.isAnimating}
        mouthIntensity={mouthState.intensity}
      />

      <Controls
        mode={mode}
        text={text}
        isLoading={isLoading}
        isSpeaking={mouthState.isAnimating}
        onModeChange={setMode}
        onTextChange={setText}
        onAction={mode === "speak" ? speak : askAI}
      />
    </div>
  );
}

export default App;
