import Home from './pages/Home';
import Music from './pages/Music';
import Podcast from './pages/Podcast';
import About from './pages/About';
import PodcastEpisode from './pages/PodcastEpisode';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';
import ArtistProfile from './pages/ArtistProfile';
import Artists from './pages/Artists';
import Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Music": Music,
    "Podcast": Podcast,
    "About": About,
    "PodcastEpisode": PodcastEpisode,
    "Contact": Contact,
    "Sitemap": Sitemap,
    "ArtistProfile": ArtistProfile,
    "Artists": Artists,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: Layout,
};