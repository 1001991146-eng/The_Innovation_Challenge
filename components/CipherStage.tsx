
import React, { useState } from 'react';
import { Lock, RotateCw } from 'lucide-react';

interface CipherStageProps {
  onComplete: () => void;
}

const CipherStage: React.FC<CipherStageProps> = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const checkSolution = () => {
    if (input.toUpperCase().trim() === 'PYTHON') {
      onComplete();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className={`bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] w-full border-t-4 border-cyan-400 border-x border-b border-white shadow-2xl transition-transform ${shaking ? 'animate-bounce' : ''}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
            <Lock className="text-cyan-500 w-6 h-6" />
            פתיחת ההצפנה
          </h2>
          <p className="text-slate-500 text-sm">המערכת נעולה. השתמשו במפענח הדיגיטלי כדי לחשוף את סיסמת הכניסה.</p>
        </div>
        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">שלב 1/6</span>
      </div>

      <div className="bg-slate-900 p-8 rounded-3xl text-center mb-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 opacity-90"></div>
        <div className="relative z-10">
          <p className="text-[10px] text-indigo-300 mb-2 uppercase tracking-[0.2em]">קוד מוצפן</p>
          <h3 className="text-5xl font-mono tracking-widest font-black text-white">UDYMTS</h3>
        </div>
      </div>

      <div className="bg-cyan-50/50 p-5 rounded-2xl mb-8 border border-cyan-100">
        <p className="text-center font-bold text-slate-800 mb-4 text-sm flex items-center justify-center gap-2">
          <RotateCw className="w-4 h-4 text-cyan-600" />
          מפתח הצפנה: הסטה של -5
        </p>
        <div className="flex justify-around items-center text-center font-mono">
          <div className="bg-white p-2 rounded-lg border border-slate-200">
            <div className="text-lg font-bold text-slate-400">U</div>
            <div className="text-xs text-slate-300">↓</div>
            <div className="text-lg font-bold text-cyan-600">P</div>
          </div>
          <div className="text-slate-300">...</div>
          <div className="bg-white p-2 rounded-lg border border-slate-200">
            <div className="text-lg font-bold text-slate-400">S</div>
            <div className="text-xs text-slate-300">↓</div>
            <div className="text-lg font-bold text-cyan-600">N</div>
          </div>
        </div>
        <p className="mt-4 text-[11px] text-center text-slate-400 italic">
          (טיפ: לכו 5 אותיות אחורה ב-ABC לכל אות)
        </p>
      </div>

      <input 
        type="text" 
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setError(false);
        }}
        onKeyDown={(e) => e.key === 'Enter' && checkSolution()}
        placeholder="הקלידו את הקוד כאן (אנגלית)" 
        className="w-full p-4 mb-4 rounded-2xl border-2 border-slate-200 bg-white focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 text-center text-slate-800 font-bold text-2xl tracking-[0.3em] uppercase transition-all"
      />
      
      <button 
        onClick={checkSolution}
        className="w-full py-4 bg-cyan-500 text-white rounded-2xl font-bold hover:bg-cyan-600 transition-all shadow-lg active:scale-95"
      >
        פתיחת נעילה
      </button>

      {error && (
        <div className="text-red-500 text-sm mt-3 text-center font-bold animate-pulse">
          הקוד שגוי, נסו שוב.
        </div>
      )}
    </div>
  );
};

export default CipherStage;
