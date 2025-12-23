
import React from 'react';
import { GameLevel, Difficulty, Player } from '../types';

interface TurnSelectorProps {
  player: Player;
  onSelect: (level: GameLevel, difficulty: Difficulty) => void;
}

const TurnSelector: React.FC<TurnSelectorProps> = ({ player, onSelect }) => {
  const [level, setLevel] = React.useState<GameLevel | null>(null);

  const categories = [
    { id: GameLevel.MEMORIA, icon: '🕰️', title: 'Memorias', subtitle: '80s & 90s', color: 'blue' },
    { id: GameLevel.GLOBAL, icon: '📱', title: 'Global', subtitle: 'Digital & Viral', color: 'pink' },
    { id: GameLevel.ACADEMICO, icon: '🎓', title: 'Académico', subtitle: 'Ciencia & Letras', color: 'yellow' },
  ];

  const difficulties = [
    { id: Difficulty.FACIL, points: 5, label: 'Fácil', color: 'green' },
    { id: Difficulty.MEDIO, points: 15, label: 'Medio', color: 'orange' },
    { id: Difficulty.DIFICIL, points: 30, label: 'DIFÍCIL', color: 'red' },
  ];

  return (
    <div className="max-w-2xl mx-auto p-8 glass-panel rounded-3xl border-2 border-indigo-500/30 animate-in fade-in zoom-in">
      <div className="text-center mb-10">
        <p className="text-slate-400 uppercase tracking-widest text-xs mb-1">Turno de elección</p>
        <h2 className="text-4xl font-bungee text-pink-500">{player.name}</h2>
      </div>

      {!level ? (
        <div className="space-y-6">
          <h3 className="text-center font-bold text-slate-300 uppercase tracking-wider text-sm">¿En qué terreno quieres luchar?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setLevel(cat.id)}
                className={`p-6 rounded-2xl border-2 transition-all transform hover:scale-105 group bg-slate-800/50 border-slate-700 hover:border-${cat.color}-500`}
              >
                <div className="text-4xl mb-3 group-hover:animate-bounce">{cat.icon}</div>
                <div className={`font-bungee text-lg text-${cat.color}-400`}>{cat.title}</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold">{cat.subtitle}</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <button onClick={() => setLevel(null)} className="text-slate-500 hover:text-white transition-colors text-sm">
              <i className="fas fa-arrow-left mr-2"></i> Cambiar categoría
            </button>
            <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-lg text-xs font-bold uppercase">
              {level} Seleccionado
            </span>
          </div>
          
          <h3 className="text-center font-bold text-slate-300 uppercase tracking-wider text-sm">Elige la intensidad del reto</h3>
          <div className="grid grid-cols-1 gap-3">
            {difficulties.map(diff => (
              <button
                key={diff.id}
                onClick={() => onSelect(level, diff.id)}
                className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all transform hover:translate-x-2 bg-slate-800/50 border-slate-700 hover:border-${diff.color}-500`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full bg-${diff.color}-500 animate-pulse`}></div>
                  <span className={`font-bungee text-xl text-${diff.color}-400`}>{diff.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bungee">{diff.points}</span>
                  <span className="text-[10px] text-slate-500 uppercase ml-1">pts</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TurnSelector;
