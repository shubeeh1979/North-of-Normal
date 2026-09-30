import { Link } from 'react-router-dom'
import { ArrowRight, Headphones, Mail } from 'lucide-react'
import Starfield from '../components/Starfield.jsx'
import Embed from '../components/Embed.jsx'
import { NorthStar, Wordmark } from '../components/Logo.jsx'
import { artists, links } from '../data/site.js'
import { img, usePageTitle } from '../lib.js'

export default function Home() {
  usePageTitle()
  return (
    <>
      <section className="relative flex flex-col items-center overflow-hidden px-4 pt-28 pb-12">
        <Starfield />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6">
            <NorthStar />
          </div>
          <div className="mb-6">
            <Wordmark large />
            <div className="mx-auto mt-3 h-px w-48 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent md:w-64" />
          </div>
          <h1 className="mb-4 font-heading text-3xl font-medium tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text italic text-transparent">
              Pitch-ready pop songs.
            </span>
          </h1>
          <p className="mx-auto mb-6 max-w-2xl leading-relaxed text-neutral-400 md:text-lg">
            There's a certain kind of vibe that comes from family making music together. Think The Beach Boys, Oasis, The Jackson 5,
            Haim, Kings of Leon or Billie &amp; Finneas.
          </p>
          <p className="mx-auto mb-6 max-w-2xl leading-relaxed text-neutral-400 md:text-lg">
            That's North of Normal – two brothers from Newcastle, England, creating songs that have a familiar yet fresh vibe to them.
            Their soulful pop catalogue feels joyful, authentic, and written for sync.
          </p>
          <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-neutral-400 md:text-lg">
            Every track is one-stop pre-cleared for sync, and every track carries something real underneath the feel-good surface —
            shadow and light, tension and release, drawn from lived experience. The result: anthems that sound effortless but are
            built to move a scene, lift a campaign, or soundtrack a summer.
          </p>
          <div className="relative mx-auto mb-10 max-w-3xl overflow-hidden rounded-2xl border border-amber-500/20 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
            <img
              src={img('/images/hero.png', 1200)}
              alt="Shubeeh and Haider Imam of North of Normal"
              className="h-auto w-full object-cover"
              width="1536"
              height="1024"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent" />
          </div>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/music" className="btn-gold px-8 py-4 text-base">
              <Headphones className="h-5 w-5" /> Hear the catalog <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-outline px-8 py-4 text-base">
              Licensing inquiries
            </Link>
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-5xl" />

      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-heading text-2xl leading-snug font-medium text-white/90 md:text-3xl">
            Two brothers writing summery, joyful anthems — <span className="italic text-amber-300">songs that put a smile on your face.</span>
          </p>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-neutral-400">
            We blend sharp toplines with bright, feel-good production. Every track is crafted to feel warm, uplifting, and impossible
            not to hum along to.
          </p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center font-heading text-2xl font-medium md:text-3xl">The Team</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {artists.map((a) => (
              <Link key={a.slug} to={`/artist-profile?slug=${a.slug}`} className="card block p-5">
                <div className="mb-3 flex items-center gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-amber-500/20">
                    <img src={img(a.profileImage, 160)} alt={a.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-medium">{a.name}</h3>
                    <p className="mt-1 text-xs tracking-wider text-amber-400/90 uppercase">{a.role}</p>
                  </div>
                </div>
                <p className="mb-2 font-heading text-sm leading-relaxed italic text-amber-200/90">{a.tagline}</p>
                {a.bio.map((p, i) => (
                  <p key={i} className="mb-2 text-sm leading-relaxed text-neutral-400 last:mb-0">
                    {p}
                  </p>
                ))}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-amber-500/20 bg-[#141414] p-8 text-center md:p-10">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/30 bg-gradient-to-br from-amber-400/20 to-amber-600/10">
            <Headphones className="h-6 w-6 text-amber-300" />
          </div>
          <h2 className="mb-2 font-heading text-2xl font-medium md:text-3xl">Hear the catalog</h2>
          <p className="mx-auto mb-6 max-w-xl text-neutral-400">
            Stream our curated playlist of pitch-ready pop songs — pre-cleared and ready for sync.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <a href={links.discoPlaylist} target="_blank" rel="noreferrer" className="btn-gold">
              Listen on DISCO.AC <ArrowRight className="h-4 w-4" />
            </a>
            <Link to="/contact" className="btn-outline">
              <Mail className="h-4 w-4" /> Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <Embed src={links.spotifyArtistEmbed} title="North of Normal on Spotify" />
        </div>
      </section>
    </>
  )
}
