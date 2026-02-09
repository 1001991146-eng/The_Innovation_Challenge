
import React, { useState } from 'react';
import { Bot, Settings, AlertTriangle, Database, User, UserCheck, Smile, Glasses } from 'lucide-react';

interface AIEthicsStageProps {
  onComplete: () => void;
}

const AIEthicsStage: React.FC<AIEthicsStageProps> = ({ onComplete }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fixAvailable, setFixAvailable] = useState(false);

  const handleGuess = () => {
    setShowFeedback(true);
    setFixAvailable(true);
  };

  const handleFix = () => {
    setShowModal(false);
    onComplete();
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] w-full border-t-4 border-purple-500 border-x border-b border-white shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
            <Bot className="text-purple-500 w-6 h-6" />
            בדיקת מודל AI
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowModal(true)}
            className={`p-2.5 rounded-xl transition-all relative ${
              fixAvailable ? 'bg-purple-100 text-purple-700 animate-bounce' : 'text-slate-300 hover:text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-6 h-6" />
            {fixAvailable && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>}
          </button>
          <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">שלב 2/4</span>
        </div>
      </div>

      <p className="text-slate-600 mb-8 text-sm leading-relaxed">
        המערכת לזיהוי איומים נכשלה. עליכם לזהות: <strong className="text-indigo-900">מי מהדמויות מהווה איום?</strong>
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { id: 'A', icon: <User className="w-8 h-8" />, label: "מועמד א'", color: "bg-blue-100 text-blue-700" },
          { id: 'B', icon: <UserCheck className="w-8 h-8" />, label: "מועמד ב'", color: "bg-purple-100 text-purple-700" },
          { id: 'C', icon: <Smile className="w-8 h-8" />, label: "מועמד ג'", color: "bg-emerald-100 text-emerald-700" },
          { id: 'D', icon: <Glasses className="w-8 h-8" />, label: "מועמד ד'", color: "bg-amber-100 text-amber-700" }
        ].map((avatar) => (
          <button 
            key={avatar.id}
            onClick={handleGuess}
            className="group bg-white p-6 rounded-3xl border border-slate-100 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/5 transition-all flex flex-col items-center gap-3 active:scale-95"
          >
            <div className={`w-16 h-16 ${avatar.color} rounded-full flex items-center justify-center transition-transform group-hover:scale-110`}>
              {avatar.icon}
            </div>
            <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900">{avatar.label}</span>
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="bg-red-50 text-red-600 p-5 rounded-3xl text-right text-sm border border-red-100 animate-[bounce_0.5s_ease-in-out]">
          <div className="font-bold flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5" />
            הטיה זוהתה! (Bias Detected)
          </div>
          <p>
            בחירה באדם רק על פי מראה עלולה לנבוע מהטיה של המודל. 
            <br /> הבעיה היא לא באנשים, אלא בנתוני האימון של המערכת. 
            <strong className="block mt-2 text-indigo-900">יש לתקן את המודל בהגדרות.</strong>
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-[2.5rem] w-full max-w-sm text-center shadow-2xl animate-[slideIn_0.3s_ease-out]">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">תיקון נתוני אימון</h3>
            <p className="text-sm text-slate-500 mb-8 leading-relaxed">
              המודל אומן על נתונים מוטים שאינם מייצגים את המציאות. האם ברצונכם לאזן את בסיס הנתונים ולבטל את ההטיות?
            </p>
            <div className="space-y-3">
              <button 
                onClick={handleFix}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg"
              >
                תקן מודל והמשך
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full py-2 text-slate-400 text-sm font-medium"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIEthicsStage;
