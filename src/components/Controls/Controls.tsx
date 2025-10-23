import type { AppMode } from "../../types";

interface ControlsProps {
  mode: AppMode;
  text: string;
  isLoading: boolean;
  isSpeaking: boolean;
  onModeChange: (mode: AppMode) => void;
  onTextChange: (text: string) => void;
  onAction: () => void;
}

export function Controls({
  mode,
  text,
  isLoading,
  isSpeaking,
  onModeChange,
  onTextChange,
  onAction,
}: ControlsProps) {
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
