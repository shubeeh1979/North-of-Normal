// Fixed positions so the sky doesn't reshuffle on every render
const stars = Array.from({ length: 60 }, (_, i) => ({
  top: (i * 37) % 100,
  left: (i * 61 + 13) % 100,
  delay: (i % 7) * 0.6,
  duration: 3 + (i % 5),
}))

export default function Starfield() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute h-px w-px rounded-full bg-amber-300"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            boxShadow: '0 0 3px rgba(251,191,36,0.9)',
          }}
        />
      ))}
    </div>
  )
}
