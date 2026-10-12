import { useEffect } from 'react';

export default function SEO({ 
  title, 
  description, 
  image, 
  url,
  type = 'website',
  structuredData = null,
  keywords = ''
}) {
  useEffect(() => {
    // Update title
    document.title = title ? `${title} | North of Normal` : 'North of Normal - Pitch-Ready Pop Songs';
    
    // Update or create meta tags
    const updateMetaTag = (property, content, isName = false) => {
      if (!content) return;
      
      const attribute = isName ? 'name' : 'property';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    if (description) {
      updateMetaTag('description', description, true);
    }

    if (keywords) {
      updateMetaTag('keywords', keywords, true);
    }

    // Open Graph tags
    updateMetaTag('og:title', title || 'North of Normal - Pitch-Ready Pop Songs');
    updateMetaTag('og:description', description || 'Professional songwriting & production team creating pitch-ready pop songs for artists and sync.');
    updateMetaTag('og:type', type);
    updateMetaTag('og:url', url || window.location.href);
    updateMetaTag('og:site_name', 'North of Normal');
    
    if (image) {
      updateMetaTag('og:image', image);
      updateMetaTag('og:image:alt', title || 'North of Normal');
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', title || 'North of Normal', true);
    updateMetaTag('twitter:description', description || 'Professional songwriting & production team', true);
    
    if (image) {
      updateMetaTag('twitter:image', image, true);
    }

    // Structured Data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"][data-page-structured-data]');
      
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-page-structured-data', 'true');
        document.head.appendChild(script);
      }
      
      script.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function to remove structured data when component unmounts
    return () => {
      const script = document.querySelector('script[type="application/ld+json"][data-page-structured-data]');
      if (script) {
        script.remove();
      }
    };
  }, [title, description, image, url, type, structuredData, keywords]);

  return null;
}

// Helper function to generate organization structured data
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "North of Normal",
    "description": "Professional songwriting and production team creating pitch-ready pop songs for artists and sync",
    "url": window.location.origin,
    "logo": window.location.origin + "/logo.png",
    "sameAs": [
      "https://www.instagram.com/north_of_normal_official/",
      "https://www.linkedin.com/company/north-of-normal-productions/",
      "https://open.spotify.com/artist/1MYJIsHXbNFaM78MFuwpeg",
      "https://soundcloud.com/north_of_normal"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Newcastle upon Tyne",
      "addressCountry": "UK"
    }
  };
}

// Helper function to generate music recording schema
export function getMusicRecordingSchema(track) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    "name": track.title,
    "byArtist": {
      "@type": "MusicGroup",
      "name": track.artist || "North of Normal"
    },
    "duration": track.duration,
    "genre": track.genre,
    "datePublished": track.release_date,
    "image": track.cover_image,
    "audio": track.audio_url,
    "inAlbum": {
      "@type": "MusicAlbum",
      "name": "North of Normal Catalog"
    }
  };
}

// Helper function to generate podcast series schema
export function getPodcastSeriesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "name": "One Song, One Story",
    "description": "One Song, One Story is where music meets memory. Each guest brings one song that changed their life, and with host Shubeeh Imam, unpacks the story it holds — the love, loss, hope, and healing behind every note.",
    "url": window.location.origin + "/podcast",
    "author": {
      "@type": "Organization",
      "name": "North of Normal"
    },
    "webFeed": "https://open.spotify.com/show/6WrVUJaIMTwWsTwX3GgmOO",
    "genre": "Music"
  };
}

// Helper function to generate podcast episode schema
export function getPodcastEpisodeSchema(episode) {
  return {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "name": episode.title,
    "description": episode.description,
    "episodeNumber": episode.episode_number,
    "seasonNumber": episode.season,
    "duration": episode.duration,
    "datePublished": episode.publish_date,
    "image": episode.cover_image,
    "audio": episode.audio_url,
    "url": window.location.href,
    "partOfSeries": {
      "@type": "PodcastSeries",
      "name": "One Song, One Story",
      "url": window.location.origin + "/podcast"
    },
    "publisher": {
      "@type": "Organization",
      "name": "North of Normal"
    }
  };
}

// Helper function to generate breadcrumb schema
export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}