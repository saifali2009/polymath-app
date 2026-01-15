
export enum AppView {
  DASHBOARD = 'dashboard',
  SUBJECT_DETAIL = 'subject_detail',
  QUIZ = 'quiz',
  NOTES = 'notes',
  AI_TOOLS = 'ai_tools',
  CHAT = 'chat',
  SEARCH = 'search',
  MAPS = 'maps',
  VOICE = 'voice',
  IMAGE_GEN = 'image_gen',
  VIDEO_GEN = 'video_gen',
  IMAGE_EDIT = 'image_edit',
  ANALYZE = 'analyze'
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  topics: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Note {
  title: string;
  content: string;
  type: 'summary' | 'formula' | 'mindmap';
}
