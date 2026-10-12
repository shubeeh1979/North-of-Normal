import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { NowPlayingProvider } from "@/components/NowPlayingContext";
import MiniPlayer from "@/components/MiniPlayer";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <NowPlayingProvider>
      <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
        {/* Navigation */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? "bg-black/90 backdrop-blur-xl border-b border-amber-500/20" : "bg-transparent"
          } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <Link to={createPageUrl("Home")} className="group">
                <div className="flex items-center gap-3">
                  {/* Star */}
                  <div className="relative flex items-center justify-center w-10 h-10">
                    <div className="absolute inset-0 scale-150 bg-amber-400 blur-xl opacity-40 group-hover:opacity-70 transition-opacity" />
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <div className="absolute w-px bg-gradient-to-b from-transparent via-amber-300 to-transparent h-full" />
                      <div className="absolute h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-full" />
                      <div className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,1),0_0_24px_rgba(251,191,36,1)]" />
                    </div>
                  </div>
                  
                  {/* Text - hidden on mobile, visible on sm+ */}
                  <div className="hidden sm:block text-xs font-black tracking-wider leading-none text-center">
                    <div>NORTH</div>
                    <div className="text-[0.6em] font-black tracking-widest">OF</div>
                    <div>NORMAL</div>
                  </div>
                </div>
              </Link>

            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>{children}</main>

        {/* Mini Player */}
        <MiniPlayer />

        {/* Footer */}
        <footer className="bg-[#0a0a0a] border-t border-amber-500/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div className="text-center md:text-left">
                <div className="mb-4 inline-block">
                  <Logo size="md" showText={true} />
                </div>
                <p className="text-gray-400 text-sm mt-4 max-w-xs mx-auto md:mx-0">
                  Pitch-ready pop songs for artists and sync
                </p>
              </div>

              <div className="text-center md:text-left">
                <h3 className="font-heading font-medium mb-4 text-amber-300">Connect</h3>
                <div className="space-y-3 inline-flex flex-col items-center md:items-start">
                  <a
                    href="https://www.instagram.com/north_of_normal_official/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white hover:text-white transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] group-hover:shadow-[0_0_20px_rgba(225,48,108,0.5)] flex items-center justify-center transition-all">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Instagram</span>
                  </a>

                  <a
                    href="https://open.spotify.com/artist/1MYJIsHXbNFaM78MFuwpeg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white hover:text-white transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#1DB954] group-hover:shadow-[0_0_20px_rgba(29,185,84,0.5)] flex items-center justify-center transition-all">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Spotify</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-amber-500/20 text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} North of Normal. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </NowPlayingProvider>
  );
}