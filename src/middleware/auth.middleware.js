const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError.utils");
const userModel = require("../models/user.model");
const blackListModel = require("../models/blacklist.model");

async function isUserLogin(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("Unauthorized access, token is missing", 401);
  }

  const blacklistedToken = await blackListModel.findOne({ token });

  if (blacklistedToken) {
    throw new AppError("Unauthorized access, token is blacklisted", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    req.user = user;
    next();
  } catch (error) {
    throw new AppError("Unauthorized access, token is invalid", 401);
  }
}
module.exports = { isUserLogin };
