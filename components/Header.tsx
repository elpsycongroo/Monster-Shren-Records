import React, { useState } from 'react';
import { ViewState } from '../types';
import { NAV_LINKS } from '../constants';
import { Menu, X, Disc } from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (view: string) => {
    setView(view as ViewState);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-shren-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo area */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleNavClick('HOME')}
          >
            <div className="relative">
              <Disc className="w-8 h-8 text-shren-white group-hover:text-shren-red transition-colors duration-300 animate-spin-slow" />
              <div className="absolute inset-0 bg-shren-red blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-widest leading-none">神壬唱片MSR</span>
              <span className="text-[10px] text-shren-textGray tracking-[0.2em] leading-none mt-1">MONSTER SHREN RECORDS</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-12">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative py-2 text-sm font-bold tracking-widest transition-colors duration-300 
                  ${currentView === link.id ? 'text-shren-red' : 'text-shren-white hover:text-shren-red'}
                `}
              >
                {link.label}
                {currentView === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-shren-red shadow-[0_0_8px_rgba(255,0,60,0.8)]" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-shren-white hover:text-shren-red transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-shren-black border-b border-white/10 shadow-2xl animate-fade-in-down">
          <nav className="flex flex-col px-4 py-6 space-y-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-lg font-bold tracking-widest 
                  ${currentView === link.id ? 'text-shren-red pl-4 border-l-4 border-shren-red' : 'text-shren-white pl-0'}
                  transition-all duration-300
                `}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;