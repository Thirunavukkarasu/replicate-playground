"use client";

import { useState } from "react";
import Image from "next/image";

const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

export default function Form() {
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: e.target.prompt.value,
      }),
    });
    let prediction: any = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction });
      setPrediction(prediction);
    }
  };

  return (
    <div>
      <p className="text-2xl">
        Dream something with{" "}
        <a href="https://replicate.com/stability-ai/stable-diffusion">SDXL</a>:
      </p>

      <form onSubmit={handleSubmit} className="my-4 flex flex-row">
        <div>
          <textarea
            name="prompt"
            placeholder="Enter a prompt to display an image"
            className="h-12 w-72 p-2 border-black"
          />
        </div>
        <button className="mx-4 bg-black text-white px-6 py-2" type="submit">
          Go!
        </button>
      </form>

      {error && <div>{error}</div>}
      <div className="w-[525px] h-[640px] border-2">
        {prediction && (
          <>
            {prediction.output && (
              <div>
                <Image
                  src={prediction.output[prediction.output.length - 1]}
                  alt="output"
                  width={525}
                  height={640}
                />
              </div>
            )}
            <p>status: {prediction.status}</p>
          </>
        )}
      </div>
    </div>
  );
}
