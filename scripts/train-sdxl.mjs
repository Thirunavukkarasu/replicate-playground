import Replicate from "replicate";
import * as dotenv from "dotenv";
dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});

async function main() {
  const training = await replicate.trainings.create(
    "stability-ai",
    "sdxl",
    "a00d0b7dcbb9c3fbb34ba87d2d5b46c56969c84a628bf778a7fdaec30b1b99c5",
    {
      destination: "thirunavukkarasu/sdxl-fine-tune-demo",
      input: {
        use_face_detection_instead: true,
        caption_prefix: "AArush",
        input_images:
          "https://storage.googleapis.com/replicate-demo/aarush.zip",
      },
    }
  );
  console.log(`URL: https://replicate.com/p/${training.id}`);
}

main();

// Run:
// node train-sdxl.js
