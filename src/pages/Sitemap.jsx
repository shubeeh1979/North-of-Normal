import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { artists } from '../data/site.js'
import { usePageTitle } from '../lib.js'

const pages = [['/', 'Home'], ['/music', 'Music'], ['/podcast', 'Podcast'], ['/about', 'About'], ['/artists', 'Artists'], ['/contact', 'Contact']]

export default function Sitemap() {
  usePageTitle('Sitemap')
  return (
    <>
      <PageHeader title="Sitemap">
        <p>Browse all pages and content on our website</p>
      </PageHeader>
      <section className="card mx-auto max-w-2xl space-y-2 p-8">
        {pages.map(([to, label]) => <Link key={to} to={to} className="block text-amber-300 hover:text-amber-200">{label}</Link>)}
        {artists.map((a) => <Link key={a.slug} to={`/artist-profile?slug=${a.slug}`} className="block text-neutral-300 hover:text-white">{a.name}</Link>)}
        <a href="/sitemap.xml" className="block pt-4 text-sm text-neutral-500">Download XML Sitemap</a>
      </section>
    </>
  )
}
