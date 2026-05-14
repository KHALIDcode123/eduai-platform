"use client";

import { useState, useCallback } from "react";
import type { Assessment } from "@/types";

interface UseAssessmentHook {
  assessments: Assessment[];
  isLoading: boolean;
  error: string | null;
  fetchAssessments: (classId?: string) => Promise<void>;
  createAssessment: (data: Partial<Assessment>) => Promise<Assessment | null>;
  deleteAssessment: (id: string) => Promise<void>;
}

/**
 * Hook for managing assessments.
 * Replace mock data with real API calls via the assessment service.
 */
export function useAssessment(): UseAssessmentHook {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssessments = useCallback(async (classId?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      void classId;
      setAssessments([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch assessments");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createAssessment = useCallback(async (data: Partial<Assessment>): Promise<Assessment | null> => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newAssessment: Assessment = {
        id: `a_${Date.now()}`,
        title: data.title ?? "Untitled Assessment",
        teacherId: data.teacherId ?? "",
        classId: data.classId ?? "",
        questions: data.questions ?? [],
        totalPoints: data.totalPoints ?? 0,
        status: "draft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data,
      };
      setAssessments((prev) => [...prev, newAssessment]);
      return newAssessment;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create assessment");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteAssessment = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 300));
      setAssessments((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete assessment");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { assessments, isLoading, error, fetchAssessments, createAssessment, deleteAssessment };
}
