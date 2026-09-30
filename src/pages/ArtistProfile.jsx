import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, MapPin } from 'lucide-react'
import { artists } from '../data/site.js'
import { img, usePageTitle } from '../lib.js'

const socialLabels = { spotify: 'Spotify', soundcloud: 'SoundCloud', instagram: 'Instagram', linkedin: 'LinkedIn' }

export default function ArtistProfile() {
  const params = useParams()
  const [search] = useSearchParams()
  const slug = params.slug || search.get('slug')
  const artist = artists.find((a) => a.slug === slug)
  usePageTitle(artist ? artist.name : 'Artist Profile')

  if (!artist) {
    return (
      <section className="px-4 pt-40 pb-20 text-center">
        <h1 className="font-heading text-3xl">Artist Not Found</h1>
        <p className="mt-3 text-neutral-400">Sorry, we couldn't find this artist profile.</p>
        <Link to="/artists" className="btn-gold mt-6">Browse Artists</Link>
      </section>
    )
  }

  return (
    <>
      <div className="relative h-64 md:h-80">
        <img src={img(artist.coverImage, 1600)} alt="" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>
      <section className="relative -mt-32 px-4">
        <div className="mx-auto max-w-4xl">
          <Link to="/artists" className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" /> All artists
          </Link>
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="h-80 w-60 flex-shrink-0 overflow-hidden rounded-2xl border border-amber-500/30 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
              <img src={img(artist.profileImage, 480)} alt={artist.name} className="h-full w-full object-cover" />
            </div>
            <div className="md:pt-24">
              <p className="text-xs tracking-wider text-amber-400/90 uppercase">{artist.role}</p>
              <h1 className="mt-1 font-heading text-4xl font-medium md:text-5xl">{artist.name}</h1>
              <p className="mt-2 inline-flex items-center gap-1 text-sm text-neutral-500">
                <MapPin className="h-4 w-4" /> {artist.location}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="card p-6 md:col-span-2">
              <h2 className="mb-3 font-heading text-2xl font-medium">About</h2>
              <p className="mb-3 font-heading text-lg italic text-amber-200/90">{artist.tagline}</p>
              {artist.bio.map((p, i) => (
                <p key={i} className="mb-3 leading-relaxed text-neutral-400">{p}</p>
              ))}
            </div>
            <div className="card p-6">
              <h2 className="mb-4 font-heading text-2xl font-medium">Connect</h2>
              <div className="flex flex-col gap-2">
                {Object.entries(artist.socials).map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noreferrer" className="btn-outline justify-start px-5 py-2 text-sm">
                    {socialLabels[key]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
