import { Word } from "../Word";
import assert from "assert";
import dotenv from "dotenv";
import openai from "openai";

dotenv.config();

assert(process.env.OPENAI_API_KEY, "OPENAI_API_KEY is not set");

const client = new openai.OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function translateWords(words: Word[]) {
  const prompt = `
    - Translate the given Hebrew words into their English equivalents.
    - If a word cannot be properly translated, just return its alphabetical representation.
    - Remember that Hebrew words are written from right to left.
        - This means that the first letter of the Hebrew word is the last letter of the English word.
        - Example: כס = Sk
        - Example: אר = Ar
    - Make sure your response is well structured JSON.
    - Return in the following JSON format:
    {
        [Hebrew word]: [English word]
    }

    WORDS:
    ${words.map((word) => word.getString()).join("\n")}
    `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}
