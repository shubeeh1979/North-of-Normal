import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Instagram, Linkedin, Menu, X } from 'lucide-react'
import { links, email } from '../data/site.js'
import { NorthStar } from './Logo.jsx'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/music', label: 'Music' },
  { to: '/podcast', label: 'Podcast' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname, search } = useLocation()

  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [pathname, search])

  const linkClass = ({ isActive }) =>
    `text-sm tracking-wide transition-colors ${isActive ? 'text-amber-300' : 'text-neutral-300 hover:text-white'}`

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-amber-500/10 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3">
            <NorthStar size={28} />
            <span className="font-heading text-lg tracking-[0.18em] text-amber-100/90">NORTH OF NORMAL</span>
          </Link>
          <nav className="hidden gap-8 md:flex">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end className={linkClass}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <button className="text-neutral-200 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-4 border-t border-amber-500/10 px-4 py-4 md:hidden">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end className={linkClass}>
                {n.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main className="relative z-10">
        <Outlet />
      </main>

      <footer className="relative z-10 mt-16 border-t border-amber-500/10 px-4 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 text-sm text-neutral-400 md:grid-cols-3">
          <div>
            <p className="font-heading text-lg tracking-[0.18em] text-amber-100/90">NORTH OF NORMAL</p>
            <p className="mt-2">Pitch-ready pop songs for artists and sync</p>
            <p className="mt-1">Newcastle upon Tyne, UK</p>
          </div>
          <div className="flex flex-col gap-2">
            {nav.slice(1).map((n) => (
              <Link key={n.to} to={n.to} className="hover:text-white">
                {n.label}
              </Link>
            ))}
            <Link to="/sitemap" className="hover:text-white">
              Sitemap
            </Link>
          </div>
          <div>
            <p className="mb-3 text-white">Connect</p>
            <div className="flex gap-4">
              <a href={links.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-amber-300">
                <Instagram size={20} />
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-amber-300">
                <Linkedin size={20} />
              </a>
              <a href={links.spotifyArtist} target="_blank" rel="noreferrer" className="hover:text-amber-300">
                Spotify
              </a>
              <a href={links.soundcloud} target="_blank" rel="noreferrer" className="hover:text-amber-300">
                SoundCloud
              </a>
            </div>
            <a href={`mailto:${email}`} className="mt-3 block hover:text-white">
              {email}
            </a>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-neutral-600">© {new Date().getFullYear()} North of Normal</p>
      </footer>
    </div>
  )
}
