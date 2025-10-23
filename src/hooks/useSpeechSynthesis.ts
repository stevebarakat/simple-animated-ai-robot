import { useState, useRef, useCallback } from "react";
import type { SpeechConfig } from "../types";

const DEFAULT_SPEECH_CONFIG: SpeechConfig = {
  rate: 0.8,
  pitch: 0.5,
  volume: 0.8,
};

export function useSpeechSynthesis(
  config: SpeechConfig = DEFAULT_SPEECH_CONFIG
) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const speak = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      if (synthRef.current) {
        synthRef.current.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = config.rate;
      utterance.pitch = config.pitch;
      utterance.volume = config.volume;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthRef.current = window.speechSynthesis;
      synthRef.current.speak(utterance);
    },
    [config]
  );

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    isSpeaking,
    speak,
    stop,
  };
}
