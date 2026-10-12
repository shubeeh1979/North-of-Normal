
import React from "react";
import { api } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Music, MapPin, ExternalLink, ArrowLeft, Instagram, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

export default function ArtistProfile() {
  const urlParams = new URLSearchParams(window.location.search);
  const artistSlug = urlParams.get('artist');

  const { data: artist, isLoading: artistLoading, error: artistError } = useQuery({
    queryKey: ['artist', artistSlug],
    queryFn: async () => {
      const artists = await api.entities.Artist.list();
      return artists.find(a => a.slug === artistSlug);
    },
    enabled: !!artistSlug,
  });

  if (artistLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 bg-black flex items-center justify-center">
        <div className="text-center">
          <Music className="w-12 h-12 text-amber-400 animate-pulse mx-auto mb-4" />
          <p className="text-gray-400">Loading artist profile...</p>
        </div>
      </div>
    );
  }

  if (artistError || !artist) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 bg-black flex items-center justify-center">
        <div className="text-center max-w-md">
          <Music className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Artist Not Found</h2>
          <p className="text-gray-400 mb-6">Sorry, we couldn't find this artist profile.</p>
          <Link to={createPageUrl("Artists")}>
            <Button className="bg-amber-500 hover:bg-amber-600 text-black">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse All Artists
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={artist.name}
        description={artist.bio || `Listen to ${artist.name}'s music catalog on North of Normal`}
        image={artist.profile_image || artist.cover_image}
        keywords={`${artist.name}, artist profile, ${artist.genre || 'music'}, songs, tracks`}
        type="profile"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          "name": artist.name,
          "genre": artist.genre,
          "description": artist.bio,
          "image": artist.profile_image,
          "url": window.location.href,
          "address": artist.location ? {
            "@type": "PostalAddress",
            "addressLocality": artist.location
          } : undefined,
          "sameAs": [
            artist.spotify_url,
            artist.apple_music_url,
            artist.soundcloud_url,
            artist.instagram_url,
            artist.twitter_url,
            artist.website_url
          ].filter(Boolean)
        }}
      />
      <div className="min-h-screen bg-black">
        {/* Header/Cover Image */}
        <div className="relative h-80 md:h-96">
          {artist.cover_image ? (
            <>
              <img
                src={artist.cover_image}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-black to-black" />
          )}

          {/* Back Button */}
          <div className="absolute top-32 left-4 md:left-8 z-10">
            <Link to={createPageUrl("Artists")}>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Artists
              </Button>
            </Link>
          </div>

          {/* Artist Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end gap-6">
              {/* Profile Image */}
              {artist.profile_image && (
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-black/50 shadow-2xl flex-shrink-0">
                  <img
                    src={artist.profile_image}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Name and Details */}
              <div className="flex-1">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
                  {artist.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                  <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400">
                    Songwriter
                  </div>
                  {artist.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{artist.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          {/* Bio and Links */}
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Bio */}
            {artist.bio && (
              <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10">
                <h2 className="text-xl font-bold text-white mb-4">About</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {artist.bio}
                </p>
              </div>
            )}

            {/* Social Links */}
            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10">
              <h2 className="text-xl font-bold text-white mb-4">Connect</h2>
              <div className="space-y-3">
                {artist.apple_music_url && (
                  <a
                    href={artist.apple_music_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-[#FA243C] to-[#FA5C7C] hover:from-[#FA243C]/90 hover:to-[#FA5C7C]/90 text-white border-0 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <span className="font-medium">Apple Music</span>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}

                <a
                  href="https://www.linkedin.com/in/shubeeh-imam-32a7843/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white border-0 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span className="font-medium">LinkedIn</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                {artist.instagram_url && (
                  <a
                    href={artist.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] hover:opacity-90 text-white border-0 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span className="font-medium">Instagram</span>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}

                {artist.twitter_url && (
                  <a
                    href={artist.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-black hover:bg-black/90 text-white border border-white/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span className="font-medium">X / Twitter</span>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}

                {artist.website_url && (
                  <a
                    href={artist.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-0 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5" />
                      <span className="font-medium">Website</span>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
