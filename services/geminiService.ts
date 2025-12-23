
import { GoogleGenAI, Type } from "@google/genai";
import { GameLevel, Difficulty, Question } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const questionSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    text: { type: Type.STRING },
    options: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING },
      description: "Exactly 4 options"
    },
    correctAnswer: { type: Type.INTEGER, description: "Index 0 to 3" },
    explanation: { type: Type.STRING }
  },
  required: ["id", "text", "options", "correctAnswer"]
};

export const generateSingleQuestion = async (level: GameLevel, difficulty: Difficulty): Promise<Question> => {
  let categoryPrompt = "";
  let difficultyPrompt = "";
  let points = 5;

  switch (level) {
    case GameLevel.MEMORIA:
      categoryPrompt = "Cultura pop, música y cine español/internacional de los 80 y 90 (Padres).";
      break;
    case GameLevel.GLOBAL:
      categoryPrompt = "Tendencias digitales, jerga Gen Z, TikTok y música urbana actual (Hijos).";
      break;
    case GameLevel.ACADEMICO:
      categoryPrompt = "Historia de España, literatura clásica, ciencia y geografía (Nivel académico).";
      break;
  }

  switch (difficulty) {
    case Difficulty.FACIL:
      difficultyPrompt = "NIVEL FÁCIL: Una pregunta muy obvia que cualquiera con conocimientos básicos sabría.";
      points = 5;
      break;
    case Difficulty.MEDIO:
      difficultyPrompt = "NIVEL MEDIO: Requiere pensar un poco o tener buena memoria de detalles específicos.";
      points = 15;
      break;
    case Difficulty.DIFICIL:
      difficultyPrompt = "NIVEL DIFÍCIL: Un reto para expertos, detalles oscuros o datos técnicos complejos.";
      points = 30;
      break;
  }

  const prompt = `Genera una única pregunta de trivia sobre: ${categoryPrompt}. 
  ${difficultyPrompt}
  Asegúrate de que la explicación sea interesante. 
  Respuestas en español de España.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: questionSchema,
        systemInstruction: "Eres un experto diseñador de juegos de trivia competitivos. Generas retos equilibrados según la dificultad solicitada."
      }
    });

    const data = JSON.parse(response.text || '{}');
    return {
      ...data,
      level,
      difficulty,
      points
    };
  } catch (error) {
    console.error("Error generating question:", error);
    // Fallback question
    return {
      id: "error",
      text: "Error al conectar con la Sinergia. ¿Qué puntaje eliges por cortesía?",
      options: ["5", "15", "30", "0"],
      correctAnswer: 0,
      level,
      difficulty,
      points
    };
  }
};
