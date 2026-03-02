const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
// app.use(cors()); 
  /*{
    origin: process.env.CLIENT_URL,
    credentials: true,
  }*/

// Routes
app.use("/api/auth", require("./routers/auth.routes"));

app.get("/", (req, res) => {
  res.send("App is working");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
