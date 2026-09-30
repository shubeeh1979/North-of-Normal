import Starfield from './Starfield.jsx'

export default function PageHeader({ eyebrow, title, children }) {
  return (
    <section className="relative overflow-hidden px-4 pt-32 pb-12 text-center">
      <Starfield />
      <div className="relative mx-auto max-w-3xl">
        {eyebrow && <p className="mb-3 text-xs tracking-[0.3em] text-amber-400/80 uppercase">{eyebrow}</p>}
        <h1 className="font-heading text-4xl font-medium tracking-tight md:text-5xl">{title}</h1>
        {children && <div className="mx-auto mt-4 max-w-2xl leading-relaxed text-neutral-400">{children}</div>}
      </div>
    </section>
  )
}
