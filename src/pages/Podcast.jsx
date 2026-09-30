import { useState } from 'react'
import { Share2 } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Embed from '../components/Embed.jsx'
import { links } from '../data/site.js'
import { usePageTitle } from '../lib.js'

export default function Podcast() {
  usePageTitle('Podcast')
  const [copied, setCopied] = useState(false)

  const share = async () => {
    const data = { title: 'One Song, One Story', url: window.location.href }
    if (navigator.share) {
      navigator.share(data).catch(() => {})
    } else {
      await navigator.clipboard.writeText(data.url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
      <PageHeader eyebrow="Brought to you by North of Normal" title="One Song, One Story">
        <p>
          Where music meets memory. Each guest brings one song that changed their life, and with host Shubeeh Imam, unpacks the story it
          holds. New episodes weekly on all platforms.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-neutral-500">Stream all episodes on:</span>
          <a href={links.podcastSpotify} target="_blank" rel="noreferrer" className="btn-outline px-5 py-2 text-sm">Spotify</a>
          <a href={links.podcastYouTube} target="_blank" rel="noreferrer" className="btn-outline px-5 py-2 text-sm">YouTube</a>
          <a href={links.podcastApple} target="_blank" rel="noreferrer" className="btn-outline px-5 py-2 text-sm">Apple Podcasts</a>
          <button onClick={share} className="btn-outline px-5 py-2 text-sm">
            <Share2 className="h-4 w-4" /> {copied ? 'Link copied' : 'Share Podcast'}
          </button>
        </div>
      </PageHeader>

      <section className="px-4 py-8">
        <div className="card mx-auto max-w-3xl p-8">
          <h2 className="mb-3 font-heading text-2xl font-medium">About the Podcast</h2>
          <p className="mb-3 leading-relaxed text-neutral-400">
            One Song, One Story is where music meets memory. Each guest brings one song that changed their life, and with host Shubeeh
            Imam, unpacks the story it holds — the love, loss, hope, and healing behind every note.
          </p>
          <p className="mb-3 leading-relaxed text-neutral-400">
            If you love soulful stories, honest emotion, and the beauty of music that truly moves you, you'll love this show.
          </p>
          <p className="text-sm text-amber-300/80">New episodes released weekly • Available on all major platforms</p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center font-heading text-2xl font-medium md:text-3xl">Featured Episodes</h2>
          <Embed src={links.podcastSpotifyEmbed} title="One Song, One Story on Spotify" />
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center font-heading text-2xl font-medium md:text-3xl">All Episodes</h2>
          <p className="mb-6 text-center text-sm text-neutral-500">
            Browse and watch all episodes • Click the menu icon in the player to see the full playlist
          </p>
          <div className="aspect-video overflow-hidden rounded-2xl border border-amber-500/20">
            <iframe
              src={links.podcastYouTubeEmbed}
              title="One Song, One Story on YouTube"
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  )
}
