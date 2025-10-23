import { useState, useCallback } from "react";
import type { OpenAIRequest, OpenAIResponse } from "../types";

const API_URL = import.meta.env.VITE_OPENAI_API_URL;

export function useOpenAI() {
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = useCallback(async (question: string): Promise<string> => {
    if (!question.trim()) throw new Error("Question cannot be empty");

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
            content: question,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data: OpenAIResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("AI Error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    askQuestion,
  };
}
