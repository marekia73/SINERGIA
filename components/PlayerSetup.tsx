
import React, { useState } from 'react';
import { Player } from '../types';

interface PlayerSetupProps {
  onComplete: (players: Player[], targetScore: number) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onComplete }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState<'parent' | 'child' | 'other'>('child');
  const [targetScore, setTargetScore] = useState(100);

  const addPlayer = () => {
    if (!name.trim()) return;
    const newPlayer: Player = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      role,
      score: 0,
      auraPoints: 0
    };
    setPlayers([...players, newPlayer]);
    setName('');
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-6 glass-panel rounded-3xl shadow-2xl border-2 border-pink-500/30">
      <h2 className="text-3xl font-bungee text-center mb-8 gradient-text">Configura tu Partida</h2>
      
      <div className="mb-8">
        <label className="block text-slate-400 uppercase text-xs font-bold mb-3 tracking-widest text-center">Meta de Puntos</label>
        <div className="flex justify-center gap-3">
          {[50, 100, 150, 200].map(val => (
            <button
              key={val}
              onClick={() => setTargetScore(val)}
              className={`w-14 h-14 rounded-xl font-bungee text-lg transition-all border-2 ${
                targetScore === val 
                  ? 'bg-yellow-500 border-yellow-300 text-black scale-110 shadow-lg shadow-yellow-500/30' 
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <input 
          type="text" 
          placeholder="Nombre del jugador..." 
          className="bg-slate-800 border-2 border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 transition-colors"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
        />
        
        <div className="flex gap-2">
          {(['parent', 'child', 'other'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded-lg font-bold capitalize transition-all ${
                role === r ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {r === 'parent' ? 'Padre/Madre' : r === 'child' ? 'Hijo/a' : 'Otro'}
            </button>
          ))}
        </div>

        <button 
          onClick={addPlayer}
          className="bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bungee transition-all transform active:scale-95"
        >
          Añadir Jugador <i className="fas fa-plus ml-2"></i>
        </button>
      </div>

      <div className="space-y-2 mb-8 max-h-48 overflow-y-auto pr-2">
        {players.map((p) => (
          <div key={p.id} className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/10 group">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${p.role === 'parent' ? 'bg-blue-400' : 'bg-pink-400'}`} />
              <span className="font-bold">{p.name}</span>
            </div>
            <button onClick={() => removePlayer(p.id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="fas fa-trash text-xs"></i>
            </button>
          </div>
        ))}
      </div>

      <button
        disabled={players.length < 2}
        onClick={() => onComplete(players, targetScore)}
        className={`w-full py-4 rounded-2xl font-bungee text-xl transition-all shadow-xl ${
          players.length >= 2 
            ? 'bg-green-500 hover:bg-green-400 text-white shadow-green-500/20' 
            : 'bg-slate-700 text-slate-500 cursor-not-allowed'
        }`}
      >
        ¡Empezar Duelo!
      </button>
    </div>
  );
};

export default PlayerSetup;
