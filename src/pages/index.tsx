import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * EventSourceを使うパターン
 */
export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const eventSource = new EventSource('/api/events');

    eventSource.onmessage = (event) => {
      setMessage(prev => prev + event.data);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
   <div>
      <Link href="/">EventSourceを使う版</Link>
      <br />
      <Link href="/fetch">fetchを使う版</Link>

      <p>{message}<span className="cursor">■</span></p>

      <style jsx>{`
        .cursor {
          opacity: 1;
          animation: blink-animation 0.5s steps(5, start) infinite;
        }
        @keyframes blink-animation {
          to {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
