import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Cursor } from '@/components/Cursor'
import { Links } from '@/components/Links'
import {EventStreamContentType, fetchEventSource} from '@microsoft/fetch-event-source'

class RetriableError extends Error { }
class FatalError extends Error { }

/**
 * fetch-event-sourceを使うパターン
 * @see https://github.com/Azure/fetch-event-source
 */
export default function Home() {
  const [message, setMessage] = useState('')

  const onClick = async () => {
    fetchEventSource('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: 'hoge' }), // GPTのAPIの場合はここでプロンプトを指定
      async onopen(response) {
          if (response.ok && response.headers.get('content-type') === EventStreamContentType) {
              return; // everything's good
          } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
              // client-side errors are usually non-retriable:
              throw new FatalError();
          } else {
              throw new RetriableError();
          }
      },
      onmessage(msg) {
          // if the server emits an error message, throw an exception
          // so it gets handled by the onerror callback below:
          if (msg.event === 'FatalError') {
              throw new FatalError(msg.data);
          }
          setMessage(prev => prev + msg.data)
      },
      onclose() {
          // if the server closes the connection unexpectedly, retry:
          throw new RetriableError();
      },
      onerror(err) {
          if (err instanceof FatalError) {
              throw err; // rethrow to stop the operation
          } else {
              // do nothing to automatically retry. You can also
              // return a specific retry interval here.
          }
      }
    });
  }

  return (
    <div>
      <Links />
      <div>
        <button onClick={onClick}>START</button>
      </div>
      <p>{message}<Cursor /></p>
    </div>
  )
}
