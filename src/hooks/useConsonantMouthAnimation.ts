import { useState, useEffect, useRef } from 'react';
import type { WordAnalysis } from '../utils/textAnalysis';

export interface MouthState {
  isAnimating: boolean;
  intensity: number;
  currentWord: string;
}

export function useConsonantMouthAnimation() {
  const [mouthState, setMouthState] = useState<MouthState>({
    isAnimating: false,
    intensity: 0,
    currentWord: ''
  });
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const wordIndexRef = useRef(0);
  const wordAnalysisRef = useRef<WordAnalysis[]>([]);

  const startAnimation = (wordAnalysis: WordAnalysis[]) => {
    wordAnalysisRef.current = wordAnalysis;
    wordIndexRef.current = 0;
    
    setMouthState({
      isAnimating: true,
      intensity: 0,
      currentWord: ''
    });

    if (wordAnalysis.length === 0) {
      stopAnimation();
      return;
    }

    const animateWord = (index: number) => {
      if (index >= wordAnalysis.length) {
        stopAnimation();
        return;
      }

      const word = wordAnalysis[index];
      const intensity = Math.min(word.consonantCount / 4, 1);
      
      setMouthState({
        isAnimating: true,
        intensity,
        currentWord: word.word
      });

      intervalRef.current = setTimeout(() => {
        animateWord(index + 1);
      }, word.duration);
    };

    animateWord(0);
  };

  const stopAnimation = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    
    setMouthState({
      isAnimating: false,
      intensity: 0,
      currentWord: ''
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
    stopAnimation
  };
}
