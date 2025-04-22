import OpenAI from "openai";
import dotenv from "dotenv";
import { generateImageUrl } from "./imageGenerator";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

interface ChoiceOption {
  text: string;
  consequence: string;
}

interface StoryScene {
  sceneText: string;
  imagePrompt: string;
  imageUrl: string;
  choices: ChoiceOption[];
}

interface PetInput {
  petName: string;
  imageUrl: string;
  breed?: string;
  size?: string;
  weight?: string;
  age?: string;
  gender?: string;
  adventureType?: string;
  storyLength?: string;
  customPrompt?: string;
}



export async function startStory(input: PetInput): Promise<StoryScene[]> {
  const {
    petName,
    imageUrl,
    breed,
    size,
    weight,
    age,
    gender,
    adventureType = "wholesome",
    storyLength = "short",
    customPrompt,
  } = input;

  const petDescription = `${petName} is a ${age}-year-old ${size} ${breed} who weighs around ${weight} lbs and identifies as ${gender}.`;

  const sceneCount = storyLength === "long" ? 7 : storyLength === "medium" ? 5 : 3;

  const storyPrompt = customPrompt
    ? `Create a ${sceneCount}-scene comic adventure for a pet. User's custom prompt: "${customPrompt}"`
    : `
Create a ${sceneCount}-scene comic adventure for a dog with the following profile:

${petDescription}

Tone: ${adventureType}

Each scene should include:
- sceneText: what's happening
- imagePrompt: what DALL·E should generate
- choices: 2 options with short consequences

Return only a JSON array like:
[
  {
    "sceneText": "...",
    "imagePrompt": "...",
    "choices": [
      { "text": "...", "consequence": "..." },
      { "text": "...", "consequence": "..." }
    ]
  },
  ...
]
`;

  const gptResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a fun and imaginative dog story generator." },
      { role: "user", content: storyPrompt },
    ],
    temperature: 0.8,
  });

  let scenes: Omit<StoryScene, "imageUrl">[] = [];

  try {
    scenes = JSON.parse(gptResponse.choices[0].message.content || "[]");
  } catch (err) {
    console.error("❌ Failed to parse GPT story:", err);
    throw new Error("Invalid GPT output");
  }

  const storyWithImages = await Promise.all(
    scenes.map(async (scene, index) => {
      if (index === 0) {
        return { ...scene, imageUrl };
      }

      try {
        const generatedImageUrl = await generateImageUrl(scene.imagePrompt);
        return {
          ...scene,
          imageUrl: generatedImageUrl,
        };
      } catch (err) {
        console.error("Image generation failed:", err);
        return {
          ...scene,
          imageUrl: "https://via.placeholder.com/1024?text=Image+not+available",
        };
      }
    })
  );

  return storyWithImages;
}

