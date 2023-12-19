import type { NextApiRequest, NextApiResponse } from 'next'
import { text } from './_text';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Content-Encoding', 'none');

  const str = text()
  let index = 0;
  const intervalId = setInterval(() => {
    if (index < str.length) {
      res.write(`data: ${str[index]}\n\n`);
      index++;
    } else {
      clearInterval(intervalId);
      res.end();
    }
  }, 200);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
}
