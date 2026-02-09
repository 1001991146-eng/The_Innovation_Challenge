
import React, { useState, useEffect } from 'react';
import { AlertOctagon, CheckCircle2, ShieldAlert } from 'lucide-react';

interface CyberStageProps {
  onComplete: () => void;
}

const CyberStage: React.FC<CyberStageProps> = ({ onComplete }) => {
  const [foundFlags, setFoundFlags] = useState<string[]>([]);
  
  const toggleFlag = (id: string) => {
    if (!foundFlags.includes(id)) {
      setFoundFlags([...foundFlags, id]);
    }
  };

  useEffect(() => {
    if (foundFlags.length === 3) {
      setTimeout(onComplete, 1500);
    }
  }, [foundFlags, onComplete]);

  return (
    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] w-full border-t-4 border-red-500 border-x border-b border-white shadow-2xl relative">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
            <AlertOctagon className="text-red-500 w-6 h-6" />
            זיהוי פישינג
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">התקבל מייל חשוד. לחצו על <strong className="text-red-500">3 דגלים אדומים</strong> (Red Flags) בתוך המייל כדי לדווח עליו.</p>
        </div>
        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">שלב 4/4</span>
      </div>

      <div className="bg-white rounded-3xl shadow-inner border border-slate-100 overflow-hidden text-right text-sm mb-8">
        <div className="bg-slate-50 p-5 border-b border-slate-100">
          <div className="flex gap-2 text-xs text-slate-400 mb-2">
            מאת: 
            <span 
              onClick={() => toggleFlag('sender')}
              className={`font-mono cursor-pointer transition-colors px-1 rounded ${
                foundFlags.includes('sender') ? 'bg-red-100 text-red-600 ring-1 ring-red-200' : 'hover:bg-red-50 hover:text-red-400'
              }`}
            >
              security@g00gle-support.com
            </span>
          </div>
          <div className="font-bold text-indigo-950 text-base">התראה: חשבונך בסכנה מיידית!</div>
        </div>

        <div className="p-6 leading-relaxed text-slate-700">
          <p className="mb-4">שלום משתמש יקר,</p>
          <p className="mb-4">
            זיהינו פעילות חריגה בחשבון שלך. אם לא תבצע פעולה 
            <span 
              onClick={() => toggleFlag('urgency')}
              className={`font-bold mx-1 cursor-pointer transition-colors px-1 rounded ${
                foundFlags.includes('urgency') ? 'bg-red-100 text-red-600 ring-1 ring-red-200' : 'text-red-500 hover:bg-red-50'
              }`}
            >
              באופן מיידי תוך 2 דקות
            </span>
            , החשבון ייחסם לצמיתות מכל שירותינו.
          </p>
          <p className="mb-6">
            עליך לאמת את הסיסמה שלך כאן כדי למנוע את החסימה:
          </p>
          <div className="text-center">
            <button 
              onClick={() => toggleFlag('link')}
              className={`px-6 py-3 rounded-2xl font-mono text-sm transition-all shadow-sm ${
                foundFlags.includes('link') 
                  ? 'bg-red-100 text-red-600 ring-2 ring-red-200' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              http://bit.ly/secure-login-now
            </button>
          </div>
          <p className="mt-8 text-xs text-slate-400">בברכה, צוות האבתחה (Security Team)</p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="text-sm font-bold text-slate-500">דגלים שנמצאו:</div>
          <div className="flex gap-1">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  foundFlags.length >= i ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-slate-200'
                }`} 
              />
            ))}
          </div>
        </div>
        {foundFlags.length === 3 ? (
          <div className="flex items-center gap-2 text-emerald-600 font-bold animate-pulse">
            <CheckCircle2 className="w-5 h-5" />
            כל הכבוד!
          </div>
        ) : (
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            מייל מסוכן זוהה
          </div>
        )}
      </div>
    </div>
  );
};

export default CyberStage;
