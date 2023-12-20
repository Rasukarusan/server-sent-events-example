import Link from 'next/link'

export const Links: React.FC = () => {
  return (
    <>
      <Link href="/">EventSourceを使う版</Link>
      <br />
      <Link href="/fetch">fetchを使う版</Link>
      <br />
      <Link href="/fetch-event-source">fetch-event-sourceを使う版</Link>
      <br />
      <Link href="/vercel-ai-sdk">Vercel AI SDKを使う版</Link>
    </>

  )
}
