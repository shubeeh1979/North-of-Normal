import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useNowPlaying } from './NowPlayingContext';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function MiniPlayer() {
  const { currentTrack, isPlaying, audioRef, pauseTrack, resumeTrack, stopTrack } = useNowPlaying();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.audioUrl;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => pauseTrack();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    if (isPlaying) {
      audio.play().catch(err => console.error('Playback error:', err));
    } else {
      audio.pause();
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, isPlaying, audioRef, pauseTrack]);

  const togglePlay = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      resumeTrack();
    }
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
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const artistSlug = currentTrack?.artist
    ? currentTrack.artist.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    : null;

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black via-black/95 to-black/90 backdrop-blur-xl border-t border-amber-500/20"
      >
        <audio ref={audioRef} preload="metadata" />

        {/* Expanded View */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 py-4 border-b border-amber-500/10">
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-center gap-4 mb-3">
                    {currentTrack.coverImage && (
                      <img
                        src={currentTrack.coverImage}
                        alt={currentTrack.title}
                        className="w-20 h-20 rounded-lg object-cover border border-amber-500/20"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-lg truncate">
                        {currentTrack.title}
                      </h3>
                      {currentTrack.artist && artistSlug && (
                        <Link
                          to={`${createPageUrl('ArtistProfile')}?artist=${artistSlug}`}
                          className="text-gray-400 hover:text-amber-400 transition-colors truncate block"
                        >
                          {currentTrack.artist}
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-10 text-right">
                      {formatTime(currentTime)}
                    </span>
                    <Slider
                      value={[currentTime]}
                      max={duration || 100}
                      step={0.1}
                      onValueChange={handleTimeChange}
                      className="flex-1 cursor-pointer [&_[role=slider]]:bg-amber-500 [&_[role=slider]]:border-amber-400"
                    />
                    <span className="text-xs text-gray-400 w-10">
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mini Player Bar */}
        <div className="px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            {/* Album Art & Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {currentTrack.coverImage && (
                <img
                  src={currentTrack.coverImage}
                  alt={currentTrack.title}
                  className="w-12 h-12 rounded-lg object-cover border border-amber-500/20 flex-shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-white text-sm truncate">
                  {currentTrack.title}
                </h4>
                {currentTrack.artist && artistSlug && (
                  <Link
                    to={`${createPageUrl('ArtistProfile')}?artist=${artistSlug}`}
                    className="text-xs text-gray-400 hover:text-amber-400 transition-colors truncate block"
                  >
                    {currentTrack.artist}
                  </Link>
                )}
              </div>
            </div>

            {/* Desktop Progress */}
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
              <span className="text-xs text-gray-400 w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={0.1}
                onValueChange={handleTimeChange}
                className="flex-1 cursor-pointer [&_[role=slider]]:bg-amber-500 [&_[role=slider]]:border-amber-400"
              />
              <span className="text-xs text-gray-400 w-10">
                {formatTime(duration)}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Volume Control - Desktop Only */}
              <div className="hidden md:flex items-center gap-2">
                <Button
                  onClick={toggleMute}
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8"
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
                  className="w-20 cursor-pointer [&_[role=slider]]:bg-amber-500 [&_[role=slider]]:border-amber-400"
                />
              </div>

              {/* Play/Pause */}
              <Button
                onClick={togglePlay}
                size="icon"
                className="bg-amber-500 hover:bg-amber-600 text-black h-10 w-10 rounded-full"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 ml-0.5" />
                )}
              </Button>

              {/* Expand/Collapse - Mobile Only */}
              <Button
                onClick={() => setIsExpanded(!isExpanded)}
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8"
              >
                <ChevronUp
                  className={`w-4 h-4 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </Button>

              {/* Close */}
              <Button
                onClick={stopTrack}
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}