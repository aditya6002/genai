const AppError = require("../utils/AppError.utils");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const blackListModel = require("../models/blacklist.model");

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
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email }).select("+password");
  if (!user) {
    throw new AppError("User not exist", 400);
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new AppError("Invalid credentials", 400);
  }

  const token = jwt.sign(
    { userId: user._id, username: user.username },
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
  res.status(200).json({
    user: {
      _id: user._id,
      email: user.email,
      username: user.username,
    },
    message: "User logged successful",
  });
}

/**
 * - @name logoutUserController
 * - @description Logout Route
 * - @access Protected
 */
async function logoutUserController(req, res) {
  const token = req.cookies.token;
  await blackListModel.create({ token });
  res.clearCookie("token");
  res.json({
    message: "User logged out successfully",
  });
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
};
