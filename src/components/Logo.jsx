// The North Star mark plus the stacked "NORTH of NORMAL" wordmark
export function NorthStar({ size = 56 }) {
  return (
    <div className="relative mx-auto flex items-center justify-center" style={{ width: size, height: size }}>
      <div className="absolute inset-0 scale-150 bg-amber-500/20 blur-2xl" />
      <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-amber-300/80 to-transparent" />
      <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-amber-300/80 to-transparent" />
      <div className="absolute h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_16px_rgba(251,191,36,0.9)]" />
    </div>
  )
}

export function Wordmark({ large = false }) {
  const word = large ? 'text-4xl md:text-6xl' : 'text-lg'
  return (
    <div className="font-heading font-medium leading-none tracking-[0.22em] text-amber-100/90">
      <div className={word}>NORTH</div>
      <div className={`${large ? 'my-2 text-xs' : 'my-0.5 text-[0.5rem]'} font-body tracking-[0.45em] text-amber-400/80`}>OF</div>
      <div className={word}>NORMAL</div>
    </div>
  )
}
