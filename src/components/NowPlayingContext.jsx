import React, { createContext, useContext, useState, useRef } from 'react';

const NowPlayingContext = createContext();

export function NowPlayingProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const resumeTrack = () => {
    setIsPlaying(true);
  };

  const stopTrack = () => {
    setCurrentTrack(null);
    setIsPlaying(false);
  };

  return (
    <NowPlayingContext.Provider
      value={{
        currentTrack,
        isPlaying,
        audioRef,
        playTrack,
        pauseTrack,
        resumeTrack,
        stopTrack,
      }}
    >
      {children}
    </NowPlayingContext.Provider>
  );
}

export function useNowPlaying() {
  const context = useContext(NowPlayingContext);
  if (!context) {
    throw new Error('useNowPlaying must be used within NowPlayingProvider');
  }
  return context;
}