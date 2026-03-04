const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/auth.controller");
const wrapAsync = require("../middleware/wrapAsync.middleware");
const authMiddleware = require("../middleware/auth.middleware");

/**
 * - @route POST /api/auth/register
 * - @body { username, email, password }
 * - @description Register new user
 * - @access Public
 */
authRouter.post("/register", wrapAsync(authController.registerUserController));

/**
 * - @route POST /api/auth/login
 * - @body { email, password }
 * - @description Login Route
 * - @access Public
 */
authRouter.post("/login", wrapAsync(authController.loginUserController));

/**
 * - @route GET /api/auth/logout
 * - @description Logout Route
 * - @access Protected
 */
authRouter.get(
  "/logout",
  authMiddleware.isUserLogin,
  wrapAsync(authController.logoutUserController),
);

/**
 * @route GET /api/auth/get-me
 * @description Get the current logged in user details
 * @access Private
 */
authRouter.get(
  "/get-me",
  authMiddleware.isUserLogin,
  authController.getMeUserController,
);

module.exports = authRouter;
