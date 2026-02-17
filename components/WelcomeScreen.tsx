
import React from 'react';
import { Rocket, ShieldCheck, BrainCircuit, Code2, ArrowLeft } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] w-full border border-white/50 shadow-2xl flex flex-col items-center text-center">
      <div className="bg-indigo-50 p-5 rounded-full mb-6">
        <Rocket className="w-12 h-12 text-indigo-600" />
      </div>
      
      <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-l from-indigo-900 to-purple-600 leading-tight">
        ברוכים הבאים לעתיד
      </h1>
      
      <p className="text-lg text-slate-600 mb-8 leading-relaxed">
        העולם זקוק לחדשנות טכנולוגית. יש לכם 15 דקות לפרוץ את המחסומים, לפתור את האתגרים ולהוכיח שיש לכם את מה שנדרש כדי להוביל.
      </p>
      
      <div className="w-full space-y-3 mb-10 text-right">
        {[
          { icon: <ShieldCheck className="w-5 h-5 text-cyan-500" />, text: "סייבר ואבטחת מידע" },
          { icon: <BrainCircuit className="w-5 h-5 text-purple-500" />, text: "בינה מלאכותית ואתיקה" },
          { icon: <Code2 className="w-5 h-5 text-indigo-600" />, text: "חשיבה אלגוריתמית וסיבוכיות" }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 bg-white/40 p-3 rounded-2xl border border-slate-100">
            {item.icon}
            <span className="font-medium text-slate-700">{item.text}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={onStart}
        className="group w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200/50 flex justify-center items-center gap-3 transform hover:-translate-y-0.5 active:scale-95"
      >
        <span>התחלת משימה</span>
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default WelcomeScreen;
