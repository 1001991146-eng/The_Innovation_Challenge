
import React, { useState } from 'react';
import { Zap, Circle, CircleOff, Info } from 'lucide-react';

interface BooleanLogicStageProps {
  onComplete: () => void;
}

const BooleanLogicStage: React.FC<BooleanLogicStageProps> = ({ onComplete }) => {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);

  // Puzzle formula: (A AND B) AND (NOT C) = TRUE
  // In simple Hebrew: (א וגם ב) וגם (לא ג)
  const result = (a && b) && !c;

  const handleFinish = () => {
    if (result) {
      onComplete();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] w-full border-t-4 border-yellow-400 border-x border-b border-white shadow-2xl relative">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
            <Zap className="text-yellow-500 w-6 h-6 fill-yellow-500" />
            מפסקים ולוגיקה
          </h2>
          <p className="text-slate-600 text-sm">הפעילו את המפסקים הנכונים כדי להזרים חשמל למערכת. המטרה: שהתוצאה הסופית תהיה <strong>פועל (1)</strong>.</p>
        </div>
        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">שלב 4/6</span>
      </div>

      <div className="bg-slate-50 p-4 rounded-2xl mb-6 border border-slate-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-tight">
          <span className="font-bold text-slate-800">טיפ לוגי:</span> בתכנות, <strong>1</strong> פירושו "נכון/פועל" ו-<strong>0</strong> פירושו "לא נכון/כבוי". 
          פעולת <strong>"וגם"</strong> מחזירה 1 רק אם שני הצדדים הם 1.
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-3xl mb-8 relative overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-10 w-full">
          {/* Inputs */}
          <div className="flex justify-around w-full">
            {[
              { val: a, set: setA, label: 'מפסק א\'' },
              { val: b, set: setB, label: 'מפסק ב\'' },
              { val: c, set: setC, label: 'מפסק ג\'' }
            ].map((input, idx) => (
              <button 
                key={idx}
                onClick={() => input.set(!input.val)}
                className={`w-16 h-20 rounded-2xl flex flex-col items-center justify-center transition-all border-2 ${
                  input.val ? 'bg-yellow-500 border-yellow-300 shadow-[0_0_15px_rgba(234,179,8,0.4)] text-white' : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}
              >
                <span className="text-[10px] font-bold mb-2">{input.label}</span>
                {input.val ? <Circle className="w-5 h-5 fill-white" /> : <CircleOff className="w-5 h-5" />}
                <span className="text-sm mt-2 font-mono font-black">{input.val ? '1' : '0'}</span>
              </button>
            ))}
          </div>

          {/* Gates Representation in Hebrew */}
          <div className="text-center space-y-4 w-full">
            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 text-sm">
               <span className="text-slate-400 italic">תנאי ההפעלה:</span><br/>
               <span className="text-yellow-400 font-bold">(א' וגם ב') וגם (לא ג')</span>
            </div>
            
            <div className="flex items-center justify-center gap-4">
               <div className={`px-3 py-1.5 rounded-full border text-[10px] font-bold transition-all ${result ? 'bg-yellow-500 border-yellow-300 text-white shadow-[0_0_20px_rgba(234,179,8,0.6)]' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                 {result ? 'המערכת פועלת!' : 'ממתין לזרם...'}
               </div>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={handleFinish}
        disabled={!result}
        className={`w-full py-4 rounded-2xl font-bold transition-all shadow-lg ${
          result ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
        }`}
      >
        אישור והזרמת כוח
      </button>
    </div>
  );
};

export default BooleanLogicStage;
