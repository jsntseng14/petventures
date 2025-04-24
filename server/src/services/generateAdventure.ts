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
  caption: string;
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

  const sceneCount =
    storyLength === "long" ? 7 : storyLength === "medium" ? 5 : 3;

  const storyPrompt = `Create a ${sceneCount}-scene comic-style pet adventure.
${customPrompt ? `User's custom prompt: "${customPrompt}"
` : ""}
Each scene must include:
- caption: a short, vivid moment in 1–2 sentences
- imagePrompt: a detailed DALL·E-style visual description
- choices: an array of two objects with the shape:
  { "text": "user's choice text", "consequence": "the result of the choice" }

Use this pet profile for inspiration:
${petDescription}

⚠️ Return ONLY a valid JSON array like:
[
  {
    "caption": "...",
    "imagePrompt": "...",
    "choices": [
      { "text": "...", "consequence": "..." },
      { "text": "...", "consequence": "..." }
    ]
  }
]
No explanation, no markdown, no intro or closing text.`;

  const gptResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are a fun and creative pet adventure generator that only responds in valid JSON.",
      },
      { role: "user", content: storyPrompt },
    ],
    temperature: 0.8,
  });

  const rawContent = gptResponse.choices[0].message.content || "";

  const jsonStart = rawContent.indexOf("[");
  const jsonEnd = rawContent.lastIndexOf("]") + 1;

  if (jsonStart === -1 || jsonEnd === -1) {
    console.error("❌ GPT response didn't include valid JSON array:", rawContent);
    throw new Error("Invalid GPT output");
  }

  let rawScenes: any[] = [];
  try {
    rawScenes = JSON.parse(rawContent.slice(jsonStart, jsonEnd));
  } catch (err) {
    console.error("❌ Failed to parse GPT story JSON:", err, "\nRaw content:\n", rawContent);
    throw new Error("Invalid GPT output");
  }

  const isValidScene = (scene: any): scene is Omit<StoryScene, "imageUrl"> => {
    return (
      typeof scene.caption === "string" &&
      typeof scene.imagePrompt === "string" &&
      Array.isArray(scene.choices) &&
      scene.choices.length === 2 &&
      scene.choices.every(
        (c: any) =>
          typeof c.text === "string" &&
          typeof c.consequence === "string"
      )
    );
  };

  const validNormalizedScenes: Omit<StoryScene, "imageUrl">[] = rawScenes
    .filter((scene) => {
      if (!isValidScene(scene)) {
        console.warn("⚠️ Invalid scene skipped:", scene);
        return false;
      }
      return true;
    })
    .map((scene) => ({
      caption: scene.caption,
      imagePrompt: scene.imagePrompt,
      choices: scene.choices.map((choice: any) => ({
        text: choice.text,
        consequence: choice.consequence,
      })),
    }));

  const storyWithImages: StoryScene[] = await Promise.all(
    validNormalizedScenes.map(async (scene, index) => {
      try {
        const imageUrlToUse =
          index === 0 ? imageUrl : await generateImageUrl(scene.imagePrompt);

        return {
          ...scene,
          imageUrl: imageUrlToUse,
        };
      } catch (err) {
        console.error("⚠️ Image generation failed:", scene.imagePrompt, err);
        return {
          ...scene,
          imageUrl: "https://via.placeholder.com/1024?text=Image+not+available",
        };
      }
    })
  );

  return storyWithImages;
}
