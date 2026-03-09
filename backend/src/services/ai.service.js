const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

require("dotenv").config();

// Initialize the Google GenAI client with your API key
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// Function to invoke the Gemini AI model with the provided contents
async function invokeGeminiAi(contents) {
  const res = await ai.models.generateContent({
    model: process.env.GOOGLE_GENAI_MODEL,
    contents: contents,
  });
  return res.text;
}

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job description, based on the analysis of the resume, self-description, and job description",
    ),
  technicalQuestions: z
    .array({
      question: z
        .string()
        .describe("The technical question can be asked in the interview"),
      intention: z
        .string()
        .describe("The intention of interviewer behind asking the question"),
      answer: z
        .string()
        .describe(
          "How to answer this question, what points to cover, what approach to take, etc.",
        ),
    })
    .describe(
      "Technical questions that can be asked in the interview along with their intentions and how to answer them",
    ),
  behavioralQuestions: z
    .array({
      question: z
        .string()
        .describe("The behavioral question can be asked in the interview"),
      intention: z
        .string()
        .describe("The intention of interviewer behind asking the question"),
      answer: z
        .string()
        .describe(
          "How to answer this question, what points to cover, what approach to take, etc.",
        ),
    })
    .describe(
      "Behavioral questions that can be asked in the interview along with their intentions and how to answer them",
    ),
  skillGaps: z
    .array({
      skill: z
        .object({
          skill: z.string().describe("The skill that the candidate is lacking"),
          severity: z
            .enum(["low", "medium", "high"])
            .describe("The severity of the skill gap"),
        })
        .describe(
          "The severity of the skill gap,i.e how important is it for the candidate to work on this skill gap",
        ),
    })
    .describe(
      "List of skill gaps that the candidate has along with their severity",
    ),
  preparationPlan: z
    .object({
      day: z
        .number()
        .describe("The day number of the preparation plan, starting from 1"),
      focus: z
        .string()
        .describe(
          "The focus of the preparation for this day, e.g. technical questions, behavioral questions, etc.",
        ),
      tasks: z
        .array(z.string())
        .describe(
          "The list of tasks to be done on this day to follow the preparation plan, e.g. read a book, watch a video, solve a problem, etc.",
        ),
    })
    .describe(
      "A day-wise preparation plan for the candidate to follow to prepare for the interview, based on the identified skill gaps and the questions that can be asked in the interview",
    ),
});

async function generateInterviewReport(
  resume,
  selfDescription,
  jobDescription,
) {
  const prompt = `Generate an interview report for a candidate based on the following information:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}
  The interview report should include the following sections:
1. Match Score: A score between 0 and 100 indicating how well the candidate's profile matches the job description, based on the analysis of the resume, self-description, and job description.
2. Technical Questions: A list of technical questions that can be asked in the interview along with their intentions and how to answer them.
3. Behavioral Questions: A list of behavioral questions that can be asked in the interview along with their intentions and how to answer them.
4. Skill Gaps: A list of skill gaps that the candidate has along with their severity (low, medium, high).
5. Preparation Plan: A day-wise preparation plan for the candidate to follow to prepare for the interview, based on the identified skill gaps and the questions that can be asked in the interview.

The response should be in JSON format and should follow the schema defined above. `;

  const response = await ai.models.generateContent({
    model: process.env.GOOGLE_GENAI_MODEL,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema, "InterviewReport"),
    },
  });

  try {
    const interviewReport = interviewReportSchema.parse(
      JSON.parse(response.text),
    );
    return interviewReport;
  } catch (error) {
    console.error("Error parsing interview report:", error);
    throw new Error("Failed to generate a valid interview report");
  }
}

module.exports = {
  invokeGeminiAi,
};
