import { useEffect, useState } from 'react';

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
      <p>{message}</p>
    </div>
  );
}
