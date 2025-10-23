export interface WordAnalysis {
  word: string;
  consonantCount: number;
  duration: number;
  startTime: number;
  endTime: number;
}

export const getConsonantCount = (word: string): number => {
  return word.toLowerCase().replace(/[aeiou\s]/g, '').length;
};

export const getMouthIntensity = (consonantCount: number): number => {
  return Math.min(consonantCount / 4, 1);
};

export const estimateWordDuration = (word: string, baseRate: number = 0.8): number => {
  const consonantCount = getConsonantCount(word);
  const vowelCount = word.length - consonantCount;
  const baseDuration = 200;
  const consonantMultiplier = 1.2;
  const vowelMultiplier = 0.8;
  
  return (baseDuration + (consonantCount * consonantMultiplier * 50) + (vowelCount * vowelMultiplier * 30)) / baseRate;
};

export const analyzeText = (text: string, baseRate: number = 0.8): WordAnalysis[] => {
  const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 0);
  const analysis: WordAnalysis[] = [];
  let currentTime = 0;

  words.forEach((word, index) => {
    const consonantCount = getConsonantCount(word);
    const duration = estimateWordDuration(word, baseRate);
    
    analysis.push({
      word,
      consonantCount,
      duration,
      startTime: currentTime,
      endTime: currentTime + duration
    });
    
    currentTime += duration + 50;
  });

  return analysis;
};
