export default function Embed({ src, title, height = 352 }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-amber-500/20 bg-[#141414]">
      <iframe
        src={src}
        title={title}
        width="100%"
        height={height}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        className="block"
      />
    </div>
  )
}
