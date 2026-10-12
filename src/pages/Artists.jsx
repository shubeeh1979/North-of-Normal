
import React, { useState } from "react";
import { api } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Music, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

export default function Artists() {
  const [displayCount, setDisplayCount] = useState(6);

  const { data: artists = [], isLoading } = useQuery({
    queryKey: ['all-artists'],
    queryFn: async () => {
      const allArtists = await api.entities.Artist.list('-created_date', 100);
      return allArtists;
    }
  });

  const featuredArtists = artists.filter((a) => a.featured);
  const otherArtists = artists.filter((a) => !a.featured);
  const displayedOtherArtists = otherArtists.slice(0, displayCount);
  const hasMoreArtists = displayCount < otherArtists.length;

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 6, otherArtists.length));
  };

  return (
    <>
      <SEO
        title="Featured Artists"
        description="Discover talented artists featured on North of Normal. Browse artist profiles, listen to their tracks, and explore their music catalogs."
        keywords="artists, musicians, featured artists, music profiles, artist catalog"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Featured Artists",
          "description": "Browse our roster of featured artists",
          "url": window.location.href,
          "breadcrumb": {
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
              "name": "Artists",
              "item": window.location.href
            }]

          }
        }} />

      <div className="min-h-screen pt-32 pb-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                <Music className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
                  Featured Artists
                </h1>
                <p className="text-gray-400 text-lg">Get to know the souls behind the sound

                </p>
              </div>
            </div>
          </div>

          {isLoading ?
          <div className="text-center py-20">
              <Music className="w-12 h-12 text-amber-400 animate-pulse mx-auto mb-4" />
              <p className="text-gray-400">Loading artists...</p>
            </div> :
          artists.length === 0 ?
          <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-3xl p-16 border border-amber-500/10 text-center">
              <Music className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">No Artists Yet</h2>
              <p className="text-gray-400">Featured artists will appear here soon</p>
            </div> :

          <>
              {/* Featured Artists */}
              {featuredArtists.length > 0 &&
            <div className="mb-16">
                  <h2 className="text-3xl font-bold text-white mb-8">Team
              </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredArtists.map((artist, index) => <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}>

                        <Link
                      to={`${createPageUrl("ArtistProfile")}?artist=${artist.slug}`}
                      className="group bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl overflow-hidden border border-amber-500/10 hover:border-amber-500/30 transition-all block">

                          {/* Artist Image */}
                          <div className="relative h-64 overflow-hidden">
                            {artist.cover_image || artist.profile_image ?
                        <>
                                <img
                            src={artist.cover_image || artist.profile_image}
                            alt={artist.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                              </> :

                        <div className="w-full h-full bg-gradient-to-br from-amber-950/20 to-black" />
                        }
                            
                            {/* Profile Picture Overlay */}
                            {artist.profile_image && artist.cover_image &&
                        <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full overflow-hidden border-4 border-black/50">
                                <img
                            src={artist.profile_image}
                            alt={artist.name}
                            className="w-full h-full object-cover" />

                              </div>
                        }
                          </div>

                          {/* Artist Info */}
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                              {artist.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-3">
                              {artist.genre &&
                          <span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs">
                                  {artist.genre}
                                </span>
                          }
                              {artist.location &&
                          <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{artist.location}</span>
                                </div>
                          }
                            </div>
                            {artist.bio &&
                        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                                {artist.bio}
                              </p>
                        }
                          </div>
                        </Link>
                      </motion.div>
                )}
                  </div>
                </div>
            }

              {/* Other Artists */}
              {otherArtists.length > 0 &&
            <div>
                  <h2 className="text-3xl font-bold text-white mb-8">
                    {featuredArtists.length > 0 ? 'All Artists' : ''}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedOtherArtists.map((artist, index) =>
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}>

                        <Link
                    to={`${createPageUrl("ArtistProfile")}?artist=${artist.slug}`}
                    className="group bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl overflow-hidden border border-amber-500/10 hover:border-amber-500/30 transition-all block">

                          {/* Artist Image */}
                          <div className="relative h-64 overflow-hidden">
                            {artist.cover_image || artist.profile_image ?
                      <>
                                <img
                          src={artist.cover_image || artist.profile_image}
                          alt={artist.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />

                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                              </> :

                      <div className="w-full h-full bg-gradient-to-br from-amber-950/20 to-black" />
                      }
                            
                            {/* Profile Picture Overlay */}
                            {artist.profile_image && artist.cover_image &&
                      <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full overflow-hidden border-4 border-black/50">
                                <img
                          src={artist.profile_image}
                          alt={artist.name}
                          className="w-full h-full object-cover" />

                              </div>
                      }
                          </div>

                          {/* Artist Info */}
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                              {artist.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-3">
                              {artist.genre &&
                        <span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs">
                                  {artist.genre}
                                </span>
                        }
                              {artist.location &&
                        <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  <span>{artist.location}</span>
                                </div>
                        }
                            </div>
                            {artist.bio &&
                      <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                                {artist.bio}
                              </p>
                      }
                          </div>
                        </Link>
                      </motion.div>
                )}
                  </div>

                  {/* Load More Button */}
                  {hasMoreArtists &&
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mt-12">

                      <Button
                  onClick={loadMore}
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-10 py-6 rounded-lg">

                        Load More Artists ({otherArtists.length - displayCount} remaining)
                      </Button>
                    </motion.div>
              }
                </div>
            }
            </>
          }
        </div>
      </div>
    </>);

}