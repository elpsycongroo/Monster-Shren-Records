import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ListMusic, X } from 'lucide-react';
import { Album, Song } from '../types';

interface PlayerBarProps {
  currentAlbum: Album | null;
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const PlayerBar: React.FC<PlayerBarProps> = ({ currentAlbum }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);
  const verticalVolumeRef = useRef<HTMLDivElement>(null);

  // Handle Album Change
  useEffect(() => {
    if (currentAlbum) {
      setCurrentSongIndex(0);
      setIsPlaying(true); 
    }
  }, [currentAlbum?.id]);

  // Handle Source Update
  useEffect(() => {
    if (audioRef.current && currentAlbum) {
      const newUrl = currentAlbum.songs[currentSongIndex].audioUrl;
      // Only update src if it's different to avoid reloading
      if (audioRef.current.src !== newUrl) {
          audioRef.current.src = newUrl;
          audioRef.current.load();
      }
    }
  }, [currentSongIndex, currentAlbum]);

  // Handle Play/Pause State
  useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      if (isPlaying) {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
              playPromise.catch(error => {
                  console.log("Playback prevented:", error);
                  // If blocked by browser policy (or other error), revert to paused state
                  setIsPlaying(false);
              });
          }
      } else {
          audio.pause();
      }
  }, [isPlaying, currentSongIndex, currentAlbum]); 

  // Handle Time Update
  const handleTimeUpdate = () => {
    if (audioRef.current && !isDragging) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Handle Metadata Loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle Song End
  const handleEnded = () => {
    handleNext();
  };

  // Next Song
  const handleNext = () => {
    if (!currentAlbum) return;
    setCurrentSongIndex((prev) => (prev + 1) % currentAlbum.songs.length);
  };

  // Prev Song
  const handlePrev = () => {
    if (!currentAlbum) return;
    setCurrentSongIndex((prev) => (prev - 1 + currentAlbum.songs.length) % currentAlbum.songs.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Progress Bar Interaction
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.min(Math.max(x / width, 0), 1);
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.min(Math.max(x / width, 0), 1);
    setCurrentTime(percentage * duration);
  };

  const handleDragEnd = (e: React.MouseEvent<HTMLDivElement>) => {
     if (isDragging && audioRef.current) {
        audioRef.current.currentTime = currentTime;
        setIsDragging(false);
     }
  }

  // Volume Control Logic
  const handleVolumeButtonClick = () => {
    if (window.innerWidth < 768) {
       setIsVolumeOpen(!isVolumeOpen);
    } else {
       toggleMute();
    }
  };

  const handleVerticalVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!verticalVolumeRef.current || !audioRef.current) return;
    const rect = verticalVolumeRef.current.getBoundingClientRect();
    // Calculate height from bottom
    const y = rect.bottom - e.clientY;
    const height = rect.height;
    const newVolume = Math.min(Math.max(y / height, 0), 1);
    
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeRef.current || !audioRef.current) return;
    const rect = volumeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const newVolume = Math.min(Math.max(x / width, 0), 1);
    
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  if (!currentAlbum) return null;

  const currentSong = currentAlbum.songs[currentSongIndex];
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        crossOrigin="anonymous"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Playlist Popover */}
      {isPlaylistOpen && (
        <div className="fixed bottom-24 right-4 md:right-10 w-80 bg-shren-black/95 backdrop-blur-xl border border-white/10 shadow-2xl z-[60] animate-fade-in-up">
           <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <span className="font-bold text-white tracking-widest text-sm">CURRENT PLAYLIST</span>
              <button onClick={() => setIsPlaylistOpen(false)} className="text-shren-textGray hover:text-white">
                 <X size={16} />
              </button>
           </div>
           <div className="max-h-64 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-shren-red scrollbar-track-transparent">
              {currentAlbum.songs.map((song, index) => (
                 <div 
                    key={song.id}
                    onClick={() => setCurrentSongIndex(index)}
                    className={`p-3 flex items-center justify-between cursor-pointer group rounded-sm transition-colors mb-1
                       ${index === currentSongIndex ? 'bg-shren-red/10 border-l-2 border-shren-red' : 'hover:bg-white/5 border-l-2 border-transparent'}
                    `}
                 >
                    <div className="flex flex-col">
                       <span className={`text-sm font-bold ${index === currentSongIndex ? 'text-shren-red' : 'text-white group-hover:text-white'}`}>
                          {song.title}
                       </span>
                       <span className="text-xs text-shren-textGray">{song.artist}</span>
                    </div>
                    {index === currentSongIndex && <div className="w-2 h-2 rounded-full bg-shren-red animate-pulse" />}
                 </div>
              ))}
           </div>
        </div>
      )}

      {/* Main Player Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-shren-black/95 backdrop-blur-lg border-t border-white/10 z-50 px-4 py-3 md:py-4 select-none">
        {/* Progress Bar Hit Area */}
        <div 
           className="absolute top-0 left-0 w-full h-2 -mt-1 cursor-pointer group z-10"
           ref={progressRef}
           onMouseDown={() => setIsDragging(true)}
           onMouseMove={handleProgressDrag}
           onMouseUp={handleDragEnd}
           onMouseLeave={handleDragEnd}
           onClick={handleProgressClick}
        >
           {/* Background Track */}
           <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 group-hover:h-[4px] transition-all" />
           {/* Active Track */}
           <div 
              className="absolute top-1/2 left-0 h-[2px] bg-shren-red group-hover:h-[4px] transition-all relative"
              style={{ width: `${progressPercent}%` }}
           >
              {/* Thumb */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-[0_0_10px_rgba(255,0,60,0.8)] transition-opacity" />
           </div>
        </div>

        <div className="max-w-7xl mx-auto flex items-center justify-between h-full pt-1">
          
          {/* Track Info */}
          <div className="flex items-center gap-4 w-1/3 min-w-0">
            <img 
              src={currentAlbum.coverUrl} 
              alt="Cover" 
              className={`w-10 h-10 md:w-14 md:h-14 object-cover border border-white/10 ${isPlaying ? 'animate-pulse-fast' : ''}`} 
            />
            <div className="hidden sm:flex flex-col overflow-hidden">
              <span className="text-white font-bold text-sm md:text-base truncate">{currentSong.title}</span>
              <span className="text-shren-textGray text-xs md:text-sm truncate">{currentSong.artist}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center justify-center w-1/3">
            <div className="flex items-center gap-4 md:gap-8">
               <button onClick={handlePrev} className="text-shren-textGray hover:text-white transition-colors p-2">
                 <SkipBack size={20} />
               </button>
               
               <button 
                  onClick={togglePlay}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-shren-black flex items-center justify-center hover:bg-shren-red hover:text-white transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(255,0,60,0.4)] active:scale-95"
               >
                 {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
               </button>
               
               <button onClick={handleNext} className="text-shren-textGray hover:text-white transition-colors p-2">
                 <SkipForward size={20} />
               </button>
            </div>
            
            {/* Time Display */}
            <div className="flex items-center justify-between w-full max-w-[240px] mt-1 px-2">
               <span className="text-[10px] font-mono text-shren-textGray">{formatTime(currentTime)}</span>
               <span className="text-[10px] font-mono text-shren-textGray">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume / Playlist */}
          <div className="flex items-center justify-end gap-2 md:gap-6 w-1/3">
             <div className="flex items-center gap-2 relative">
                
                {/* Mobile Vertical Volume Slider (Popup) */}
                <div 
                   className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-10 h-36 bg-shren-black/95 border border-white/10 rounded-full flex flex-col items-center justify-center z-50 md:hidden transition-all duration-200 shadow-xl ${isVolumeOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}
                >
                   <div 
                      className="w-2 h-28 bg-white/20 rounded-full relative cursor-pointer group overflow-hidden"
                      ref={verticalVolumeRef}
                      onClick={handleVerticalVolumeClick}
                   >
                      <div 
                         className="absolute bottom-0 left-0 w-full bg-shren-red transition-all duration-100"
                         style={{ height: `${isMuted ? 0 : volume * 100}%` }}
                      />
                   </div>
                   {/* Triangle indicator */}
                   <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/10 border-r border-b border-white/10 transform rotate-45 bg-shren-black"></div>
                </div>

                <button onClick={handleVolumeButtonClick} className="text-shren-textGray hover:text-white transition-colors p-2">
                   {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                
                {/* Desktop Horizontal Slider */}
                <div 
                   className="w-16 h-4 hidden md:flex items-center cursor-pointer group"
                   ref={volumeRef}
                   onClick={handleVolumeClick}
                >
                   <div className="w-full h-1 bg-white/10 rounded-full relative overflow-hidden">
                      <div 
                         className="h-full bg-shren-textGray group-hover:bg-shren-red transition-colors" 
                         style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                      />
                   </div>
                </div>
             </div>

             <button 
                onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
                className={`text-shren-textGray hover:text-white transition-colors p-2 rounded-full 
                   ${isPlaylistOpen ? 'bg-white/10 text-white' : ''}
                `}
             >
                <ListMusic size={20} />
             </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default PlayerBar;