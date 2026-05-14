export const APP_NAME = "EduAI";
export const APP_DESCRIPTION = "AI-Powered Educational Assessment Platform";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  TEACHER_DASHBOARD: "/teacher",
  STUDENT_DASHBOARD: "/student",
  ASSESSMENT: (id: string) => `/assessment/${id}`,
  RESULTS: (id: string) => `/results/${id}`,
} as const;

export const QUESTION_TYPES = [
  { value: "multiple_choice", label: "Multiple Choice" },
  { value: "short_answer", label: "Short Answer" },
  { value: "essay", label: "Essay" },
  { value: "true_false", label: "True / False" },
  { value: "code", label: "Code" },
] as const;

export const DIFFICULTY_LEVELS = [
  { value: "easy", label: "Easy", colour: "text-green-600 bg-green-100" },
  { value: "medium", label: "Medium", colour: "text-yellow-600 bg-yellow-100" },
  { value: "hard", label: "Hard", colour: "text-red-600 bg-red-100" },
] as const;

export const PAGINATION_PAGE_SIZE = 10;
