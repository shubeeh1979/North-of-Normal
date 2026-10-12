import React from "react";
import { api } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Disc3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO, { getOrganizationSchema } from "@/components/SEO";

const PLAYLIST_URL =
"https://north-of-normal.disco.ac/playlist-new/30513386?date=20260710&user_id=2735517&signature=v2%3Alegacy%3AQbOA7gLLqMEmtDAZFYknM1cCXecvils9c6k_ihvEi6s";

function GoldDivider() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
    </div>);

}

export default function Home() {
  const { data: artists = [] } = useQuery({
    queryKey: ["landing-artists"],
    queryFn: async () => api.entities.Artist.list()
  });

  return (
    <>
      <SEO
        title="North of Normal — Sync Artists"
        description="North of Normal is a songwriting and production team from Newcastle, England, creating pitch-ready pop songs for artists and sync."
        keywords="sync artists, songwriting, music production, pop songs, sync licensing, Newcastle"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
          getOrganizationSchema(),
          {
            "@type": "MusicGroup",
            name: "North of Normal",
            genre: ["Pop", "Retro Pop", "Folk", "Rock", "R&B"],
            url: window.location.origin
          }]

        }} />
      
      <div className="relative bg-[#0a0a0a] text-white font-body">
        {/* Radial gold glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
            "radial-gradient(ellipse 80% 50% at 50% 35%, rgba(212,160,23,0.10), transparent 70%)"
          }} />
        

        {/* Subtle film grain */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
          }} />
        

        <div className="relative z-10">
          {/* Hero */}
          <section className="relative flex flex-col items-center justify-center px-4 pt-28 pb-12 overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              {[...Array(18)].map((_, i) =>
              <div
                key={i}
                className="absolute w-px h-px bg-amber-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `twinkle ${3 + Math.random() * 2}s infinite ${Math.random() * 2}s`
                }} />

              )}
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
              {/* North Star mark — engraved gold lines */}
              <div className="flex items-center justify-center w-14 h-14 mx-auto mb-6">
                <div className="absolute w-14 h-14 scale-150 bg-amber-500/20 blur-2xl" />
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <div className="absolute w-px bg-gradient-to-b from-transparent via-amber-300/80 to-transparent h-full" />
                  <div className="absolute h-px bg-gradient-to-r from-transparent via-amber-300/80 to-transparent w-full" />
                  <div className="absolute w-2 h-2 bg-amber-200 rounded-full shadow-[0_0_16px_rgba(251,191,36,0.9)]" />
                </div>
              </div>

              <div className="font-heading font-medium tracking-[0.22em] leading-none mb-6 text-amber-100/90">
                <div className="text-3xl md:text-5xl mb-1">NORTH</div>
                <div className="text-[0.6rem] md:text-xs tracking-[0.45em] mb-1 text-amber-400/80 font-body">OF</div>
                <div className="text-3xl md:text-5xl mb-3">NORMAL</div>
                <div className="w-48 md:w-64 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto" />
              </div>

              <h1 className="font-heading text-3xl md:text-5xl font-medium tracking-tight mb-4 text-white">
                Sync artists.{" "}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                  Pitch-ready pop songs.
                </span>
              </h1>

              <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-6">
                There's a certain kind of vibe that comes from family making music together. Think The Beach Boys, Oasis, The Jackson 5, Haim, Kings of Leon or Billie & Finneas.
              </p>
              <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-6">
                That's North of Normal – two brothers from Newcastle, England, creating songs that have a familiar yet fresh vibe to them. Their soulful pop catalogue feels joyful, authentic, and written for sync.
              </p>
              <p className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-8">Every track is one-stop pre-cleared for sync, and every track carries something real underneath the feel-good surface — shadow and light, tension and release, drawn from lived experience. The result: anthems that sound effortless but are built to move a scene, lift a campaign, or soundtrack a summer.

              </p>

              {/* Hero photo */}
              <div className="relative max-w-3xl mx-auto mb-10 rounded-2xl overflow-hidden border border-amber-500/20 shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
                <img
                  src="/images/north-of-normal-brothers.png"
                  alt="Haider and Shubeeh — the two brothers behind North of Normal"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent" />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-semibold px-8 py-6 text-base rounded-full shadow-[0_4px_24px_rgba(212,160,23,0.35)] border border-amber-300/40">
                    
                    <Disc3 className="w-5 h-5 mr-2" />
                    Listen to our playlist
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>


            </div>
          </section>

          <GoldDivider />

          {/* About */}
          <section className="px-4 py-12">
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-heading text-2xl md:text-3xl font-medium leading-snug text-white/90">
                Two brothers writing summery, joyful anthems —
                <span className="italic text-amber-300"> songs that put a smile on your face.</span>
              </p>
              <p className="mt-4 text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                We blend sharp toplines with bright, feel-good production. Every track is crafted
                to feel warm, uplifting, and impossible not to hum along to.
              </p>

              <div className="flex justify-center mt-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold px-6 py-3 text-sm rounded-full shadow-[0_4px_24px_rgba(212,160,23,0.35)] border border-amber-300/40">
                  <ShieldCheck className="w-4 h-4" />
                  One Stop Clearance
                </div>
              </div>
            </div>
          </section>

          {/* Artists */}
          {artists.length > 0 &&
          <>
              <GoldDivider />
              <section className="px-4 py-12">
                <div className="max-w-5xl mx-auto">
                  <h2 className="font-heading text-2xl md:text-3xl font-medium text-center mb-8 text-white">
                    The Team
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {artists.map((artist) =>
                  <div
                    key={artist.id}
                    className="bg-[#141414] rounded-2xl p-5 border border-amber-500/15 hover:border-amber-500/30 transition-colors">
                    
                        <div className="flex items-center gap-4 mb-3">
                          {artist.profile_image &&
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-amber-500/20 flex-shrink-0">
                              <img
                          src={artist.profile_image}
                          alt={artist.name}
                          className="w-full h-full object-cover" />
                        
                            </div>
                      }
                          <div>
                            <h3 className="font-heading text-xl font-medium text-white">{artist.name}</h3>
                            {artist.genre &&
                        <p className="text-amber-400/90 text-xs mt-1 uppercase tracking-wider font-body">
                                {artist.genre}
                              </p>
                        }
                          </div>
                        </div>
                        {artist.bio && (() => {
                      const [tagline, ...rest] = artist.bio.split("\n\n");
                      const body = rest.join("\n\n").split("\n\n");
                      return (
                        <div>
                              {tagline &&
                          <p className="font-heading italic text-amber-200/90 text-sm leading-relaxed mb-2">
                                  {tagline}
                                </p>
                          }
                              {body.map((para, i) =>
                          <p key={i} className="text-neutral-400 text-sm leading-relaxed mb-2 last:mb-0">
                                  {para}
                                </p>
                          )}
                            </div>);

                    })()}
                      </div>
                  )}
                  </div>
                </div>
              </section>
            </>
          }

          <GoldDivider />

          {/* Playlist CTA */}
          <section className="px-4 py-12">
            <div className="max-w-3xl mx-auto text-center bg-[#141414] rounded-3xl p-8 md:p-10 border border-amber-500/20">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-500/30 mx-auto mb-4">
                <Disc3 className="w-6 h-6 text-amber-300" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-medium mb-2 text-white">
                Hear the catalog
              </h2>
              <p className="text-neutral-400 mb-6 max-w-xl mx-auto">
                Stream our curated playlist of pitch-ready pop songs — pre-cleared and ready for sync.
              </p>
              <a href={PLAYLIST_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-semibold px-8 py-6 text-base rounded-full border border-amber-300/40">
                  
                  Open playlist on DISCO.AC
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </section>
        </div>

        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.55; }
          }
        `}</style>
      </div>
    </>);

}