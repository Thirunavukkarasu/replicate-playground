import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function genImage() {
  const image = await openai.images.generate({
    prompt: "photo of a indian baby boy eating icecream, studio quality, 8k hd",
  });

  console.log(image.data);
}
