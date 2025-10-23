export interface WordAnalysis {
  word: string;
  syllableCount: number;
  duration: number;
  startTime: number;
  endTime: number;
}

export const countSyllables = (word: string): number => {
  const cleanWord = word.toLowerCase().replace(/[^a-z]/g, "");
  if (cleanWord.length === 0) return 0;

  const vowels = cleanWord.match(/[aeiouy]+/g);
  const syllableCount = vowels ? vowels.length : 1;

  return Math.max(syllableCount, 1);
};

export const getMouthIntensity = (syllableCount: number): number => {
  return Math.min(syllableCount / 3, 1);
};

export const estimateWordDuration = (
  word: string,
  baseRate: number = 0.8
): number => {
  const syllableCount = countSyllables(word);
  const baseDuration = 150;
  const syllableMultiplier = 80;

  return (baseDuration + syllableCount * syllableMultiplier) / baseRate;
};

export const analyzeText = (
  text: string,
  baseRate: number = 0.8
): WordAnalysis[] => {
  const words = text
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const analysis: WordAnalysis[] = [];
  let currentTime = 0;

  words.forEach((word, index) => {
    const syllableCount = countSyllables(word);
    const duration = estimateWordDuration(word, baseRate);

    analysis.push({
      word,
      syllableCount,
      duration,
      startTime: currentTime,
      endTime: currentTime + duration,
    });

    currentTime += duration + 30;
  });

  return analysis;
};
