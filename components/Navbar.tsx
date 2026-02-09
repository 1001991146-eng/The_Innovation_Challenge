
import React from 'react';
import { Cpu } from 'lucide-react';

interface NavbarProps {
  time: string;
  isUrgent: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ time, isUrgent }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 p-3 z-50 flex justify-between items-center bg-white/70 backdrop-blur-xl m-3 rounded-2xl border border-white/50 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <Cpu className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-slate-800 hidden sm:block">אתגר החדשנות</span>
      </div>
      <div className={`font-mono text-xl font-bold px-4 py-1.5 rounded-xl border transition-colors ${
        isUrgent 
          ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' 
          : 'bg-white/50 text-slate-800 border-slate-200'
      }`}>
        {time}
      </div>
    </nav>
  );
};

export default Navbar;
