import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateImageUrl(prompt: string): Promise<string> {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    size: "1024x1024",
    response_format: "url",
    n: 1,
  });

  if (!response.data[0]?.url) {
    throw new Error("❌ Failed to generate image URL");
  }
  return response.data[0].url;
}
