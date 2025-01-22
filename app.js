const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const app = express();

// Middleware for security
app.use(helmet());

// Middleware for logging HTTP requests
app.use(morgan("common"));

// Middleware for enabling CORS
app.use(cors());

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the routes
app.use("/api", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = app;