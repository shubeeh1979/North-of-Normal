
import React, { useRef, useState, useEffect } from "react";
import { api } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mic2, ArrowLeft, Calendar, Clock, Share2, Play, Pause, Volume2, VolumeX, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import SEO, { getPodcastEpisodeSchema, getBreadcrumbSchema } from "@/components/SEO";

export default function PodcastEpisode() {
  const urlParams = new URLSearchParams(window.location.search);
  const episodeId = urlParams.get('id');

  const { data: episode, isLoading, error } = useQuery({
    queryKey: ['podcast-episode', episodeId],
    queryFn: async () => {
      const episodes = await api.entities.PodcastEpisode.list();
      return episodes.find(ep => ep.id === episodeId);
    },
    enabled: !!episodeId,
  });

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [episode?.audio_url]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (value) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(1);
      if (audioRef.current) audioRef.current.volume = 1;
    } else {
      setVolume(0);
      if (audioRef.current) audioRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: episode?.title || 'One Song, One Story Episode',
        text: episode?.description || 'Check out this podcast episode!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 bg-black flex items-center justify-center">
        <div className="text-center">
          <Mic2 className="w-12 h-12 text-amber-400 animate-pulse mx-auto mb-4" />
          <p className="text-gray-400">Loading episode...</p>
        </div>
      </div>
    );
  }

  if (error || !episode) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 bg-black flex items-center justify-center">
        <div className="text-center max-w-md">
          <Mic2 className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Episode Not Found</h2>
          <p className="text-gray-400 mb-6">Sorry, we couldn't find this episode.</p>
          <Link to={createPageUrl("Podcast")}>
            <Button className="bg-amber-500 hover:bg-amber-600 text-black">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Podcast
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${episode.title} - Episode ${episode.episode_number}`}
        description={episode.description || `Listen to episode ${episode.episode_number} of One Song, One Story podcast. ${episode.duration || ''}`}
        image={episode.cover_image}
        keywords={`podcast episode, one song one story, episode ${episode.episode_number}, music podcast, ${episode.title}`}
        type="music.song"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            getPodcastEpisodeSchema(episode),
            getBreadcrumbSchema([
              {
                name: "Home",
                url: window.location.origin
              },
              {
                name: "Podcast",
                url: window.location.origin + createPageUrl("Podcast")
              },
              {
                name: episode.title,
                url: window.location.href
              }
            ])
          ]
        }}
      />
      <div className="min-h-screen pt-32 pb-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link to={createPageUrl("Podcast")}>
            <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5 mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Episodes
            </Button>
          </Link>

          {/* Episode Header */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              {/* Cover Image */}
              {episode.cover_image && (
                <div className="w-full md:w-80 h-80 flex-shrink-0 rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl">
                  <img
                    src={episode.cover_image}
                    alt={episode.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Episode Info */}
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 flex-shrink-0">
                    <Mic2 className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
                        Episode {episode.episode_number}
                      </span>
                      {episode.season && (
                        <span className="text-sm text-gray-500">
                          Season {episode.season}
                        </span>
                      )}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                      {episode.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
                      {episode.publish_date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(episode.publish_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                      )}
                      {episode.duration && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{episode.duration}</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleShare}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-amber-500/20 hover:border-amber-500/30 transition-all"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Share Episode</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Player */}
            {episode.audio_url && (
              <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10 mb-8">
                <audio ref={audioRef} src={episode.audio_url} preload="metadata" />

                <div className="mb-4">
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={0.1}
                    onValueChange={handleTimeChange}
                    className="cursor-pointer [&_[role=slider]]:bg-amber-500 [&_[role=slider]]:border-amber-400"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-amber-400 blur-xl opacity-30" />
                      <Button
                        onClick={togglePlay}
                        size="lg"
                        className="relative w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                      </Button>
                    </div>
                    <div className="text-sm text-white font-medium">
                      {isPlaying ? 'Now Playing' : 'Play Episode'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={toggleMute}
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-white hover:bg-amber-500/10"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                    <Slider
                      value={[volume]}
                      max={1}
                      step={0.01}
                      onValueChange={handleVolumeChange}
                      className="w-24 cursor-pointer [&_[role=slider]]:bg-amber-500 [&_[role=slider]]:border-amber-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            {episode.description && (
              <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10 mb-8">
                <h2 className="text-xl font-bold text-white mb-4">About This Episode</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {episode.description}
                </p>
              </div>
            )}

            {/* Platform Links */}
            <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-amber-500/10">
              <h3 className="text-lg font-bold text-white mb-4">Listen on Other Platforms</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://open.spotify.com/show/6WrVUJaIMTwWsTwX3GgmOO?si=6ca3b61d996041f3"
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
                  href="https://youtube.com/playlist?list=PLSgW3zKDhS3Jq41fKbkrhIZ94eEntlGN2&si=UCwV_yqNx5Pq4DKH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF0000]/10 hover:bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30 transition-all group"
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#9333EA]/10 hover:bg-[#9333EA]/20 text-[#9333EA] border border-[#9333EA]/30 transition-all group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm0 2.5c5.2 0 9.5 4.3 9.5 9.5s-4.3 9.5-9.5 9.5S2.5 17.2 2.5 12 6.8 2.5 12 2.5zm0 3.8c-3.1 0-5.7 2.6-5.7 5.7 0 2.1 1.2 4 3 5v3.5c0 .4.3.8.8.8h3.8c.4 0 .8-.3.8-.8V17c1.8-1 3-2.9 3-5 0-3.1-2.6-5.7-5.7-5.7zm0 2.3c1.9 0 3.4 1.5 3.4 3.4 0 1.3-.7 2.4-1.8 3v2.5h-3.2V15c-1.1-.6-1.8-1.7-1.8-3 0-1.9 1.5-3.4 3.4-3.4zm0 1.1c-1.3 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3 2.3-1 2.3-2.3-1-2.3-2.3-2.3z"/>
                  </svg>
                  <span className="font-medium">Apple Podcasts</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
