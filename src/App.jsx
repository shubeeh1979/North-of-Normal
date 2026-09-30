import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Music from './pages/Music.jsx'
import Podcast from './pages/Podcast.jsx'
import About from './pages/About.jsx'
import Artists from './pages/Artists.jsx'
import ArtistProfile from './pages/ArtistProfile.jsx'
import Contact from './pages/Contact.jsx'
import Sitemap from './pages/Sitemap.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="music" element={<Music />} />
        <Route path="podcast" element={<Podcast />} />
        <Route path="about" element={<About />} />
        <Route path="artists" element={<Artists />} />
        <Route path="artist-profile" element={<ArtistProfile />} />
        <Route path="artists/:slug" element={<ArtistProfile />} />
        <Route path="contact" element={<Contact />} />
        <Route path="sitemap" element={<Sitemap />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
