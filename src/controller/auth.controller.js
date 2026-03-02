const AppError = require("../utils/AppError.utils");

/**
 * - @name registerUserController
 * - @description Register a new user, expects username, email and password in the body
 * - @access Public
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new AppError("All field are required", 400);
  }

  


}

/**
 * - @name loginUserController
 * - @description Login user, expects username and password in the body
 * - @access Public
 */
async function loginUserController(req, res) {}

/**
 * - @name logoutUserController
 * - @description Logout Route
 * - @access Protected
 */
async function logoutUserController(req, res) {}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
};
