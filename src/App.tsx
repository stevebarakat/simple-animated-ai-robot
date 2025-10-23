import "./App.css";
import { useState, useRef } from "react";

function App() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const speak = () => {
    if (!text.trim()) return;

    if (synthRef.current) {
      synthRef.current.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 0.5;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current = window.speechSynthesis;
    synthRef.current.speak(utterance);
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
        <path
          className="mouth"
          d="
            M 4,10
            A 3,2 0 0 0 12,10
            L 4,10
          "
        />
        {/* top teeth */}
        <line className="tooth" x1="5.1" y1="10.3" x2="5.1" y2="10.8" />
        <line className="tooth" x1="6.2" y1="10.3" x2="6.2" y2="11" />
        <line className="tooth" x1="7.4" y1="10.3" x2="7.4" y2="11.2" />
        <line className="tooth" x1="8.6" y1="10.3" x2="8.6" y2="11.2" />
        <line className="tooth" x1="9.8" y1="10.3" x2="9.8" y2="11" />
        <line className="tooth" x1="10.9" y1="10.3" x2="10.9" y2="10.8" />

        {/* bottom teeth */}
        <line className="tooth" x1="5.1" y1="11.1" x2="5.1" y2="11.9" />
        <line className="tooth" x1="6.2" y1="11.3" x2="6.2" y2="12.1" />
        <line className="tooth" x1="7.4" y1="11.5" y2="12.3" x2="7.4" />
        <line className="tooth" x1="8.6" y1="11.5" x2="8.6" y2="12.7" />
        <line className="tooth" x1="9.8" y1="11.3" x2="9.8" y2="12.7" />
        <line className="tooth" x1="10.9" y1="11.1" x2="10.9" y2="12.1" />
        <path
          className="lips"
          d="
            M 4,10
            A 3,2 0 0 0 12,10
            L 4,10
          "
        />
      </svg>

      <div className="controls">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text for the robot to speak..."
          className="text-input"
        />
        <button
          onClick={speak}
          disabled={!text.trim()}
          className="speak-button"
        >
          {isSpeaking ? "Speaking..." : "Speak"}
        </button>
      </div>
    </div>
  );
}

export default App;
