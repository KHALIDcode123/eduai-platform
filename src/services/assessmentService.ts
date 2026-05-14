import { get, post, put, del } from "./api";
import type { Assessment, Submission, ApiResponse, PaginatedResponse } from "@/types";

const BASE = "/assessments";

export const assessmentService = {
  /** Fetch all assessments, optionally filtered by class. */
  list(classId?: string): Promise<PaginatedResponse<Assessment>> {
    return get(BASE, { params: classId ? { classId } : undefined });
  },

  /** Fetch a single assessment by ID. */
  getById(id: string): Promise<ApiResponse<Assessment>> {
    return get(`${BASE}/${id}`);
  },

  /** Create a new assessment. */
  create(data: Partial<Assessment>): Promise<ApiResponse<Assessment>> {
    return post(BASE, data);
  },

  /** Update an existing assessment. */
  update(id: string, data: Partial<Assessment>): Promise<ApiResponse<Assessment>> {
    return put(`${BASE}/${id}`, data);
  },

  /** Delete an assessment. */
  delete(id: string): Promise<ApiResponse<void>> {
    return del(`${BASE}/${id}`);
  },

  /** Submit a student's answers. */
  submit(assessmentId: string, answers: Submission["answers"]): Promise<ApiResponse<Submission>> {
    return post(`${BASE}/${assessmentId}/submit`, { answers });
  },

  /** Fetch all submissions for an assessment (teacher view). */
  getSubmissions(assessmentId: string): Promise<PaginatedResponse<Submission>> {
    return get(`${BASE}/${assessmentId}/submissions`);
  },

  /** Trigger AI grading for a submission. */
  gradeSubmission(assessmentId: string, submissionId: string): Promise<ApiResponse<Submission>> {
    return post(`${BASE}/${assessmentId}/submissions/${submissionId}/grade`);
  },
};
