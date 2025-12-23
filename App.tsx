
import React, { useState, useCallback } from 'react';
import { Player, GameLevel, Difficulty, Question } from './types';
import PlayerSetup from './components/PlayerSetup';
import TurnSelector from './components/TurnSelector';
import QuestionDisplay from './components/QuestionDisplay';
import ScoreBoard from './components/ScoreBoard';
import GameOver from './components/GameOver';
import { generateSingleQuestion } from './services/geminiService';

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [targetScore, setTargetScore] = useState(100);
  const [gameState, setGameState] = useState<'setup' | 'selector' | 'playing' | 'loading' | 'finished'>('setup');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);

  const handleSetupComplete = (clan: Player[], target: number) => {
    setPlayers(clan);
    setTargetScore(target);
    setGameState('selector');
  };

  const handleSelection = async (level: GameLevel, difficulty: Difficulty) => {
    setGameState('loading');
    const question = await generateSingleQuestion(level, difficulty);
    setCurrentQuestion(question);
    setGameState('playing');
  };

  const handleAnswer = (isCorrect: boolean, points: number) => {
    let gameEnded = false;
    
    setPlayers(prev => {
      const updated = prev.map((p, idx) => {
        if (idx === activePlayerIndex) {
          const newScore = p.score + points;
          if (newScore >= targetScore) gameEnded = true;
          return { ...p, score: newScore };
        }
        return p;
      });
      return updated;
    });

    // The delay here is only for a brief visual confirmation of the score update before returning to selection
    setTimeout(() => {
      if (gameEnded) {
        setGameState('finished');
      } else {
        setActivePlayerIndex(prev => (prev + 1) % players.length);
        setGameState('selector');
      }
    }, 500);
  };

  const restartGame = () => {
    setPlayers([]);
    setGameState('setup');
    setActivePlayerIndex(0);
    setCurrentQuestion(null);
  };

  return (
    <div className="min-h-screen pb-40 pt-8 px-4 flex flex-col items-center">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bungee gradient-text tracking-tighter mb-2">SINERGIA</h1>
        <p className="text-slate-400 uppercase tracking-widest text-[10px] font-bold">Duelo Familiar de Inteligencias</p>
      </header>

      <main className="w-full max-w-4xl">
        {gameState === 'setup' && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
            <PlayerSetup onComplete={handleSetupComplete} />
          </div>
        )}

        {gameState === 'selector' && players.length > 0 && (
          <TurnSelector 
            player={players[activePlayerIndex]} 
            onSelect={handleSelection} 
          />
        )}

        {gameState === 'loading' && (
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center font-bungee text-indigo-500">?</div>
            </div>
            <p className="font-bungee text-2xl animate-pulse text-indigo-400 text-center px-4">
              Tejiendo el próximo desafío...
            </p>
          </div>
        )}

        {gameState === 'playing' && currentQuestion && (
          <QuestionDisplay 
            question={currentQuestion} 
            currentPlayer={players[activePlayerIndex]}
            allPlayers={players}
            onAnswer={handleAnswer}
          />
        )}

        {gameState === 'finished' && (
          <GameOver players={players} onRestart={restartGame} />
        )}
      </main>

      {players.length > 0 && gameState !== 'setup' && gameState !== 'finished' && (
        <ScoreBoard 
          players={players} 
          activePlayerId={players[activePlayerIndex].id} 
          targetScore={targetScore}
        />
      )}
    </div>
  );
};

export default App;
