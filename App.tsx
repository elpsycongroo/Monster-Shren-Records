import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AlbumSection from './components/AlbumSection';
import PlayerBar from './components/PlayerBar';
import Footer from './components/Footer';
import { ViewState, Album } from './types';
import { ALBUMS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);

  // Auto-select first album for player on load, but don't play
  useEffect(() => {
    if (ALBUMS.length > 0) {
      setCurrentAlbum(ALBUMS[0]);
    }
  }, []);

  const handlePlayAlbum = (album: Album) => {
    setCurrentAlbum(album);
    // In a real app, this would also trigger auto-play
  };

  const renderContent = () => {
    switch (currentView) {
      case 'ALBUMS':
        return (
          <div className="pt-20 min-h-screen bg-shren-black">
            <AlbumSection onPlayAlbum={handlePlayAlbum} />
          </div>
        );
      case 'ABOUT':
        return (
           <div className="pt-32 pb-24 min-h-screen bg-shren-black max-w-4xl mx-auto px-6">
              <h1 className="text-5xl font-bold mb-8 text-white tracking-tight">关于</h1>
              <div className="space-y-6 text-shren-textGray text-lg leading-relaxed">
                <p>
                  <strong className="text-white">神壬唱片MSR(Monster Shren Records)</strong> 自泰拉历十一世纪以来，致力于甄选突破传统分类的声音。
                </p>
                <p>
                  我们不仅仅是一个唱片公司，更是泰拉大陆的听觉档案库。从深海的寂静到星荚的遥望，从萨尔贡的黄沙到萨米的冰原，我们的艺术家捕捉着存在的频率。
                </p>
                <div className="p-6 border border-shren-red/30 bg-shren-red/5 mt-8">
                  <h3 className="text-shren-red font-mono text-sm mb-2">/// MISSION STATEMENT</h3>
                  <p className="italic text-white">"To amplify the whispers of the universe until they become a roar."</p>
                </div>
              </div>
           </div>
        );
      case 'HOME':
      default:
        return (
          <>
            <Hero onExplore={() => setCurrentView('ALBUMS')} />
            <AlbumSection onPlayAlbum={handlePlayAlbum} />
          </>
        );
    }
  };

  return (
    <div className={`bg-shren-black min-h-screen text-shren-white selection:bg-shren-red selection:text-white flex flex-col ${currentAlbum ? 'pb-24 md:pb-28' : ''}`}>
      <Header currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer />
      <PlayerBar currentAlbum={currentAlbum} />
    </div>
  );
};

export default App;