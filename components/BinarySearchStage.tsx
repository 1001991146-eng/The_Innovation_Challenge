
import React, { useState } from 'react';
import { Search, Hash, Target, Lightbulb, CheckCircle2 } from 'lucide-react';

interface BinarySearchStageProps {
  onComplete: () => void;
}

const BinarySearchStage: React.FC<BinarySearchStageProps> = ({ onComplete }) => {
  const [data] = useState(() => Array.from({ length: 15 }, (_, i) => (i + 1) * 7).sort((a, b) => a - b));
  const [target] = useState(42);
  const [clicks, setClicks] = useState(0);
  const [found, setFound] = useState(false);
  const [lastGuess, setLastGuess] = useState<number | null>(null);

  const handleClick = (val: number) => {
    if (found) return;
    setClicks(prev => prev + 1);
    setLastGuess(val);
    if (val === target) {
      setFound(true);
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] w-full border-t-4 border-emerald-500 border-x border-b border-white shadow-2xl relative">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
            <Search className="text-emerald-500 w-6 h-6" />
            אלגוריתם החיפוש
          </h2>
          <p className="text-slate-600 text-sm">מצאו את המספר <strong>42</strong> ברשימה הממוינת. נסו למצוא אותו בכמה שפחות לחיצות!</p>
        </div>
        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">שלב 5/6</span>
      </div>

      <div className="flex justify-between items-center mb-6 px-2">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
          <Target className="w-4 h-4 text-emerald-500" />
          מספר היעד: <span className="text-emerald-600 font-mono text-lg">42</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
          <Hash className="w-4 h-4 text-indigo-500" />
          נסיונות: <span className={`font-mono text-lg ${clicks > 4 ? 'text-amber-500' : 'text-indigo-600'}`}>{clicks}</span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-8">
        {data.map((val, idx) => {
          const isClicked = lastGuess === val;
          const isTarget = val === target && found;
          
          return (
            <button
              key={idx}
              onClick={() => handleClick(val)}
              className={`h-12 rounded-xl border-2 font-mono font-bold transition-all transform active:scale-95 ${
                isTarget 
                  ? 'bg-emerald-500 border-emerald-300 text-white shadow-lg scale-110 z-10' 
                  : isClicked && !found
                  ? 'bg-red-50 border-red-200 text-red-500'
                  : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200 hover:bg-emerald-50/30'
              }`}
            >
              {isClicked || found ? val : '?'}
            </button>
          );
        })}
      </div>

      <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 flex items-start gap-3">
        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600 shrink-0">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-emerald-900 mb-1">הסבר אלגוריתמי:</h4>
          <p className="text-[11px] text-emerald-700 leading-tight">
            המספרים מסודרים מהקטן לגדול (מימין לשמאל). אם תלחצו על מספר ותגלו שהוא <strong>קטן</strong> מ-42, אתם כבר יודעים שכל המספרים שמימינו קטנים עוד יותר ונפסלים! ככה חוסכים המון זמן.
          </p>
        </div>
      </div>

      {found && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-20 flex items-center justify-center p-8 rounded-[2.5rem] animate-[fadeIn_0.3s_ease-out]">
           <div className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-100 text-center transform transition-all">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-slate-900 mb-1">מצוין!</h3>
              <p className="text-sm text-slate-500">פיצחתם את החיפוש ב-{clicks} צעדים.</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default BinarySearchStage;
