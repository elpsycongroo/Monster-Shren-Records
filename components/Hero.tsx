import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://dominicpoiblog.oss-cn-shanghai.aliyuncs.com/20251217201133.svg" 
          alt="Background" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-shren-black via-shren-black/50 to-transparent" />
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-20">
        <div className="flex flex-col gap-6 md:w-2/3 lg:w-1/2">
          
          <div className="flex items-center gap-4 text-shren-red font-mono text-xs md:text-sm tracking-[0.3em] uppercase">
             <span className="w-12 h-[1px] bg-shren-red"></span>
             <span>System Online</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">MONSTER SHREN <br />神壬唱片</span>
          </h1>

          <p className="text-shren-textGray text-lg md:text-xl font-light tracking-wide max-w-xl border-l-2 border-shren-gray pl-6 py-2">
            与虚空共鸣<br />
            拥抱无序 重构现实
          </p>

          <div className="mt-8">
             <button 
                onClick={onExplore}
                className="group relative px-8 py-4 bg-transparent border border-white/30 hover:border-shren-red transition-all duration-300 overflow-hidden"
             >
                <div className="absolute inset-0 w-0 bg-shren-red transition-all duration-[250ms] ease-out group-hover:w-full opacity-10" />
                <div className="flex items-center gap-4">
                  <span className="font-bold tracking-widest text-white">最新发布</span>
                  <ArrowRight className="w-5 h-5 text-shren-red group-hover:translate-x-1 transition-transform" />
                </div>
             </button>
          </div>

        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 right-10 hidden md:block text-right">
        <div className="font-mono text-xs text-shren-textGray mb-2">COORD: 34.204.11.9</div>
        <div className="font-mono text-xs text-shren-textGray">STATUS: STABLE</div>
      </div>
    </section>
  );
};

export default Hero;