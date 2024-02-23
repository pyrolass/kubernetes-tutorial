const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "20mb" }));

// health check route

app.use("/health_check", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api", require("./routes"));

app.use("/*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

module.exports = app;
