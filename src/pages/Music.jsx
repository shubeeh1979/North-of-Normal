
import React, { useState } from "react";
import { Music as MusicIcon, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { api } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import AudioPlayer from "@/components/AudioPlayer";
import { motion } from "framer-motion";

export default function Music() {
  const [displayCount, setDisplayCount] = useState(5);

  const { data: featuredSongs = [] } = useQuery({
    queryKey: ['featured-songs'],
    queryFn: async () => {
      const songs = await api.entities.Song.filter({ featured: true }, '-release_date', 50);
      return songs;
    },
  });

  const displayedSongs = featuredSongs.slice(0, displayCount);
  const hasMoreSongs = displayCount < featuredSongs.length;

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 5, featuredSongs.length));
  };

  return (
    <>
      <SEO
        title="Music Catalog - Pitch-Ready Pop Songs"
        description="Browse our catalog of 23+ professionally produced pop songs. Pre-cleared and ready for licensing in film, TV, advertising, and gaming. Stream on Spotify, Apple Music, and SoundCloud."
        keywords="music catalog, sync licensing, royalty-free music, pop songs, production music, film music, TV music, commercial music"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Music Catalog",
          "description": "Professional music catalog for sync licensing and artist development",
          "url": typeof window !== 'undefined' ? window.location.href : '',
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": typeof window !== 'undefined' ? window.location.origin : ''
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Music",
                "item": typeof window !== 'undefined' ? window.location.href : ''
              }
            ]
          }
        }}
      />
      <div className="min-h-screen pt-32 pb-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                <MusicIcon className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-2">
                  Music Catalog
                </h1>
                <p className="text-gray-400 text-lg">
                  Pitch-ready pop songs for artists and sync
                </p>
              </div>
            </div>

            {/* Full Catalog CTA */}
            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10 mb-8">
              <p className="text-gray-300 text-base mb-4 font-medium">
                Stream the full catalogue:
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://open.spotify.com/artist/1MYJIsHXbNFaM78MFuwpeg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1DB954]/10 hover:bg-[#1DB954]/20 text-[#1DB954] border border-[#1DB954]/30 transition-all group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  <span className="font-medium">Spotify</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://music.apple.com/gb/artist/north-of-normal/1816431693?itscg=30200&itsct=music_box_badge&ls=1&app=music&mttnsubad=1816431693"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-80 transition-opacity"
                >
                  <img 
                    src="https://toolbox.marketingtools.apple.com/api/v2/badges/listen-on-apple-music/badge/en-gb" 
                    alt="Listen on Apple Music" 
                    className="h-10 w-auto object-contain"
                  />
                </a>

                <a
                  href="https://north-of-normal.disco.ac/cat/821516578"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all group"
                >
                  <MusicIcon className="w-5 h-5" />
                  <span className="font-medium">DISCO.AC</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>

          {/* Featured Tracks */}
          {featuredSongs.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Featured Tracks</h2>
              <div className="space-y-4">
                {displayedSongs.map((song, index) => (
                  <motion.div
                    key={song.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <AudioPlayer
                      audioUrl={song.audio_url}
                      title={song.title}
                      artist={song.artist}
                      coverImage={song.cover_image}
                      soundcloudUrl={song.soundcloud_url}
                      spotifyUrl={song.spotify_url}
                      appleMusicUrl={song.apple_music_url}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMoreSongs && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8 text-center"
                >
                  <Button
                    onClick={loadMore}
                    variant="outline"
                    size="lg"
                    className="border-amber-500/30 hover:bg-amber-500/5 text-white px-10 py-6"
                  >
                    Load More Tracks ({featuredSongs.length - displayCount} remaining)
                  </Button>
                </motion.div>
              )}
              
              {/* Browse Artists Link */}
              <div className="mt-8 text-center">
                <Link to={createPageUrl("Artists")}>
                  <Button variant="outline" className="border-amber-500/30 hover:bg-amber-500/5 text-white">
                    Browse All Artists
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Spotify Embed */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-amber-500/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <MusicIcon className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">Top Tracks</h2>
                  <p className="text-gray-400 text-sm">Browse all tracks with album art</p>
                </div>
              </div>
              
              <div className="rounded-2xl overflow-hidden border border-amber-500/20">
                <iframe 
                  style={{ borderRadius: '12px' }} 
                  src="https://open.spotify.com/embed/artist/1MYJIsHXbNFaM78MFuwpeg?utm_source=generator&theme=0" 
                  width="100%" 
                  height="552" 
                  frameBorder="0" 
                  allowFullScreen 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                  title="Spotify Artist Embed"
                />
              </div>
              
              <div className="mt-6 text-center text-gray-400 text-sm">
                Click any track to listen • Each song displays with album artwork
              </div>
            </div>
          </div>

          {/* DISCO.AC Player */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-amber-500/10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                  <MusicIcon className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">Full Catalog</h2>
                  <p className="text-gray-400 text-sm">Browse and stream all tracks on DISCO.AC</p>
                </div>
              </div>
              
              <a
                href="https://north-of-normal.disco.ac/cat/821516578"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="rounded-2xl overflow-hidden border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent p-12 text-center hover:border-amber-500/40 transition-all group">
                  <div className="w-20 h-20 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6 border border-amber-500/20 group-hover:bg-amber-500/20 transition-all">
                    <MusicIcon className="w-10 h-10 text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    Listen on DISCO.AC
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Stream our complete catalog with high-quality audio
                  </p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                    Open DISCO.AC Player
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </a>
            </div>
          </div>

          {/* Info Sections */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-8 border border-amber-500/10">
              <h3 className="text-2xl font-bold text-white mb-4">For Sync & Licensing</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                All tracks are pre-cleared and ready for licensing. Broadcast-quality production suitable for film, TV, advertising, and gaming.
              </p>
              <Link to={createPageUrl("Contact")}>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                  Submit Licensing Inquiry
                </Button>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-8 border border-amber-500/10">
              <h3 className="text-2xl font-bold text-white mb-4">For Artists</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Looking for your next single? Our catalog features commercially viable tracks with strong hooks and polished production ready to record.
              </p>
              <Link to={createPageUrl("Contact")}>
                <Button variant="outline" className="border-amber-500/30 hover:bg-amber-500/5 text-white font-semibold">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
