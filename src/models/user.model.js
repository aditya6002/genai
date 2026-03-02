const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Username already exist"],
      required: true,
      index: true,
    },
    email: {
      type: String,
      unique: [true, "Account already exists with this email address "],
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

userSchema.methods.comparePassword = async (password) => {
  return await bcryptjs.compare(this.password, password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
