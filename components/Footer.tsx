import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-shren-dark py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          <div>
            <h4 className="text-2xl font-bold tracking-widest text-white mb-2">MONSTER SHREN RECORDS</h4>
            <p className="text-shren-textGray text-sm max-w-xs">
              © 2025 MSR. All Rights Reserved.
            </p>
          </div>

          {/* <div className="flex gap-8">
             <a href="#" className="text-shren-textGray hover:text-shren-red text-sm transition-colors uppercase tracking-wider">Terms</a>
             <a href="#" className="text-shren-textGray hover:text-shren-red text-sm transition-colors uppercase tracking-wider">Privacy</a>
             <a href="#" className="text-shren-textGray hover:text-shren-red text-sm transition-colors uppercase tracking-wider">Contact</a>
           </div>*/}

        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs text-shren-textGray font-mono">
           <span>DESIGNED FOR ENTITIES. JUST FOR FUN.</span>
           <span>SYSTEM V.4.0.1 // STABLE</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;