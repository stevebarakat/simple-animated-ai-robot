export type AppMode = "speak" | "ask";

export type SpeechConfig = {
  rate: number;
  pitch: number;
  volume: number;
};

export type OpenAIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type OpenAIRequest = {
  model: string;
  messages: OpenAIMessage[];
  max_tokens: number;
  temperature: number;
};

export type OpenAIResponse = {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
};
