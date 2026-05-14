import type { Question, GradedAnswer, Rubric, VoiceAnalysis } from "@/types";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const WHISPER_API_URL = "https://api.openai.com/v1/audio/transcriptions";

// ─── Essay Grading ───────────────────────────────────────────────────────────

export async function gradeEssay(
  question: Question,
  studentAnswer: string,
  rubric?: Rubric
): Promise<GradedAnswer> {
  const prompt = buildGradingPrompt(question, studentAnswer, rubric);

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are an expert educational AI assistant that provides fair, constructive, and encouraging feedback to students. Always be supportive and focus on helping students improve.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return {
      questionId: question.id,
      value: studentAnswer,
      score: result.score,
      maxScore: question.points,
      feedback: result.feedback,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      suggestions: result.suggestions,
      rubricScores: result.rubricScores,
    };
  } catch (error) {
    console.error("Error grading essay:", error);
    throw error;
  }
}

function buildGradingPrompt(question: Question, studentAnswer: string, rubric?: Rubric): string {
  let prompt = `Grade the following student answer based on the question and rubric provided.\n\n`;
  prompt += `**Question:** ${question.text}\n\n`;
  prompt += `**Student Answer:** ${studentAnswer}\n\n`;
  prompt += `**Maximum Points:** ${question.points}\n\n`;

  if (rubric) {
    prompt += `**Rubric:**\n`;
    rubric.criteria.forEach((criterion) => {
      prompt += `- ${criterion.name} (${criterion.weight}%, ${criterion.maxPoints} points): ${criterion.description}\n`;
    });
    prompt += `\n`;

    if (rubric.expectedConcepts && rubric.expectedConcepts.length > 0) {
      prompt += `**Expected Concepts:** ${rubric.expectedConcepts.join(", ")}\n\n`;
    }

    if (rubric.sampleAnswer) {
      prompt += `**Sample Ideal Answer:** ${rubric.sampleAnswer}\n\n`;
    }

    if (rubric.commonMistakes && rubric.commonMistakes.length > 0) {
      prompt += `**Common Mistakes to Watch For:** ${rubric.commonMistakes.join(", ")}\n\n`;
    }
  }

  prompt += `Provide your evaluation in the following JSON format:\n`;
  prompt += `{\n`;
  prompt += `  "score": <number between 0 and ${question.points}>,\n`;
  prompt += `  "feedback": "<overall constructive feedback>",\n`;
  prompt += `  "strengths": ["<strength 1>", "<strength 2>"],\n`;
  prompt += `  "weaknesses": ["<weakness 1>", "<weakness 2>"],\n`;
  prompt += `  "suggestions": ["<suggestion 1>", "<suggestion 2>"],\n`;

  if (rubric) {
    prompt += `  "rubricScores": [\n`;
    rubric.criteria.forEach((criterion, index) => {
      prompt += `    {"criterionId": "${criterion.id}", "score": <number>, "feedback": "<feedback>"}${
        index < rubric.criteria.length - 1 ? "," : ""
      }\n`;
    });
    prompt += `  ]\n`;
  }

  prompt += `}\n\n`;
  prompt += `Be encouraging, specific, and educational in your feedback. Focus on helping the student improve.`;

  return prompt;
}

// ─── Speech-to-Text ──────────────────────────────────────────────────────────

export async function transcribeAudio(audioFile: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("model", "whisper-1");

    const response = await fetch(WHISPER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Whisper API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    throw error;
  }
}

// ─── Voice Analysis ──────────────────────────────────────────────────────────

export async function analyzeVoiceResponse(transcript: string, duration: number): Promise<VoiceAnalysis> {
  const prompt = `Analyze the following spoken response transcript and provide feedback on communication quality.\n\n`;
  const fullPrompt =
    prompt +
    `**Transcript:** ${transcript}\n\n` +
    `**Duration:** ${duration} seconds\n\n` +
    `Provide analysis in JSON format:\n` +
    `{\n` +
    `  "fluency": <0-100>,\n` +
    `  "clarity": <0-100>,\n` +
    `  "pace": "too_fast" | "good" | "too_slow",\n` +
    `  "fillerWords": <count>,\n` +
    `  "hesitations": <count>,\n` +
    `  "feedback": "<overall feedback>",\n` +
    `  "suggestions": ["<suggestion 1>", "<suggestion 2>"]\n` +
    `}\n\n` +
    `Be supportive and educational. Focus on helping the student improve their communication skills.`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert speech and communication coach providing constructive feedback.",
          },
          { role: "user", content: fullPrompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error("Error analyzing voice:", error);
    throw error;
  }
}

// ─── Generate Feedback Summary ───────────────────────────────────────────────

export async function generateFeedbackSummary(
  gradedAnswers: GradedAnswer[],
  studentName: string
): Promise<string> {
  const prompt = `Generate a personalized feedback summary for ${studentName} based on their assessment performance.\n\n`;
  let fullPrompt = prompt + `**Graded Answers:**\n`;

  gradedAnswers.forEach((answer, index) => {
    fullPrompt += `\nQuestion ${index + 1}:\n`;
    fullPrompt += `Score: ${answer.score}/${answer.maxScore}\n`;
    fullPrompt += `Feedback: ${answer.feedback}\n`;
  });

  fullPrompt += `\n\nProvide an encouraging, personalized summary that:\n`;
  fullPrompt += `1. Highlights overall strengths\n`;
  fullPrompt += `2. Identifies key areas for improvement\n`;
  fullPrompt += `3. Offers specific study recommendations\n`;
  fullPrompt += `4. Encourages continued learning\n\n`;
  fullPrompt += `Keep the tone supportive, constructive, and motivating.`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a supportive educational mentor providing personalized feedback to students.",
          },
          { role: "user", content: fullPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating feedback summary:", error);
    throw error;
  }
}
