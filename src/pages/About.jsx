import { Link } from 'react-router-dom'
import { Film, MapPin, Music } from 'lucide-react'
import Starfield from '../components/Starfield.jsx'
import { NorthStar, Wordmark } from '../components/Logo.jsx'
import { links } from '../data/site.js'
import { usePageTitle } from '../lib.js'

const stats = [
  { value: '23+', label: 'Tracks Released' },
  { value: 'Pop', label: 'Primary Genre' },
  { value: 'UK', label: 'Based in' },
]

const sound = ['Pop', 'Retro Pop', 'Funk', 'Folk', 'Hip-hop']

export default function About() {
  usePageTitle('About')
  return (
    <>
      <section className="relative overflow-hidden px-4 pt-32 pb-12 text-center">
        <Starfield />
        <div className="relative">
          <div className="mb-6">
            <NorthStar />
          </div>
          <h1 className="sr-only">About North of Normal</h1>
          <Wordmark large />
          <p className="mt-6 font-heading text-xl italic text-amber-300 md:text-2xl">Your North Star for exceptional music.</p>
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-neutral-400">
            <MapPin className="h-4 w-4" /> Newcastle upon Tyne, United Kingdom
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="card mx-auto max-w-3xl space-y-4 p-8 leading-relaxed text-neutral-400">
          <h2 className="font-heading text-2xl font-medium text-white">Our Story</h2>
          <p>
            We're two brothers who grew up writing songs in a tiny bedroom in Newcastle, chasing the same thing we're chasing now — music
            that means something. What started as a couple of guitars, a second-hand laptop, and way too many late-night experiments
            eventually became North of Normal, a home for songs that feel honest, cinematic, and built to travel.
          </p>
          <p>
            We blend sharp toplines with polished, modern production to create music that connects — on stage, on radio, in headphones,
            and on screen. Our sound sits where pop, retro pop, folk, rock, and more overlap.
          </p>
          <p>
            Our catalog moves from nostalgic, sun-drenched pop to intimate folk storytelling to bigger, cinematic rock moments — all
            crafted with a focus on feeling, identity, and commercial impact. Whether you're searching for your next single, a song that
            defines a character, or the perfect track to lift a scene, we build music that points true north.
          </p>
          <p className="font-heading text-lg italic text-amber-200/90">
            Because just like the North Star, our job is to guide artists — and stories — toward the sound they've been trying to find.
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          <div className="card p-6">
            <Music className="mb-3 h-6 w-6 text-amber-300" />
            <h3 className="mb-2 font-heading text-xl font-medium">Songwriting &amp; Production</h3>
            <p className="text-sm leading-relaxed text-neutral-400">
              Creating pitch-ready pop songs with strong concepts, memorable melodies, and polished production. Each track is crafted with
              commercial appeal and emotional resonance in mind.
            </p>
          </div>
          <div className="card p-6">
            <Film className="mb-3 h-6 w-6 text-amber-300" />
            <h3 className="mb-2 font-heading text-xl font-medium">Sync &amp; Licensing</h3>
            <p className="text-sm leading-relaxed text-neutral-400">
              Music designed for film, TV, advertising, and games. Our tracks are built to enhance visual storytelling and create memorable
              moments on screen.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-4 text-center">
          {stats.map((s) => (
            <div key={s.label} className="card p-5">
              <div className="font-heading text-3xl text-amber-300">{s.value}</div>
              <div className="mt-1 text-xs tracking-wider text-neutral-400 uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-8 text-center">
        <h2 className="mb-4 font-heading text-2xl font-medium">Our Sound</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {sound.map((g) => (
            <span key={g} className="rounded-full border border-amber-500/30 px-4 py-1.5 text-sm text-amber-100/90">
              {g}
            </span>
          ))}
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-amber-500/20 bg-[#141414] p-8 text-center md:p-10">
          <div className="mb-4">
            <NorthStar size={40} />
          </div>
          <h2 className="mb-2 font-heading text-2xl font-medium md:text-3xl">Let's Collaborate</h2>
          <p className="mx-auto mb-6 max-w-xl text-neutral-400">
            Looking for pitch-ready songs or custom production? Get in touch to discuss your project.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/contact" className="btn-gold">Get in Touch</Link>
            <a href={links.soundcloud} target="_blank" rel="noreferrer" className="btn-outline">Visit SoundCloud</a>
          </div>
        </div>
      </section>
    </>
  )
}
