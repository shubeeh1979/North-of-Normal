import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import { Music, Mic2, User, Mail, Home, ExternalLink } from "lucide-react";
import SEO from "@/components/SEO";

export default function Sitemap() {
  const { data: podcastEpisodes = [] } = useQuery({
    queryKey: ['all-podcast-episodes-sitemap'],
    queryFn: async () => {
      const episodes = await api.entities.PodcastEpisode.list('-publish_date', 100);
      return episodes;
    },
  });

  const mainPages = [
    { name: "Home", path: "Home", icon: Home, description: "Professional songwriting & production" },
    { name: "Music", path: "Music", icon: Music, description: "Browse our catalog of pitch-ready pop songs" },
    { name: "Podcast", path: "Podcast", icon: Mic2, description: "One Song, One Story podcast" },
    { name: "About", path: "About", icon: User, description: "Learn about our team and story" },
    { name: "Contact", path: "Contact", icon: Mail, description: "Get in touch for licensing inquiries" },
  ];

  // Generate XML sitemap data
  const generateXMLSitemap = () => {
    const baseUrl = window.location.origin;
    const now = new Date().toISOString().split('T')[0];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;

    mainPages.forEach(page => {
      xml += `  <url>
    <loc>${baseUrl}${createPageUrl(page.path)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    });

    podcastEpisodes.forEach(episode => {
      const publishDate = episode.publish_date || now;
      xml += `  <url>
    <loc>${baseUrl}${createPageUrl("PodcastEpisode")}?id=${episode.id}</loc>
    <lastmod>${publishDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    });

    xml += `</urlset>`;
    return xml;
  };

  const downloadSitemap = () => {
    const xml = generateXMLSitemap();
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO
        title="Sitemap"
        description="Browse all pages and content on North of Normal website"
        type="website"
      />
      <div className="min-h-screen pt-32 pb-20 px-4 bg-black">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sitemap</h1>
            <p className="text-gray-400 text-lg mb-6">
              Browse all pages and content on our website
            </p>
            <button
              onClick={downloadSitemap}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="font-medium">Download XML Sitemap</span>
            </button>
          </div>

          {/* Main Pages */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Main Pages</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {mainPages.map((page) => (
                <Link
                  key={page.path}
                  to={createPageUrl(page.path)}
                  className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10 hover:border-amber-500/30 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500/20 transition-all">
                      <page.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                        {page.name}
                      </h3>
                      <p className="text-sm text-gray-400">{page.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{createPageUrl(page.path)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Podcast Episodes */}
          {podcastEpisodes.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">
                Podcast Episodes ({podcastEpisodes.length})
              </h2>
              <div className="space-y-3">
                {podcastEpisodes.map((episode) => (
                  <Link
                    key={episode.id}
                    to={`${createPageUrl("PodcastEpisode")}?id=${episode.id}`}
                    className="block bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-xl p-4 border border-amber-500/10 hover:border-amber-500/30 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
                        EP {episode.episode_number}
                      </span>
                      <h3 className="text-white font-medium group-hover:text-amber-400 transition-colors flex-1">
                        {episode.title}
                      </h3>
                      {episode.publish_date && (
                        <span className="text-xs text-gray-500">
                          {new Date(episode.publish_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* External Links */}
          <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10">
            <h2 className="text-2xl font-bold text-white mb-6">External Links</h2>
            <div className="space-y-3">
              <a
                href="https://open.spotify.com/artist/1MYJIsHXbNFaM78MFuwpeg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-[#1DB954]/10 hover:bg-[#1DB954]/20 text-[#1DB954] border border-[#1DB954]/30 transition-all"
              >
                <span className="font-medium">Spotify Artist Profile</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://soundcloud.com/north_of_normal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-[#FF5500]/10 hover:bg-[#FF5500]/20 text-[#FF5500] border border-[#FF5500]/30 transition-all"
              >
                <span className="font-medium">SoundCloud Profile</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/north_of_normal_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border border-pink-500/30 transition-all"
              >
                <span className="font-medium">Instagram</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/north-of-normal-productions/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] border border-[#0A66C2]/30 transition-all"
              >
                <span className="font-medium">LinkedIn</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}