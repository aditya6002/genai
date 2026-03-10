const express = require("express");
const interviewRouter = express.Router();
const wrapAsync = require("../middleware/wrapAsync.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const { upload } = require("../middleware/file.middleware");

/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self description,resume and job description.
 * @access Private
 */
interviewRouter.post(
  "/",
  authMiddleware.isUserLogin,
  upload.single("resume"),
  wrapAsync(interviewController.generateInterviewReportController),
);

module.exports = interviewRouter;
