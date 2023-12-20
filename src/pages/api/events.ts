import type { NextApiRequest, NextApiResponse } from 'next'
import text from './_text';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Content-Encoding', 'none');

  let index = 0;
  const intervalId = setInterval(() => {
    if (index < text.length) {
      res.write(`data: ${text[index]}\n\n`);
      index++;
    } else {
      console.log('done')
      res.write(`data: [DONE]\n\n`); // ChatGPTっぽく終端文字を挿入
      clearInterval(intervalId);
      res.end();
    }
  }, 100);

  req.on('close', () => {
    console.log('close')
    clearInterval(intervalId);
    res.end();
  });
}
