"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createAssessment } from "@/services/firebaseService";
import { X, Plus, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import type { Question, Rubric, RubricCriterion } from "@/types";

interface CreateAssessmentModalProps {
  onClose: () => void;
}

export default function CreateAssessmentModal({ onClose }: CreateAssessmentModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState<"basic" | "questions" | "rubric">("basic");
  const [loading, setLoading] = useState(false);

  // Basic info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [allowVoice, setAllowVoice] = useState(false);

  // Questions
  const [questions, setQuestions] = useState<Partial<Question>[]>([
    { type: "essay", text: "", points: 10, difficulty: "medium" },
  ]);

  // Rubric
  const [useRubric, setUseRubric] = useState(false);
  const [rubricName, setRubricName] = useState("");
  const [criteria, setCriteria] = useState<Partial<RubricCriterion>[]>([
    { name: "Content Accuracy", weight: 40, maxPoints: 10 },
    { name: "Clarity", weight: 30, maxPoints: 10 },
    { name: "Organization", weight: 30, maxPoints: 10 },
  ]);
  const [expectedConcepts, setExpectedConcepts] = useState("");
  const [sampleAnswer, setSampleAnswer] = useState("");

  const addQuestion = () => {
    setQuestions([...questions, { type: "essay", text: "", points: 10, difficulty: "medium" }]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const addCriterion = () => {
    setCriteria([...criteria, { name: "", weight: 10, maxPoints: 10 }]);
  };

  const handleSubmit = async () => {
    if (!user) return;

    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (questions.length === 0 || !questions[0].text) {
      toast.error("Please add at least one question");
      return;
    }

    setLoading(true);

    try {
      const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

      const rubric: Rubric | undefined = useRubric
        ? {
            id: "",
            name: rubricName || "Default Rubric",
            criteria: criteria.map((c, i) => ({
              id: `criterion_${i}`,
              name: c.name || `Criterion ${i + 1}`,
              description: "",
              weight: c.weight || 10,
              maxPoints: c.maxPoints || 10,
            })),
            expectedConcepts: expectedConcepts.split(",").map((c) => c.trim()).filter(Boolean),
            sampleAnswer: sampleAnswer || undefined,
            createdAt: new Date().toISOString(),
          }
        : undefined;

      await createAssessment({
        title,
        description,
        teacherId: user.id,
        questions: questions.map((q, i) => ({
          id: `q_${i}`,
          type: q.type || "essay",
          text: q.text || "",
          points: q.points || 10,
          difficulty: q.difficulty || "medium",
        })),
        rubric,
        totalPoints,
        dueDate: dueDate || undefined,
        status: "draft",
        allowVoiceResponses: allowVoice,
      });

      toast.success("Assessment created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating assessment:", error);
      toast.error("Failed to create assessment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 glass-overlay">
      <div className="card-glow max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Create Assessment</h2>
          <button onClick={onClose} className="p-2 hover:bg-dark-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-dark-400" />
          </button>
        </div>

        {/* Steps */}
        <div className="flex gap-2 mb-8">
          {["basic", "questions", "rubric"].map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(s as any)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize ${
                step === s
                  ? "bg-primary-600 text-white"
                  : "bg-dark-800 text-dark-400 hover:text-white"
              }`}
            >
              {i + 1}. {s}
            </button>
          ))}
        </div>

        {/* Step Content */}
        {step === "basic" && (
          <div className="space-y-4">
            <div>
              <label className="label">Assessment Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
                placeholder="e.g., Chapter 5 Quiz - Biology"
              />
            </div>

            <div>
              <label className="label">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea-field"
                rows={3}
                placeholder="Optional description..."
              />
            </div>

            <div>
              <label className="label">Due Date</label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="allowVoice"
                checked={allowVoice}
                onChange={(e) => setAllowVoice(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="allowVoice" className="text-sm text-dark-300">
                Allow voice responses
              </label>
            </div>

            <button onClick={() => setStep("questions")} className="btn-primary w-full">
              Next: Add Questions
            </button>
          </div>
        )}

        {step === "questions" && (
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={index} className="p-4 bg-dark-900/50 rounded-lg border border-dark-700/50">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-medium text-dark-300">Question {index + 1}</span>
                  {questions.length > 1 && (
                    <button
                      onClick={() => removeQuestion(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <textarea
                  value={q.text}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[index].text = e.target.value;
                    setQuestions(newQuestions);
                  }}
                  className="textarea-field mb-3"
                  rows={2}
                  placeholder="Enter your question..."
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label text-xs">Points</label>
                    <input
                      type="number"
                      value={q.points}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].points = parseInt(e.target.value) || 0;
                        setQuestions(newQuestions);
                      }}
                      className="input-field"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="label text-xs">Type</label>
                    <select
                      value={q.type}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].type = e.target.value as any;
                        setQuestions(newQuestions);
                      }}
                      className="select-field"
                    >
                      <option value="essay">Essay</option>
                      <option value="short_answer">Short Answer</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={addQuestion} className="btn-secondary w-full flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Add Question
            </button>

            <div className="flex gap-3">
              <button onClick={() => setStep("basic")} className="btn-secondary flex-1">
                Back
              </button>
              <button onClick={() => setStep("rubric")} className="btn-primary flex-1">
                Next: Rubric (Optional)
              </button>
            </div>
          </div>
        )}

        {step === "rubric" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="useRubric"
                checked={useRubric}
                onChange={(e) => setUseRubric(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="useRubric" className="text-sm text-dark-300">
                Use custom rubric for AI grading
              </label>
            </div>

            {useRubric && (
              <>
                <div>
                  <label className="label">Rubric Name</label>
                  <input
                    type="text"
                    value={rubricName}
                    onChange={(e) => setRubricName(e.target.value)}
                    className="input-field"
                    placeholder="e.g., Essay Grading Rubric"
                  />
                </div>

                <div>
                  <label className="label">Expected Concepts (comma-separated)</label>
                  <input
                    type="text"
                    value={expectedConcepts}
                    onChange={(e) => setExpectedConcepts(e.target.value)}
                    className="input-field"
                    placeholder="e.g., Newton's laws, force, acceleration"
                  />
                </div>

                <div>
                  <label className="label">Sample Ideal Answer</label>
                  <textarea
                    value={sampleAnswer}
                    onChange={(e) => setSampleAnswer(e.target.value)}
                    className="textarea-field"
                    rows={3}
                    placeholder="Provide an example of a perfect answer..."
                  />
                </div>
              </>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep("questions")} className="btn-secondary flex-1">
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Creating..." : "Create Assessment"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
