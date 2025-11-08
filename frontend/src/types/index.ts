export interface Student {
  id: string;
  name: string;
  age: number;
  totalExercises: number;
  successfulExercises: number;
  averageAccuracy: number;
  lastActive: string;
}

export interface Exercise {
  id: string;
  studentId: string;
  type: 'read-aloud' | 'listen-write';
  sentence: string;
  accuracy: number;
  timestamp: string;
}

export interface FeedbackMessage {
  title: string;
  message: string;
  emoji: string;
}
