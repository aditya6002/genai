const mongoose = require("mongoose");

/**
 * - Job description schema : String
 * - resume text:String
 * - self description:String
 *
 * - matchScore : Number
 * - Technical questions :
 *      [
 *         {
 *            question: "",
 *            intention: "",
 *            answer: "",
 *         }
 *      ]
 * - Behavioral questions :
 *       [
 *           {
 *              question: "",
 *              intention: "",
 *              answer: "",
 *          }
 *      ]
 * - Skill gaps :
 *       [
 *         {
 *           skill: "",
 *            severity: {
 *                  type: String,
 *                  enum: ["Low", "Medium", "High"],
 *                  default: "Low",
 *              },
 *         }
 *       ]
 * - Preparation Plan :
 *      [
 *        {
 *          day: Number,
 *          focus: String,
 *          tasks: [String],
 *        }
 *      ]
 */

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { _id: false },
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Behavioral question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { _id: false },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
  },
  { _id: false },
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: [true, "Day is required"],
    },
    focus: {
      type: String,
      required: [true, "Focus is required"],
    },
    tasks: {
      type: [String],
      required: [true, "Tasks are required"],
    },
  },
  { _id: false },
);

const interviewReportSchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: [true, "Job description is required"],
  },
  resume: {
    type: String,
  },
  selfDescription: {
    type: String,
  },
  matchScore: {
    type: Number,
    min: [0, "Match score cannot be less than 0"],
    max: [100, "Match score cannot be greater than 100"],
    required: [true, "Match score is required"],
  },
  technicalQuestions: [technicalQuestionSchema],
  behavioralQuestions: [behavioralQuestionSchema],
  skillGaps: [skillGapSchema],
  preparationPlan: [preparationPlanSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  llmModel: {
    type: String,
    required: [true, "LLM model is required"],
  },
});

const interviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema,
);

module.exports = interviewReportModel;
