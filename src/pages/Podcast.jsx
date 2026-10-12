
import React from "react";
import { Mic2, ExternalLink, Share2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SEO, { getPodcastSeriesSchema } from "@/components/SEO";

export default function Podcast() {
  const { data: featuredEpisodes = [], isLoading } = useQuery({
    queryKey: ['featured-episodes'],
    queryFn: async () => {
      const episodes = await api.entities.PodcastEpisode.filter({ featured: true }, '-publish_date', 10);
      return episodes;
    },
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'One Song, One Story - North of Normal Podcast',
        text: 'Check out this amazing podcast!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <>
      <SEO
        title="One Song, One Story Podcast"
        description="Where music meets memory. Each guest brings one song that changed their life, and with host Shubeeh Imam, unpacks the story it holds. New episodes weekly on all platforms."
        keywords="podcast, music podcast, storytelling, music stories, Shubeeh Imam, one song one story, music interviews"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            getPodcastSeriesSchema(),
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": window.location.origin
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Podcast",
                  "item": window.location.href
                }
              ]
            }
          ]
        }}
      />
      <div className="min-h-screen pt-32 pb-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                <Mic2 className="w-8 h-8 text-amber-400" />
              </div>
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  One Song, One Story
                </h1>
                <p className="text-gray-400 mt-2 text-lg">
                  Brought to you by North of Normal
                </p>
              </div>
              <button
                onClick={handleShare}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-amber-500/20 hover:border-amber-500/30 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>

            {/* Podcast Description */}
            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10 mb-6">
              <h2 className="text-xl font-bold text-white mb-3">About the Podcast</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                One Song, One Story is where music meets memory. Each guest brings one song that changed their life, and with host Shubeeh Imam, unpacks the story it holds — the love, loss, hope, and healing behind every note. It's a celebration of how songs shape our lives and connect us to something deeper.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you love soulful stories, honest emotion, and the beauty of music that truly moves you, you'll love this show.
              </p>
              <p className="text-amber-400 text-sm font-medium">
                New episodes released weekly • Available on all major platforms
              </p>
            </div>
            
            {/* Platform Links */}
            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10">
              <p className="text-gray-300 text-base mb-4 font-medium">
                Stream all episodes on:
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://open.spotify.com/show/6WrVUJaIMTwWsTwX3GgmOO?si=6ca3b61d996041f3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1DB954] hover:shadow-[0_0_30px_rgba(29,185,84,0.5)] text-white border-0 transition-all group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  <span className="font-medium">Spotify</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://youtube.com/playlist?list=PLSgW3zKDhS3Jq41fKbkrhIZ94eEntlGN2&si=UCwV_yqNx5Pq4DKH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF0000] hover:shadow-[0_0_30px_rgba(255,0,0,0.5)] text-white border-0 transition-all group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span className="font-medium">YouTube</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://podcasts.apple.com/us/podcast/one-song-one-story/id1846568214"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-[#F452FF] to-[#832BC1] hover:shadow-[0_0_30px_rgba(244,82,255,0.5)] text-white border-0 transition-all group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm0 2.5c5.2 0 9.5 4.3 9.5 9.5s-4.3 9.5-9.5 9.5S2.5 17.2 2.5 12 6.8 2.5 12 2.5zm0 3.8c-3.1 0-5.7 2.6-5.7 5.7 0 2.1 1.2 4 3 5v3.5c0 .4.3.8.8.8h3.8c.4 0 .8-.3.8-.8V17c1.8-1 3-2.9 3-5 0-3.1-2.6-5.7-5.7-5.7zm0 2.3c1.9 0 3.4 1.5 3.4 3.4 0 1.3-.7 2.4-1.8 3v2.5h-3.2V15c-1.1-.6-1.8-1.7-1.8-3 0-1.9 1.5-3.4 3.4-3.4zm0 1.1c-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3 2.3-1 2.3-2.3-1-2.3-2.3-2.3z"/>
                  </svg>
                  <span className="font-medium">Apple Podcasts</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              {/* Share button for mobile */}
              <button
                onClick={handleShare}
                className="md:hidden mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-amber-500/20 hover:border-amber-500/30 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span className="font-medium">Share Podcast</span>
              </button>
            </div>
          </div>

          {/* Featured Episodes */}
          {featuredEpisodes.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <Mic2 className="w-6 h-6 text-amber-400" />
                <h2 className="text-3xl font-bold text-white">Featured Episodes</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredEpisodes.map((episode) => (
                  <Link 
                    key={episode.id}
                    to={`${createPageUrl("PodcastEpisode")}?id=${episode.id}`}
                    className="block bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl overflow-hidden border border-amber-500/10 hover:border-amber-500/30 transition-all group cursor-pointer"
                  >
                    <div className="flex gap-4 p-6">
                      {episode.cover_image && (
                        <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden border border-amber-500/20">
                          <img 
                            src={episode.cover_image} 
                            alt={episode.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                              <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                            EP {episode.episode_number}
                          </span>
                          {episode.duration && (
                            <span className="text-xs text-gray-500">
                              {episode.duration}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors">
                          {episode.title}
                        </h3>
                        {episode.description && (
                          <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                            {episode.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* YouTube Embed - All Episodes */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-3xl p-8 border border-amber-500/10">
              <div className="flex items-center gap-3 mb-6">
                <Mic2 className="w-6 h-6 text-amber-400" />
                <h2 className="text-2xl font-bold text-white">All Episodes</h2>
              </div>
              <div className="w-full rounded-2xl overflow-hidden border border-amber-500/20">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/videoseries?si=6gihCtuPUt3-yJ5n&amp;list=PLSgW3zKDhS3Jq41fKbkrhIZ94eEntlGN2" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="text-center mt-6 space-y-3">
                <p className="text-gray-400 text-sm">
                  Browse and watch all episodes • Click the menu icon in the player to see the full playlist
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a 
                    href="https://open.spotify.com/show/6WrVUJaIMTwWsTwX3GgmOO?si=6ca3b61d996041f3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Stream all episodes on Spotify
                  </a>
                  <a 
                    href="https://youtube.com/playlist?list=PLSgW3zKDhS3Jq41fKbkrhIZ94eEntlGN2&si=UCwV_yqNx5Pq4DKH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View full playlist on YouTube
                  </a>
                  <a 
                    href="https://podcasts.apple.com/us/podcast/one-song-one-story/id1846568214"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Listen on Apple Podcasts
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
