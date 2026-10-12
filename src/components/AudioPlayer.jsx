import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useNowPlaying } from "./NowPlayingContext";
import { motion } from "framer-motion";

const PlatformIcon = ({ platform }) => {
  const icons = {
    soundcloud: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 17.939h-1v-8.068c.308-.231.639-.429 1-.566v8.634zm3 0h1v-9.224c-.229.265-.443.548-.621.857l-.379-.184v8.551zm-2 0h1v-8.848c-.508-.079-.623-.05-1-.01v8.858zm-4 0h1v-7.02c-.312.458-.555.971-.692 1.535l-.308-.182v5.667zm-3-5.25c-.606.547-1 1.354-1 2.268 0 .914.394 1.721 1 2.268v-4.536zm18.879-.671c-.204-2.837-2.404-5.079-5.117-5.079-1.022 0-1.964.328-2.762.877v10.123h9.089c1.607 0 2.911-1.393 2.911-3.106 0-1.714-1.304-3.106-2.911-3.106h-.21z"/>
      </svg>
    ),
    spotify: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
    apple: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    )
  };
  return icons[platform] || null;
};

export default function AudioPlayer({ audioUrl, title, artist, coverImage, soundcloudUrl, spotifyUrl, appleMusicUrl }) {
  const { playTrack, currentTrack, isPlaying: globalIsPlaying } = useNowPlaying();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const isCurrentTrack = currentTrack?.audioUrl === audioUrl;

  useEffect(() => {
    if (isCurrentTrack) {
      setIsPlaying(globalIsPlaying);
    } else {
      setIsPlaying(false);
    }
  }, [isCurrentTrack, globalIsPlaying]);

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
  }, [audioUrl]);

  const togglePlay = () => {
    playTrack({
      audioUrl,
      title,
      artist,
      coverImage,
      soundcloudUrl,
      spotifyUrl,
      appleMusicUrl,
    });
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

  if (!audioUrl) return null;

  const artistSlug = artist ? artist.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
      className="bg-gradient-to-br from-amber-950/20 to-black/50 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/20 hover:border-amber-500/30 transition-all"
    >
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="flex items-center gap-4 mb-4">
        {coverImage && (
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            src={coverImage}
            alt={title}
            className="w-16 h-16 rounded-lg object-cover border border-amber-500/20"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{title}</h3>
          {artist && artistSlug && (
            <Link
              to={`${createPageUrl("ArtistProfile")}?artist=${artistSlug}`}
              className="text-sm text-gray-400 hover:text-amber-400 transition-colors truncate block"
            >
              {artist}
            </Link>
          )}
          <p className="text-xs text-amber-400 mt-1">1 min preview</p>
        </div>
      </div>

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

      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <div className="absolute inset-0 bg-amber-400 blur-xl opacity-30" />
          <Button
            onClick={togglePlay}
            size="lg"
            className="relative w-14 h-14 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black shadow-[0_0_20px_rgba(251,191,36,0.3)]"
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-1" />
            )}
          </Button>
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

      {/* Platform Links */}
      {(soundcloudUrl || spotifyUrl || appleMusicUrl) && (
        <div className="pt-4 border-t border-amber-500/20">
          <p className="text-xs text-gray-400 mb-3">Listen to full track:</p>
          <div className="flex gap-3 flex-wrap">
            {soundcloudUrl && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={soundcloudUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF5500]/10 hover:bg-[#FF5500]/20 text-[#FF5500] border border-[#FF5500]/30 transition-all group"
              >
                <PlatformIcon platform="soundcloud" />
                <span className="text-sm font-medium">SoundCloud</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            )}
            {spotifyUrl && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1DB954]/10 hover:bg-[#1DB954]/20 text-[#1DB954] border border-[#1DB954]/30 transition-all group"
              >
                <PlatformIcon platform="spotify" />
                <span className="text-sm font-medium">Spotify</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            )}
            {appleMusicUrl && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={appleMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FA243C]/10 hover:bg-[#FA243C]/20 text-[#FA243C] border border-[#FA243C]/30 transition-all group"
              >
                <PlatformIcon platform="apple" />
                <span className="text-sm font-medium">Apple Music</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}