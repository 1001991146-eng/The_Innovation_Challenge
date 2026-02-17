
import React, { useState } from 'react';
import { GitBranch, Shield, FileText, Filter, WifiOff, RefreshCw } from 'lucide-react';
import { LogicCommand } from '../types';

const COMMANDS: LogicCommand[] = [
  { id: 'filter', label: 'Filter Traffic', hebrew: 'סינון תעבורה', icon: 'filter' },
  { id: 'check', label: 'Check Permissions', hebrew: 'בדיקת הרשאות', icon: 'shield' },
  { id: 'log', label: 'Log Access', hebrew: 'תיעוד כניסה ביומן', icon: 'file-text' },
  { id: 'wrong', label: 'Disconnect Server', hebrew: 'ניתוק שרת', icon: 'wifi-off' }
];

const CORRECT_ORDER = ['filter', 'check', 'log'];

interface LogicStageProps {
  onComplete: () => void;
}

const LogicStage: React.FC<LogicStageProps> = ({ onComplete }) => {
  const [stack, setStack] = useState<LogicCommand[]>([]);
  const [error, setError] = useState(false);

  const addToStack = (cmd: LogicCommand) => {
    if (stack.length >= 3 || stack.find(s => s.id === cmd.id)) return;
    
    const newStack = [...stack, cmd];
    setStack(newStack);

    if (newStack.length === 3) {
      if (newStack.every((cmd, i) => cmd.id === CORRECT_ORDER[i])) {
        onComplete();
      } else {
        setError(true);
        setTimeout(() => {
          setStack([]);
          setError(false);
        }, 1500);
      }
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'filter': return <Filter className="w-4 h-4" />;
      case 'shield': return <Shield className="w-4 h-4" />;
      case 'file-text': return <FileText className="w-4 h-4" />;
      case 'wifi-off': return <WifiOff className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] w-full border-t-4 border-indigo-900 border-x border-b border-white shadow-2xl relative">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-2">
            <GitBranch className="text-indigo-900 w-6 h-6" />
            אלגוריתם אבטחה
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">בנו תוכנית אבטחה לשרת. לחצו על הפקודות <strong>בסדר הנכון</strong> כדי ליצור רצף פעולות הגיוני.</p>
        </div>
        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">שלב 3/6</span>
      </div>

      <div className={`bg-slate-50 p-6 rounded-3xl mb-8 flex flex-col gap-3 min-h-[180px] border-2 border-dashed transition-colors ${error ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}>
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-mono text-slate-400">SecurityFlow.js</span>
          {stack.length > 0 && (
            <button onClick={() => setStack([])} className="text-slate-400 hover:text-indigo-600 transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        
        {[0, 1, 2].map(i => (
          <div key={i} className={`h-12 bg-white rounded-xl border flex items-center px-4 text-sm font-mono transition-all duration-300 ${
            stack[i] ? 'border-indigo-200 shadow-sm text-slate-800' : 'border-slate-100 text-slate-300'
          }`}>
            <span className="ml-3 opacity-30">{i + 1}.</span>
            {stack[i] ? (
              <div className="flex items-center gap-2">
                {getIcon(stack[i].icon)}
                <span>{stack[i].label}();</span>
              </div>
            ) : '---'}
          </div>
        ))}
        {error && <div className="text-center text-xs font-bold text-red-500 mt-2">סדר שגוי! נסו לחשוב מה בא קודם.</div>}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {COMMANDS.map(cmd => {
          const isUsed = stack.find(s => s.id === cmd.id);
          return (
            <button 
              key={cmd.id}
              disabled={!!isUsed || error}
              onClick={() => addToStack(cmd)}
              className={`w-full py-4 px-5 bg-white border border-slate-100 rounded-2xl font-medium text-slate-700 shadow-sm hover:border-indigo-200 hover:bg-indigo-50/50 flex items-center justify-between transition-all active:scale-[0.98] ${
                isUsed ? 'opacity-30 cursor-not-allowed bg-slate-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                  {getIcon(cmd.icon)}
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-mono">{cmd.label}</div>
                  <div className="text-sm font-bold text-slate-800">{cmd.hebrew}</div>
                </div>
              </div>
              <div className="w-6 h-6 border-2 border-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-300">
                +
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LogicStage;
