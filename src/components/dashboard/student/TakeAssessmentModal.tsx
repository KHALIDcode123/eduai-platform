"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { X, Mic, Square, Upload, Loader2, Send, AlertCircle } from "lucide-react";
import { createSubmission, uploadAudioFile } from "@/services/firebaseService";
import { gradeEssay, transcribeAudio, analyzeVoiceResponse } from "@/services/openaiService";
import toast from "react-hot-toast";
import type { Answer, Question } from "@/types";

interface TakeAssessmentModalProps {
  assessmentId: string;
  onClose: () => void;
}

export default function TakeAssessmentModal({ assessmentId, onClose }: TakeAssessmentModalProps) {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Mock questions - replace with real data
  const questions: Question[] = [
    {
      id: "q1",
      type: "essay",
      text: "Explain Newton's Third Law of Motion and provide a real-world example.",
      points: 20,
      difficulty: "medium",
    },
    {
      id: "q2",
      type: "short_answer",
      text: "What is the primary function of mitochondria in a cell?",
      points: 10,
      difficulty: "easy",
    },
  ];

  const question = questions[currentQuestion];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started");
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error("Failed to start recording");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Recording stopped");
    }
  };

  const handleNext = () => {
    const answer: Answer = {
      questionId: question.id,
      value: textAnswer,
    };

    setAnswers([...answers, answer]);
    setTextAnswer("");
    setAudioBlob(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit([...answers, answer]);
    }
  };

  const handleSubmit = async (finalAnswers: Answer[]) => {
    if (!user) return;

    setSubmitting(true);

    try {
      // Create submission
      const submission = await createSubmission({
        assessmentId,
        studentId: user.id,
        studentName: user.name,
        answers: finalAnswers,
        maxScore: questions.reduce((sum, q) => sum + q.points, 0),
        status: "grading",
      });

      toast.success("Assessment submitted! AI is grading your responses...");
      onClose();
    } catch (error) {
      console.error("Error submitting assessment:", error);
      toast.error("Failed to submit assessment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-overlay">
      <div className="card-glow max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Assessment</h2>
            <p className="text-sm text-dark-400 mt-1">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-dark-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-dark-400" />
          </button>
        </div>

        {/* Progress */}
        <div className="progress-bar h-2 mb-8">
          <div
            className="progress-fill bg-primary-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex-1">{question.text}</h3>
            <span className="badge badge-primary ml-4">{question.points} pts</span>
          </div>

          {/* Text Answer */}
          <div className="mb-6">
            <label className="label">Your Answer</label>
            <textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              className="textarea-field"
              rows={8}
              placeholder="Type your answer here..."
            />
            <p className="text-xs text-dark-500 mt-2">{textAnswer.length} characters</p>
          </div>

          {/* Voice Recording */}
          <div className="p-4 bg-dark-900/50 rounded-lg border border-dark-700/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-dark-300">Or record your answer</span>
              {audioBlob && (
                <span className="text-xs text-green-400">✓ Recording saved</span>
              )}
            </div>

            <div className="flex gap-3">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="btn-secondary flex items-center gap-2"
                  disabled={!!audioBlob}
                >
                  <Mic className="w-4 h-4" />
                  Start Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="btn-accent flex items-center gap-2 animate-pulse"
                >
                  <Square className="w-4 h-4" />
                  Stop Recording
                </button>
              )}

              {audioBlob && (
                <button
                  onClick={() => setAudioBlob(null)}
                  className="btn-ghost text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {isRecording && (
              <div className="mt-3 flex items-center gap-2 text-xs text-red-400">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Recording in progress...
              </div>
            )}
          </div>
        </div>

        {/* AI Disclaimer */}
        <div className="ai-disclaimer mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>
            Your response will be evaluated by AI and reviewed by your teacher. The AI provides
            initial feedback, but your teacher has final authority over grades.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>
          <button
            onClick={handleNext}
            disabled={!textAnswer.trim() || submitting}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : currentQuestion < questions.length - 1 ? (
              <>
                Next Question
                <Send className="w-4 h-4" />
              </>
            ) : (
              <>
                Submit Assessment
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
