import Link from 'next/link'
import { useEffect, useState } from 'react'

/**
 * fetchを使うパターン
 * @see https://zenn.dev/teramotodaiki/scraps/f016ed832d6f0d
 */
export default function Home() {
  const [message, setMessage] = useState('')

  const onClick = async () => {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: 'hoge' }) // GPTのAPIの場合はここでプロンプトを指定
    })
    const reader = response.body?.getReader()
    if (!reader) return

    let decoder = new TextDecoder()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (!value) continue
      const lines = decoder.decode(value)
      const text = lines.split('data: ')[1].trim()
      setMessage(prev => prev + text)
    }
  }

  return (
    <div>
      <Link href="/">EventSourceを使う版</Link>
      <br />
      <Link href="/fetch">fetchを使う版</Link>
      <div>
        <button onClick={onClick}>START</button>
      </div>
        <p>{message}<span className="cursor">■</span></p>
        <style jsx>{`
          .cursor {
            opacity: 1
            animation: blink-animation 0.5s steps(5, start) infinite
          }
          @keyframes blink-animation {
            to {
              opacity: 0
            }
          }
        `}</style>
    </div>
  )
}
