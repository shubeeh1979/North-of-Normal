import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { artists } from '../data/site.js'
import { img, usePageTitle } from '../lib.js'

export default function Artists() {
  usePageTitle('Artists')
  return (
    <>
      <PageHeader eyebrow="Team" title="Featured Artists">
        <p>Get to know the souls behind the sound</p>
      </PageHeader>
      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {artists.map((a) => (
            <Link key={a.slug} to={`/artist-profile?slug=${a.slug}`} className="card group block overflow-hidden">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={img(a.profileImage, 700)}
                  alt={a.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h2 className="font-heading text-2xl font-medium">{a.name}</h2>
                <p className="mt-1 text-xs tracking-wider text-amber-400/90 uppercase">{a.role}</p>
                <p className="mt-3 font-heading italic text-amber-200/90">{a.tagline}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-sm text-neutral-500">
                  <MapPin className="h-4 w-4" /> {a.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
