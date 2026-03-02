const express = require("express");

const authRouter = express.Router();

const authController = require("../controller/auth.controller");

const wrapAsync = require("../middleware/wrapAsync.middleware");

/**
 * - @route POST /api/auth/register
 * - @body { username, email, password }
 * - @description Register new user
 * - @access Public
 */
authRouter.post("/register", authController.registerUserController);

/**
 * - @route POST /api/auth/login
 * - @body { username, password }
 * - @description Login Route
 * - @access Public
 */
authRouter.post("/login", wrapAsync(authController.loginUserController));

/**
 * - @route POST /api/auth/logout
 * - @description Logout Route
 * - @access Protected
 */
authRouter.post("/logout", authController.logoutUserController);

module.exports = authRouter;
