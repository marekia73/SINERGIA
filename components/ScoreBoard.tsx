
import React from 'react';
import { Player } from '../types';

interface ScoreBoardProps {
  players: Player[];
  activePlayerId: string;
  targetScore: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ players, activePlayerId, targetScore }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-slate-900/80 backdrop-blur-lg border-t border-white/10 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {players.map((p) => {
          const progress = Math.min((p.score / targetScore) * 100, 100);
          const isActive = activePlayerId === p.id;
          
          return (
            <div 
              key={p.id}
              className={`flex flex-col gap-2 p-3 rounded-2xl transition-all duration-300 min-w-[160px] border-2 ${
                isActive 
                ? 'bg-pink-600/20 border-pink-500 scale-105 shadow-lg shadow-pink-500/20' 
                : 'bg-white/5 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bungee text-sm shadow-inner ${
                  p.role === 'parent' ? 'bg-blue-600' : 'bg-pink-600'
                }`}>
                  {p.name.charAt(0)}
                </div>
                <div className="flex-grow">
                  <div className="text-[10px] uppercase font-bold opacity-50 truncate max-w-[80px]">{p.name}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bungee">{p.score}</span>
                    <span className="text-[8px] uppercase opacity-40">/ {targetScore}</span>
                  </div>
                </div>
              </div>
              <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${p.role === 'parent' ? 'bg-blue-400' : 'bg-pink-400'}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreBoard;
