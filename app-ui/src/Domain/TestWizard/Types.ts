export interface Answer {
  _id: string;
  title: string;
  weight: number;
}

export interface Score {
  _id: string;
  minAverageScore: number;
  maxAverageScore: number;
  description: string;
}

export interface Question {
  _id: string;
  title: string;
  answers: Answer[];
}

export interface Test {
  _id: string;
  questions: Question[];
  scores: Score[];
}

export type SelectedAnswer = Record<string, string>;
