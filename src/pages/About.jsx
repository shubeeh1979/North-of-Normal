
import React from "react";
import { Music, Mic2, Heart, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import SEO from "@/components/SEO";

export default function About() {
  return (
    <>
      <SEO
        title="About Us - Our Story"
        description="North of Normal is a songwriting and production team based in Newcastle upon Tyne, UK. We create pitch-ready pop songs for artists and sync, blending sharp toplines with polished, modern production."
        keywords="about, songwriting team, music production, Newcastle, UK, pop music producers, sync licensing"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About North of Normal",
          "description": "Learn about our songwriting and production team",
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
                "name": "About",
                "item": typeof window !== 'undefined' ? window.location.href : ''
              }
            ]
          }
        }}
      />
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section with Logo */}
          <div className="text-center mb-20">
            <div className="mb-8">
              <Logo size="xl" showText={true} />
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-6">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Newcastle upon Tyne, United Kingdom</span>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A songwriting and production team creating pitch-ready pop songs for artists and sync.
              <br/>
              <span className="text-amber-400">Your North Star for exceptional music.</span>
            </p>
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border border-amber-500/20">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800"
                  alt="Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-amber-500/10 to-black rounded-3xl backdrop-blur-xl border border-amber-500/20 flex items-center justify-center">
                <Logo size="lg" showText={false} />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  We're two brothers who grew up writing songs in a tiny bedroom in Newcastle, chasing the same thing we're chasing now — music that means something. What started as a couple of guitars, a second-hand laptop, and way too many late-night experiments eventually became North of Normal, a home for songs that feel honest, cinematic, and built to travel.
                </p>
                <p>
                  We blend sharp toplines with polished, modern production to create music that connects — on stage, on radio, in headphones, and on screen. Our sound sits where pop, retro pop, folk, rock, and more overlap. We're obsessed with strong ideas, emotional clarity, and melodies that stick with you long after the first listen.
                </p>
                <p>
                  Our catalog moves from nostalgic, sun-drenched pop to intimate folk storytelling to bigger, cinematic rock moments — all crafted with a focus on feeling, identity, and commercial impact. Whether you're searching for your next single, a song that defines a character, or the perfect track to lift a scene, we build music that points true north.
                </p>
                <p>
                  Because just like the North Star, our job is to guide artists — and stories — toward the sound they've been trying to find.
                </p>
              </div>
            </div>
          </div>

          {/* What We Do */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-gradient-to-br from-amber-950/10 to-black/50 backdrop-blur-xl rounded-3xl p-8 border border-amber-500/20">
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-black border border-amber-500/30 flex items-center justify-center mb-6">
                <Music className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Songwriting & Production</h3>
              <p className="text-gray-400 leading-relaxed">
                Creating pitch-ready pop songs with strong concepts, memorable melodies, and polished production. Each track is crafted with commercial appeal and emotional resonance in mind.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-950/10 to-black/50 backdrop-blur-xl rounded-3xl p-8 border border-amber-500/20">
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-black border border-amber-500/30 flex items-center justify-center mb-6">
                <Mic2 className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Sync & Licensing</h3>
              <p className="text-gray-400 leading-relaxed">
                Music designed for film, TV, advertising, and games. Our tracks are built to enhance visual storytelling and create memorable moments on screen.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-20">
            {[
              { value: "23+", label: "Tracks Released" },
              { value: "Pop", label: "Primary Genre" },
              { value: "UK", label: "Based in" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-amber-500/20"
              >
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Genres */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">Our Sound</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["Pop", "Retro Pop", "Funk", "Folk", "Hip-hop"].map((genre) => (
                <div
                  key={genre}
                  className="px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-amber-500/20 text-gray-300 hover:border-amber-500/50 hover:text-amber-400 hover:bg-amber-500/5 transition-all"
                >
                  {genre}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-amber-950/20 to-black/50 backdrop-blur-xl rounded-3xl p-12 border border-amber-500/20">
            <div className="mb-6">
              <Logo size="lg" showText={false} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Let's Collaborate</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Looking for pitch-ready songs or custom production? Get in touch to discuss your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold px-8 py-6 text-lg rounded-full shadow-[0_0_20px_rgba(251,191,36,0.3)]"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get in Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-amber-500/30 hover:bg-amber-500/10 text-white px-8 py-6 text-lg rounded-full"
                onClick={() => window.open('https://soundcloud.com/north_of_normal', '_blank')}
              >
                Visit SoundCloud
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
