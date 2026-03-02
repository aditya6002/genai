const AppError = require("../utils/AppError.utils");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

/**
 * - @name registerUserController
 * - @description Register a new user, expects username, email and password in the body
 * - @access Public
 */
async function registerUserController(req, res) {
  console.log(req.body);
  const { username, email, password } = req.body;
  console.log(username);

  if (
    !username ||
    !email ||
    !password ||
    !username.trim() ||
    !email.trim() ||
    !password.trim()
  ) {
    throw new AppError("All field are required", 400);
  }

  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    if (isUserExist.username == username) {
      throw new AppError("Username already exist", 400);
    } else {
      throw new AppError("Account with this email already exist", 400);
    }
  }

  const newUser = await userModel.create({ email, username, password });

  const token = jwt.sign(
    { userId: newUser._id, username: newUser.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(201).json({
    newUser,
    message: "User registered successfully",
  });
}

/**
 * - @name loginUserController
 * - @description Login user, expects email and password in the body
 * - @access Public
 */
async function loginUserController(req, res) {
  con;
}

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
