
import React, { useState, useEffect } from 'react';
import { Question, Player, GameLevel } from '../types';

interface QuestionDisplayProps {
  question: Question;
  currentPlayer: Player;
  onAnswer: (isCorrect: boolean, points: number) => void;
  allPlayers: Player[];
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ 
  question, 
  currentPlayer, 
  onAnswer
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setIsRevealed(false);
  }, [question]);

  const handleOptionClick = (idx: number) => {
    if (isRevealed) return;
    setSelectedOption(idx);
    setIsRevealed(true);
    // We no longer call onAnswer automatically here to let the user read the explanation.
  };

  const handleContinue = () => {
    const isCorrect = selectedOption === question.correctAnswer;
    onAnswer(isCorrect, isCorrect ? question.points : 0);
  };

  const getLevelColor = (level: GameLevel) => {
    switch (level) {
      case GameLevel.MEMORIA: return 'text-blue-400 border-blue-400';
      case GameLevel.GLOBAL: return 'text-pink-400 border-pink-400';
      case GameLevel.ACADEMICO: return 'text-yellow-400 border-yellow-400';
      default: return 'text-indigo-400 border-indigo-400';
    }
  };

  const getLevelName = (level: GameLevel) => {
    switch (level) {
      case GameLevel.MEMORIA: return 'Eco de la Memoria (Padres)';
      case GameLevel.GLOBAL: return 'Aldea Global (Hijos)';
      case GameLevel.ACADEMICO: return 'Crisol Académico (PAU)';
      default: return 'Ronda';
    }
  };

  return (
    <div className="glass-panel p-8 rounded-3xl border-2 border-pink-500/30 max-w-2xl mx-auto shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
      <div className="flex justify-between items-center mb-6">
        <span className={`px-4 py-1 rounded-full border ${getLevelColor(question.level)} text-sm font-bold uppercase`}>
          {getLevelName(question.level)}
        </span>
        <div className="flex flex-col items-end">
          <span className="text-xs text-slate-400 uppercase tracking-widest mb-1">Turno de</span>
          <span className="font-bungee text-xl text-pink-400">{currentPlayer.name}</span>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-8 leading-relaxed">{question.text}</h3>

      <div className="grid grid-cols-1 gap-4">
        {question.options.map((opt, idx) => {
          let stateClass = "bg-white/5 border-white/10 hover:border-pink-500/50";
          if (isRevealed) {
            if (idx === question.correctAnswer) stateClass = "bg-green-600 border-green-400 text-white animate-pulse";
            else if (idx === selectedOption) stateClass = "bg-red-600 border-red-400 text-white opacity-70";
            else stateClass = "opacity-30 border-white/5";
          }

          return (
            <button
              key={idx}
              disabled={isRevealed}
              onClick={() => handleOptionClick(idx)}
              className={`p-5 rounded-2xl text-left font-semibold text-lg transition-all transform hover:translate-x-2 border-2 ${stateClass}`}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/20 mr-4 text-sm">
                {String.fromCharCode(65 + idx)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {isRevealed && (
        <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
          {question.explanation && (
            <div className="p-4 bg-indigo-900/40 rounded-xl border border-indigo-400/30 text-indigo-100 text-sm">
              <strong className="block mb-1 uppercase text-xs tracking-widest text-indigo-300">¿Sabías que?</strong>
              {question.explanation}
            </div>
          )}
          
          <button
            onClick={handleContinue}
            className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bungee text-xl rounded-2xl shadow-xl shadow-green-900/20 transform transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            Continuar <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;
