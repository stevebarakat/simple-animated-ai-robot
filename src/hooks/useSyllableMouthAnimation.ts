import { useState, useEffect, useRef } from "react";
import type { WordAnalysis } from "../utils/textAnalysis";

export interface MouthState {
  isAnimating: boolean;
  intensity: number;
  currentWord: string;
  currentSyllable: number;
}

export function useSyllableMouthAnimation() {
  const [mouthState, setMouthState] = useState<MouthState>({
    isAnimating: false,
    intensity: 0,
    currentWord: "",
    currentSyllable: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const wordIndexRef = useRef(0);
  const syllableIndexRef = useRef(0);
  const wordAnalysisRef = useRef<WordAnalysis[]>([]);

  const startAnimation = (wordAnalysis: WordAnalysis[]) => {
    wordAnalysisRef.current = wordAnalysis;
    wordIndexRef.current = 0;
    syllableIndexRef.current = 0;

    setMouthState({
      isAnimating: true,
      intensity: 0,
      currentWord: "",
      currentSyllable: 0,
    });

    if (wordAnalysis.length === 0) {
      stopAnimation();
      return;
    }

    const animateSyllable = (wordIndex: number, syllableIndex: number) => {
      if (wordIndex >= wordAnalysis.length) {
        stopAnimation();
        return;
      }

      const word = wordAnalysis[wordIndex];
      const intensity = Math.min(word.syllableCount / 3, 1);
      const syllableDuration = word.duration / word.syllableCount;

      setMouthState({
        isAnimating: true,
        intensity,
        currentWord: word.word,
        currentSyllable: syllableIndex + 1,
      });

      intervalRef.current = setTimeout(() => {
        if (syllableIndex + 1 >= word.syllableCount) {
          animateSyllable(wordIndex + 1, 0);
        } else {
          animateSyllable(wordIndex, syllableIndex + 1);
        }
      }, syllableDuration);
    };

    animateSyllable(0, 0);
  };

  const stopAnimation = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }

    setMouthState({
      isAnimating: false,
      intensity: 0,
      currentWord: "",
      currentSyllable: 0,
    });
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, []);

  return {
    mouthState,
    startAnimation,
    stopAnimation,
  };
}
