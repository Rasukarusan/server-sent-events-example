import Link from "next/link";
import { useEffect, useState } from "react";
import { Cursor } from "@/components/Cursor";
import { Links } from "@/components/Links";

/**
 * EventSourceを使うパターン
 */
export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("/api/events-for-vercel");

    eventSource.onmessage = (event) => {
      setMessage((prev) => prev + event.data);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <Links />
      <p>
        {message}
        <Cursor />
      </p>
    </div>
  );
}
