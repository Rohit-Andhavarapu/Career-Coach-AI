export enum ExperienceLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export enum InterviewMode {
  Technical = 'Technical',
  HR = 'HR / Behavioral',
  Mixed = 'Mixed',
}

export interface InterviewConfig {
  role: string;
  experienceLevel: ExperienceLevel;
  mode: InterviewMode;
  candidateName: string;
  resumeText: string;
  numberOfQuestions: number;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ScoreData {
  category: string;
  score: number;
  fullMark: number;
}

export interface ParsedReport {
  rawText: string;
  scores: ScoreData[];
  hiringRecommendation: string | null;
}
