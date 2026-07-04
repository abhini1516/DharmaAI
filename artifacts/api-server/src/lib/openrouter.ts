import OpenAI from "openai";

const apiKey = process.env.OPENROUTER_API_KEY;

if (!apiKey) {
  throw new Error("OPENROUTER_API_KEY environment variable is required");
}

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: apiKey,
  defaultHeaders: {
    "HTTP-Referer": "https://dharma-ai.app",
    "X-Title": "Dharma AI - Legal Assistant",
  },
});

export function getOpenRouterModel() {
  return openrouter.chat.completions;
}

export const OPENROUTER_FREE_MODEL = "google/gemini-2.5-flash";