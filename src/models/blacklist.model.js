const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
      unique: true,
      index: true,
      immutable: true,
    },
    expiredIn: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  { timestamps: true },
);

blacklistSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 3 },
);

const blackListModel = mongoose.model("blacklist", blacklistSchema);

module.exports = blackListModel;
