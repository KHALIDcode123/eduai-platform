// ─── User & Auth ────────────────────────────────────────────────────────────

export type UserRole = "student" | "teacher" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// ─── Rubric ──────────────────────────────────────────────────────────────────

export interface RubricCriterion {
  id: string;
  name: string;
  description: string;
  weight: number; // percentage (0-100)
  maxPoints: number;
}

export interface Rubric {
  id: string;
  name: string;
  criteria: RubricCriterion[];
  expectedConcepts?: string[]; // key concepts students should mention
  sampleAnswer?: string; // ideal answer example
  commonMistakes?: string[]; // mistakes to watch for
  createdAt: string;
}

// ─── Assessment ──────────────────────────────────────────────────────────────

export type QuestionType = "multiple_choice" | "short_answer" | "essay" | "true_false" | "code";

export type DifficultyLevel = "easy" | "medium" | "hard";

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  points: number;
  difficulty: DifficultyLevel;
  choices?: Choice[];          // for multiple_choice / true_false
  rubric?: string;             // for essay / short_answer
  expectedAnswer?: string;     // for short_answer / code
}

export interface Assessment {
  id: string;
  title: string;
  description?: string;
  teacherId: string;
  classId?: string;
  className?: string;
  questions: Question[];
  rubric?: Rubric;
  totalPoints: number;
  durationMinutes?: number;
  dueDate?: string;
  status: "draft" | "active" | "closed";
  allowVoiceResponses?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Submission ──────────────────────────────────────────────────────────────

export interface Answer {
  questionId: string;
  value: string;
  audioUrl?: string; // for voice responses
  transcript?: string; // speech-to-text result
  voiceAnalysis?: VoiceAnalysis;
}

export interface GradedAnswer extends Answer {
  score: number;
  maxScore: number;
  feedback: string;
  isCorrect?: boolean;
  strengths?: string[];
  weaknesses?: string[];
  suggestions?: string[];
  rubricScores?: { criterionId: string; score: number; feedback: string }[];
}

export interface Submission {
  id: string;
  assessmentId: string;
  studentId: string;
  studentName: string;
  answers: Answer[];
  gradedAnswers?: GradedAnswer[];
  totalScore?: number;
  maxScore: number;
  submittedAt: string;
  gradedAt?: string;
  status: "submitted" | "grading" | "graded" | "reviewed";
  teacherComments?: string;
  teacherOverride?: boolean;
}

// ─── Voice Analysis ──────────────────────────────────────────────────────────

export interface VoiceAnalysis {
  fluency: number; // 0-100
  clarity: number; // 0-100
  pace: "too_fast" | "good" | "too_slow";
  fillerWords: number;
  hesitations: number;
  feedback: string;
  suggestions: string[];
}

// ─── Class ───────────────────────────────────────────────────────────────────

export interface Class {
  id: string;
  name: string;
  subject: string;
  teacherId: string;
  studentIds: string[];
  createdAt: string;
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export interface AssessmentAnalytics {
  assessmentId: string;
  totalSubmissions: number;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  scoreDistribution: { range: string; count: number }[];
  questionStats: {
    questionId: string;
    averageScore: number;
    correctRate?: number;
  }[];
}

// ─── API ─────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
