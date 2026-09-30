import { Link } from 'react-router-dom'
import { usePageTitle } from '../lib.js'

export default function NotFound() {
  usePageTitle('Page Not Found')
  return (
    <section className="px-4 pt-40 pb-20 text-center">
      <p className="font-heading text-6xl text-amber-300">404</p>
      <h1 className="mt-2 font-heading text-3xl">Page Not Found</h1>
      <Link to="/" className="btn-gold mt-6">Back home</Link>
    </section>
  )
}
