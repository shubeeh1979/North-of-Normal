import { Link } from 'react-router-dom'
import { ArrowRight, Film, Mic2 } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Embed from '../components/Embed.jsx'
import { artists, links } from '../data/site.js'
import { img, usePageTitle } from '../lib.js'

export default function Music() {
  usePageTitle('Music')
  return (
    <>
      <PageHeader eyebrow="Music Catalog" title="Pitch-ready pop songs for artists and sync">
        <p>Browse our catalog of 23+ professionally produced pop songs, pre-cleared and ready for licensing in film, TV, advertising, and gaming.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-neutral-500">Stream the full catalogue:</span>
          <a href={links.spotifyArtist} target="_blank" rel="noreferrer" className="btn-outline px-5 py-2 text-sm">Spotify</a>
          <a href={links.soundcloud} target="_blank" rel="noreferrer" className="btn-outline px-5 py-2 text-sm">SoundCloud</a>
          <a href={links.disco} target="_blank" rel="noreferrer" className="btn-outline px-5 py-2 text-sm">DISCO.AC</a>
          <a href={links.appleMusic} target="_blank" rel="noreferrer">
            <img src={links.appleMusicBadge} alt="Listen on Apple Music" className="h-10" />
          </a>
        </div>
      </PageHeader>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center font-heading text-2xl font-medium md:text-3xl">Top Tracks</h2>
          <p className="mb-6 text-center text-sm text-neutral-500">Click any track to listen</p>
          <Embed src={links.spotifyArtistEmbed} title="North of Normal top tracks on Spotify" height={452} />
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="card mx-auto max-w-4xl p-8 text-center">
          <h2 className="mb-2 font-heading text-2xl font-medium">Full Catalog</h2>
          <p className="mb-6 text-neutral-400">Browse and stream all tracks with high-quality audio on DISCO.AC</p>
          <a href={links.disco} target="_blank" rel="noreferrer" className="btn-gold">
            Listen on DISCO.AC <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="card p-6">
            <Film className="mb-3 h-6 w-6 text-amber-300" />
            <h3 className="mb-2 font-heading text-xl font-medium">For Sync &amp; Licensing</h3>
            <p className="mb-5 text-sm leading-relaxed text-neutral-400">
              All tracks are pre-cleared and ready for licensing. Broadcast-quality production suitable for film, TV, advertising, and gaming.
            </p>
            <Link to="/contact" className="btn-gold px-5 py-2 text-sm">Submit Licensing Inquiry</Link>
          </div>
          <div className="card p-6">
            <Mic2 className="mb-3 h-6 w-6 text-amber-300" />
            <h3 className="mb-2 font-heading text-xl font-medium">For Artists</h3>
            <p className="mb-5 text-sm leading-relaxed text-neutral-400">
              Looking for your next single? Our catalog features commercially viable tracks with strong hooks and polished production ready to record.
            </p>
            <Link to="/contact" className="btn-outline px-5 py-2 text-sm">Get in Touch</Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 text-center">
        <Link to="/artists" className="inline-flex items-center gap-3 text-amber-300 hover:text-amber-200">
          <span className="flex -space-x-3">
            {artists.map((a) => (
              <img key={a.slug} src={img(a.profileImage, 80)} alt="" className="h-10 w-10 rounded-full border-2 border-[#0a0a0a] object-cover" />
            ))}
          </span>
          Browse All Artists <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </>
  )
}
