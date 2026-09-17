const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const userRouter = require("./routes/userRouter");
const taskRouter = require("./routes/taskRouter");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./utils/errorHandler");

//created express app
const app = express();

// global middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// request type logger
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);

// Handling unhandled routes
app.all("/api/v1/{*splat}", (req, res, next) => {
  next(new AppError("Requested URL is not available on the server", 404));
});

//react
app.use(express.static(path.join(__dirname, "client", "build")));

// React Router fallback
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Error middleware
app.use(globalErrorHandler);

module.exports = app;
