const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routers/auth.routes"));

app.get("/", (req, res) => {
  res.send("App is working");
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    error: err.message,
  });
});

module.exports = app;

