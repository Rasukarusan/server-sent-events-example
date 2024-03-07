import type { NextApiRequest, NextApiResponse } from "next";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";
import text from "./_text";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < text.length) {
          const chunkText = `data: ${text[index]}\n\n`;
          const queue = encoder.encode(chunkText);
          controller.enqueue(queue);
          index++;
        } else {
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
          clearInterval(intervalId);
        }
      }, 100);
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream; charset=utf-8" },
  });
};
export default handler;
