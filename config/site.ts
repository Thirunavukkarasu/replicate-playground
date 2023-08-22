import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Replicate Playground",
  description: "An open source application built using Replicate models.",
  url: "https://replicate-playground.vercel.app",
  ogImage: "https://replicate-playground.vercel.app/og.jpg",
  links: {
    twitter: "https://twitter.com/thirunavukkarasu",
    github: "https://github.com/thirunavukkarasu/replicate-playground",
  },
};

export const marketingConfig: any = {
  mainNav: [
    {
      title: "Demos",
      href: "/demos",
    },
  ],
};

export const modelsConfig = [
  {
    name: "SDXL",
    formattedName: "sdxl",
    href: "https://stablediffusionxl.com/",
    description:
      "A text-to-image generative AI model that creates beautiful 1024x1024 images",
    content:
      "SDXL is a text-to-image generative AI model developed by Stability AI that creates beautiful 1024x1024 images. It is the successor to Stable Diffusion.",
  },
  {
    name: "Llama 2",
    formattedName: "llama-2",
    href: "https://ai.meta.com/llama/",
    description: "The next generation of our open source large language model",
    content:
      "This release includes model weights and starting code for pretrained and fine-tuned Llama language models — ranging from 7B to 70B parameters.",
  },
];
