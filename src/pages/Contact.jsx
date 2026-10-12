
import React from "react";
import { Mail, Music, Mic2, MapPin, Instagram, Linkedin } from "lucide-react";
import LicensingInquiryForm from "@/components/LicensingInquiryForm";
import Logo from "@/components/Logo";
import SEO from "@/components/SEO";

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us - Licensing Inquiries"
        description="Get in touch with North of Normal for music licensing inquiries. We provide pitch-ready pop songs for film, TV, advertising, gaming, and artist development. Located in Newcastle upon Tyne, UK."
        keywords="contact, licensing inquiry, music licensing, sync licensing, contact music producer, Newcastle"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact North of Normal",
          "description": "Submit a licensing inquiry or get in touch",
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
                "name": "Contact",
                "item": typeof window !== 'undefined' ? window.location.href : ''
              }
            ]
          },
          "mainEntity": {
            "@type": "Organization",
            "name": "North of Normal",
            "email": "info@northofnormal.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Newcastle upon Tyne",
              "addressCountry": "UK"
            }
          }
        }}
      />
      <div className="min-h-screen pt-32 pb-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <Logo size="lg" showText={true} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Have a question or interested in working together? Send us a message and we'll respond within 24-48 hours.
            </p>
          </div>

          {/* Main Form */}
          <div className="mb-20">
            <LicensingInquiryForm />
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10 text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                <Music className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Music Catalog</h3>
              <p className="text-gray-400 text-sm">
                23+ tracks available for licensing
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10 text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                <Mic2 className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">One Song, One Story</h3>
              <p className="text-gray-400 text-sm">
                Our podcast on all platforms
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10 text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                <MapPin className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Location</h3>
              <p className="text-gray-400 text-sm">
                Newcastle upon Tyne, UK
              </p>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10 text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                <Mail className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Email</h3>
              <a href="mailto:info@northofnormal.com" className="text-amber-400 text-sm hover:text-amber-300 transition-colors">
                info@northofnormal.com
              </a>
            </div>
          </div>

          {/* Social Media & Additional Info */}
          <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-3xl p-8 border border-amber-500/10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Connect With Us</h2>
              <p className="text-gray-400">Follow our journey and stay updated with new releases</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://www.instagram.com/north_of_normal_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] hover:shadow-[0_0_30px_rgba(225,48,108,0.5)] text-white border-0 transition-all group"
              >
                <Instagram className="w-5 h-5" />
                <span className="font-medium">Instagram</span>
              </a>

              <a
                href="https://www.linkedin.com/company/north-of-normal-productions/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0A66C2] hover:shadow-[0_0_30px_rgba(10,102,194,0.5)] text-white border-0 transition-all group"
              >
                <Linkedin className="w-5 h-5" />
                <span className="font-medium">LinkedIn</span>
              </a>

              <a
                href="https://open.spotify.com/artist/1MYJIsHXbNFaM78MFuwpeg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1DB954] hover:shadow-[0_0_30px_rgba(29,185,84,0.5)] text-white border-0 transition-all group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <span className="font-medium">Spotify</span>
              </a>

              <a
                href="https://soundcloud.com/north_of_normal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF5500] hover:shadow-[0_0_30px_rgba(255,85,0,0.5)] text-white border-0 transition-all group"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 17.939h-1v-8.068c.308-.231.639-.429 1-.566v8.634zm3 0h1v-9.224c-.229.265-.443.548-.621.857l-.379-.184v8.551zm-2 0h1v-8.848c-.508-.079-.623-.05-1-.01v8.858zm-4 0h1v-7.02c-.312.458-.555.971-.692 1.535l-.308-.182v5.667zm-3-5.25c-.606.547-1 1.354-1 2.268 0 .914.394 1.721 1 2.268v-4.536zm18.879-.671c-.204-2.837-2.404-5.079-5.117-5.079-1.022 0-1.964.328-2.762.877v10.123h9.089c1.607 0 2.911-1.393 2.911-3.106 0-1.714-1.304-3.106-2.911-3.106h-.21z"/>
                </svg>
                <span className="font-medium">SoundCloud</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
