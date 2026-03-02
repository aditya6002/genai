const mongoose = require("mongoose");

async function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log("Database Error :", err);
      process.exit(1);
    });
}

module.exports = connectToDB;
