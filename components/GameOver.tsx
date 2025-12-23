
import React from 'react';
import { Player } from '../types';

interface GameOverProps {
  players: Player[];
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ players, onRestart }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  const rewards = [
    { icon: '🏆', title: 'Trofeo Viajero', desc: 'Exhibe el trofeo en tu cuarto hasta la próxima partida.' },
    { icon: '🎬', title: 'Poder del Ganador', desc: 'Eliges la peli de este fin de semana.' },
    { icon: '🗑️', title: 'Privilegio de Tarea', desc: 'Asigna una de tus tareas domésticas a otro jugador.' },
    { icon: '🗺️', title: 'Planificador de Aventuras', desc: 'Tú eliges el destino de la próxima excursión.' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 animate-in zoom-in fade-in duration-1000">
      <div className="text-center mb-12">
        <div className="inline-block relative mb-6">
          <div className="text-8xl animate-bounce">👑</div>
          <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-20 -z-10 animate-pulse"></div>
        </div>
        <h1 className="text-5xl font-bungee mb-2 gradient-text">¡Tenemos Campeón!</h1>
        <p className="text-2xl font-bold text-white uppercase tracking-widest">{winner.name}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="glass-panel p-8 rounded-3xl border-2 border-yellow-500/50 shadow-2xl shadow-yellow-500/10">
          <h2 className="text-2xl font-bungee mb-6 flex items-center gap-3">
            <i className="fas fa-podium text-yellow-500"></i> Clasificación
          </h2>
          <div className="space-y-4">
            {sortedPlayers.map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-4">
                  <span className={`text-2xl font-bungee ${idx === 0 ? 'text-yellow-400' : 'text-slate-500'}`}>#{idx + 1}</span>
                  <div>
                    <div className="font-bold text-lg">{p.name}</div>
                    <div className="text-xs text-slate-400 uppercase">{p.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bungee">{p.score}</div>
                  <div className="text-[10px] uppercase text-slate-500">puntos totales</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl border-2 border-green-500/50 shadow-2xl shadow-green-500/10">
          <h2 className="text-2xl font-bungee mb-6 flex items-center gap-3">
            <i className="fas fa-gift text-green-500"></i> Recompensa
          </h2>
          <p className="text-slate-400 mb-6 text-sm">Como ganador, {winner.name} puede reclamar uno de estos premios familiares:</p>
          <div className="grid grid-cols-1 gap-3">
            {rewards.map((r, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5 hover:border-green-400/50 transition-colors cursor-pointer group">
                <span className="text-3xl group-hover:scale-110 transition-transform">{r.icon}</span>
                <div>
                  <div className="font-bold text-green-400">{r.title}</div>
                  <div className="text-xs text-slate-500">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={onRestart}
          className="px-12 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bungee text-xl transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
        >
          ¡Otra Partida!
        </button>
        <p className="text-slate-500 italic text-sm">"El verdadero premio es el tiempo compartido."</p>
      </div>
    </div>
  );
};

export default GameOver;
