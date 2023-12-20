import { useEffect, useState } from 'react'
import { Cursor } from '@/components/Cursor'
import { Links } from '@/components/Links'
import { useChat, useCompletion } from 'ai/react';

/**
 * vercel-ai-sdkを使うパターン
 * @see https://sdk.vercel.ai/docs
 */
export default function Home() {
  const { messages, setInput, handleSubmit } = useChat({api: '/api/events'});
  return (
    <div>
      <Links />
      <form onSubmit={handleSubmit}>
        <button type="submit" onClick={() => setInput('inputに値がないとsubmitが発動しないので適当にいれる')}>START</button>
      </form>
      {messages.map(m => {
        if (m.role === 'user') return
        const text = m.content.split('data: ').map(line => line.trim()).filter(s => s).join('');
        return (
        <div key={m.id}>
          {text}<Cursor />
        </div>
      )})}
    </div>
  );
}
