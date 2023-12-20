import Link from 'next/link';
import { useEffect, useState } from 'react';
import {Cursor} from '@/components/Cursor';

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
      <p>{message}<Cursor /></p>
    </div>
  );
}
