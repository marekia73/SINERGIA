
export enum GameLevel {
  MEMORIA = 'MEMORIA',
  GLOBAL = 'GLOBAL',
  ACADEMICO = 'ACADEMICO'
}

export enum Difficulty {
  FACIL = 'FACIL',
  MEDIO = 'MEDIO',
  DIFICIL = 'DIFICIL'
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  level: GameLevel;
  difficulty: Difficulty;
  points: number;
}

export interface Player {
  id: string;
  name: string;
  role: 'parent' | 'child' | 'other';
  score: number;
  auraPoints: number;
}
