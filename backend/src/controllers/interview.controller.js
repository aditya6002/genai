const AppError = require("../utils/AppError.utils");
const pdfParse = require("pdf-parse");
const { generateInterviewReport } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

async function generateInterviewReportController(req, res) {
  const resumeFile = req.file;
  const { selfDescription, jobDescription } = req.body;

  //   Validate input
  if (
    !resumeFile ||
    !selfDescription ||
    !jobDescription ||
    !resumeFile.buffer ||
    !resumeFile.mimetype ||
    !resumeFile.originalname ||
    resumeFile.mimetype !== "application/pdf" ||
    resumeFile.size > 5 * 1024 * 1024 ||
    !selfDescription.trim() ||
    !jobDescription.trim()
  ) {
    return next(new AppError("Please provide all required fields", 400));
  }

  const resumeContent = await new pdfParse.PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();

  const interviewReportByAi = await generateInterviewReport(
    resumeContent.text,
    selfDescription,
    jobDescription,
  );

  console.log("User",req.user);
  console.log(interviewReport);
  const interviewReport = await interviewReportModel.create({
    user: req.user._id,
    resume: resumeContent.text,
    llmModel: process.env.GOOGLE_GENAI_MODEL,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });

  res.status(201).json({
    message: "Interview report generated successfully",
    interviewReport,
  });
}

module.exports = { generateInterviewReportController };
