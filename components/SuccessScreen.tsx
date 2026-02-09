
import React, { useEffect } from 'react';
import { Trophy, CheckCircle, ArrowLeft, Star, Github, Globe } from 'lucide-react';

const SuccessScreen: React.FC = () => {
  useEffect(() => {
    // Trigger confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // @ts-ignore
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      // @ts-ignore
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/90 backdrop-blur-2xl p-10 rounded-[3rem] w-full border-2 border-indigo-200 shadow-[0_32px_64px_-16px_rgba(31,38,135,0.15)] flex flex-col items-center text-center animate-[scaleIn_0.5s_ease-out]">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-amber-300 rounded-full blur-2xl opacity-40 animate-pulse"></div>
        <div className="bg-amber-50 p-6 rounded-full relative z-10">
          <Trophy className="w-20 h-20 text-amber-500" />
        </div>
        <Star className="absolute -top-2 -right-2 w-8 h-8 text-amber-400 animate-spin-slow" />
      </div>
      
      <h1 className="text-5xl font-black mb-2 text-indigo-950">כל הכבוד!</h1>
      <h2 className="text-xl font-bold text-indigo-500 mb-8">העתיד בידיים שלכם</h2>
      
      <p className="text-slate-600 mb-10 leading-relaxed max-w-sm">
        הצלחתם לפצח את הקוד, לזהות הטיות, לתכנן אלגוריתמים ולהגן מפני תקיפות סייבר. <br />
        <strong className="text-indigo-900 text-lg mt-2 block">זה בדיוק מה שעושים במגמת מדעי המחשב והנדסת תוכנה.</strong>
      </p>

      <div className="w-full bg-slate-50/80 p-6 rounded-3xl mb-10 text-right border border-slate-100">
        <h3 className="font-bold text-indigo-950 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-500" />
          סיכום ביצועים:
        </h3>
        <div className="space-y-4">
          {[
            { label: "פתרון בעיות מורכבות", value: "מצוין", width: "w-full" },
            { label: "חשיבה יצירתית", value: "גבוהה", width: "w-[90%]" },
            { label: "פוטנציאל לחדשנות", value: "בלתי מוגבל", width: "w-[95%]" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-indigo-600">{stat.value}</span>
                <span className="text-slate-500">{stat.label}</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className={`${stat.width} h-full bg-indigo-500 rounded-full`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <a 
        href="#" 
        className="group block w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white rounded-3xl font-black text-xl shadow-xl shadow-indigo-200 transform transition hover:scale-[1.02] hover:-translate-y-1 active:scale-95 mb-4"
      >
        !Count Me In - רשמו אותי למגמה
      </a>
      
      <button 
        onClick={() => window.location.reload()}
        className="text-sm font-bold text-slate-400 hover:text-indigo-600 underline transition-colors"
      >
        שחק שוב
      </button>

      <div className="mt-10 pt-8 border-t border-slate-100 w-full flex justify-center gap-6 text-slate-300">
        <Github className="w-5 h-5 cursor-pointer hover:text-slate-400" />
        <Globe className="w-5 h-5 cursor-pointer hover:text-slate-400" />
      </div>
    </div>
  );
};

export default SuccessScreen;
