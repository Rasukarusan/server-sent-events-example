export const Cursor: React.FC = () => {
  return (
    <>
      <span className="cursor">■</span>
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
    </>
  )
}
