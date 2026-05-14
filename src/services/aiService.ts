import { post } from "./api";
import type { Question, GradedAnswer, ApiResponse } from "@/types";

const BASE = "/ai";

export interface GenerateQuestionsRequest {
  topic: string;
  questionCount: number;
  difficulty?: "easy" | "medium" | "hard" | "mixed";
  questionTypes?: Question["type"][];
  context?: string; // optional document text
}

export interface GradeAnswerRequest {
  question: Question;
  studentAnswer: string;
}

export interface FeedbackRequest {
  studentId: string;
  assessmentId: string;
  gradedAnswers: GradedAnswer[];
}

export const aiService = {
  /**
   * Generate questions for an assessment using AI.
   */
  generateQuestions(request: GenerateQuestionsRequest): Promise<ApiResponse<Question[]>> {
    return post(`${BASE}/generate-questions`, request);
  },

  /**
   * Grade a single open-ended answer using AI.
   */
  gradeAnswer(request: GradeAnswerRequest): Promise<ApiResponse<GradedAnswer>> {
    return post(`${BASE}/grade-answer`, request);
  },

  /**
   * Generate personalised feedback for a student's submission.
   */
  generateFeedback(request: FeedbackRequest): Promise<ApiResponse<string>> {
    return post(`${BASE}/generate-feedback`, request);
  },

  /**
   * Detect potential AI-generated content in a student's answer.
   */
  detectAiContent(text: string): Promise<ApiResponse<{ probability: number; flagged: boolean }>> {
    return post(`${BASE}/detect-ai-content`, { text });
  },

  /**
   * Suggest study resources based on weak areas.
   */
  suggestResources(
    studentId: string,
    weakTopics: string[]
  ): Promise<ApiResponse<{ title: string; url: string; type: string }[]>> {
    return post(`${BASE}/suggest-resources`, { studentId, weakTopics });
  },
};
