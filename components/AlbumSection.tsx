import React from 'react';
import { ALBUMS } from '../constants';
import { Play } from 'lucide-react';
import { Album } from '../types';

interface AlbumSectionProps {
  onPlayAlbum: (album: Album) => void;
}

const AlbumSection: React.FC<AlbumSectionProps> = ({ onPlayAlbum }) => {
  return (
    <section className="py-24 bg-shren-black relative">
       {/* Section Title */}
       <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex items-end justify-between border-b border-white/10 pb-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">音乐</h2>
              <p className="font-mono text-shren-textGray text-sm">SELECTED WORKS [001-003]</p>
            </div>
            <div className="hidden md:block">
              <span className="font-mono text-xs text-shren-red">/// ARCHIVE ACCESS GRANTED</span>
            </div>
          </div>
       </div>

       {/* Grid */}
       <div className="max-w-7xl mx-auto px-6">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {ALBUMS.map((album, index) => (
              <div 
                key={album.id} 
                className="group relative flex flex-col gap-4"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-shren-gray cursor-pointer" onClick={() => onPlayAlbum(album)}>
                   <img 
                      src={album.coverUrl} 
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                   
                   {/* Overlay on Hover */}
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border border-white flex items-center justify-center backdrop-blur-sm hover:bg-shren-red hover:border-shren-red transition-all">
                        <Play className="w-6 h-6 text-white ml-1" fill="white" />
                      </div>
                   </div>

                   {/* Category Badge */}
                   <div className="absolute top-4 left-4 bg-black/80 px-2 py-1">
                      <span className="text-xs font-mono text-white">{album.category}</span>
                   </div>
                </div>

                {/* Info */}
                <div className="flex flex-col items-start border-l-2 border-transparent group-hover:border-shren-red pl-0 group-hover:pl-4 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-shren-red font-mono text-xs">0{index + 1}</span>
                    <h3 className="text-xl font-bold text-white uppercase truncate w-full">{album.title}</h3>
                  </div>
                  <p className="text-shren-textGray text-sm mb-2">{album.artist}</p>
                  <p className="text-white/40 text-xs font-mono line-clamp-2 hover:line-clamp-none transition-all">
                    {album.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Placeholder for expansion */}
            <div className="border border-white/10 flex items-center justify-center aspect-square md:aspect-auto min-h-[300px] opacity-50 hover:opacity-100 transition-opacity cursor-not-allowed bg-[url('https://dominicpoiblog.oss-cn-shanghai.aliyuncs.com/20251217200714.svg')]">
                <div className="text-center">
                  <p className="text-shren-textGray font-mono text-sm tracking-widest">COMING SOON</p>
                  <p className="text-shren-red text-xs mt-2">/// LOCKED</p>
                </div>
            </div>
         </div>
       </div>
    </section>
  );
};

export default AlbumSection;