
import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import CipherStage from './components/CipherStage';
import AIEthicsStage from './components/AIEthicsStage';
import LogicStage from './components/LogicStage';
import BooleanLogicStage from './components/BooleanLogicStage';
import BinarySearchStage from './components/BinarySearchStage';
import CyberStage from './components/CyberStage';
import SuccessScreen from './components/SuccessScreen';
import Navbar from './components/Navbar';
import { GameStage } from './types';

const App: React.FC = () => {
  const [stage, setStage] = useState<GameStage>(GameStage.WELCOME);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isTimerActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      alert('הזמן נגמר! נסה שוב.');
      window.location.reload();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const startMission = () => {
    setIsTimerActive(true);
    setStage(GameStage.CIPHER);
  };

  const nextStage = () => {
    const stages = Object.values(GameStage);
    const currentIndex = stages.indexOf(stage);
    if (currentIndex < stages.length - 1) {
      setStage(stages[currentIndex + 1]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderStage = () => {
    switch (stage) {
      case GameStage.WELCOME:
        return <WelcomeScreen onStart={startMission} />;
      case GameStage.CIPHER:
        return <CipherStage onComplete={nextStage} />;
      case GameStage.AI_ETHICS:
        return <AIEthicsStage onComplete={nextStage} />;
      case GameStage.LOGIC:
        return <LogicStage onComplete={nextStage} />;
      case GameStage.BOOLEAN_LOGIC:
        return <BooleanLogicStage onComplete={nextStage} />;
      case GameStage.BINARY_SEARCH:
        return <BinarySearchStage onComplete={nextStage} />;
      case GameStage.CYBER:
        return <CyberStage onComplete={nextStage} />;
      case GameStage.SUCCESS:
        return <SuccessScreen />;
      default:
        return <WelcomeScreen onStart={startMission} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex flex-col items-center justify-center p-4 relative overflow-x-hidden selection:bg-cyan-400 selection:text-white">
      <Navbar time={formatTime(timeLeft)} isUrgent={timeLeft < 300} />
      
      {/* Decorative Blobs */}
      <div className="fixed top-20 -left-20 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="fixed bottom-10 -right-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

      <main className="w-full max-w-lg z-10 pt-20">
        <div className="transition-all duration-500 ease-in-out">
          {renderStage()}
        </div>
      </main>

      <footer className="fixed bottom-0 w-full text-center p-3 text-xs text-slate-400 bg-white/40 backdrop-blur-sm">
        © תיכון למדעים וטכנולוגיה | נוצר עבור מגמת מדעי המחשב והנדסת תוכנה
      </footer>
    </div>
  );
};

export default App;
