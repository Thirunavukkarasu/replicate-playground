"use client";

import { useState } from "react";
import { useCompletion } from "ai/react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function approximateTokenCount(text: any) {
  return Math.ceil(text.length * 0.4);
}

const Message = ({ message, isUser }: any) => {
  let containerClass = "bg-gray-50";
  if (isUser) {
    containerClass = "";
  }

  if (Array.isArray(message)) {
    message = message.join("");
  }

  if (!message || message === "") {
    return null;
  }

  return (
    <div className={`flex gap-x-4 rounded-md ${containerClass} py-5 px-5`}>
      {isUser ? (
        <span className="text-xl sm:text-2xl" title="user">
          🥸
        </span>
      ) : (
        <span className="text-xl sm:text-2xl" title="AI">
          🦙
        </span>
      )}

      <div className="flex flex-col text-sm sm:text-base flex-1 gap-y-4 mt-1">
        {message.split("\n").map(
          (text: any, index: any) =>
            text.length > 0 && (
              <span key={index} className="min-w-0">
                {text}
              </span>
            )
        )}
      </div>
    </div>
  );
};

export default function LlamaForm() {
  const MAX_TOKENS = 4096;
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const { complete, completion, setInput, input } = useCompletion({
    api: "/api/llama",
    body: {
      version:
        "2c1608e18606fad2812020dc541930f2d0495ce32eee50074220b87300bc16e1",
      systemPrompt: "You are a helpful assistant.",
      temperature: 0.75,
      topP: 0.9,
      maxTokens: 800,
    },
    onError: (error: any) => {
      setError(error);
    },
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    onSubmit(event.target.prompt.value);
    event.target.reset();
  };

  const onSubmit = async (userMessage: any) => {
    const SNIP = "<!-- snip -->";

    const messageHistory: any = [...messages];
    if (completion.length > 0) {
      messageHistory.push({
        text: completion,
        isUser: false,
      });
    }
    messageHistory.push({
      text: userMessage,
      isUser: true,
    });

    const generatePrompt = (messages: any) => {
      return messages
        .map((message: any) =>
          message.isUser ? `[INST] ${message.text} [/INST]` : `${message.text}`
        )
        .join("\n");
    };

    // Generate initial prompt and calculate tokens
    let prompt = `${generatePrompt(messageHistory)}\n`;
    // Check if we exceed max tokens and truncate the message history if so.
    while (approximateTokenCount(prompt) > MAX_TOKENS) {
      if (messageHistory.length < 3) {
        setError(
          "Your message is too long. Please try again with a shorter message."
        );

        return;
      }

      // Remove the third message from history, keeping the original exchange.
      messageHistory.splice(1, 2);

      // Recreate the prompt
      prompt = `${SNIP}\n${generatePrompt(messageHistory)}\n`;
    }

    setMessages(messageHistory);

    complete(prompt);
  };

  return (
    <div>
      <p className="text-2xl">
        Llama Demo - Do some magic with{" "}
        <a
          href="https://replicate.com/stability-ai/stable-diffusion"
          className="underline"
        >
          Llama
        </a>
        :
      </p>

      <form onSubmit={handleSubmit} className="my-4 flex flex-row items-center">
        <Textarea
          name="prompt"
          placeholder="Enter a prompt to send to Llama v2."
          className="w-72"
          required={true}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button size="lg" className="mx-4" type="submit">
          Go!
        </Button>
      </form>

      {error && <div>{error}</div>}

      <article className="pb-24">
        {messages.map((message: any, index: any) => (
          <Message
            key={`message-${index}`}
            message={message.text}
            isUser={message.isUser}
          />
        ))}
        <Message message={completion} isUser={false} />
      </article>
    </div>
  );
}
