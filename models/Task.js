const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Task name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      default: "Low",
      enum: {
        values: ["Low", "Medium", "High"],
        message: "Priority must be Low, Medium or High",
      },
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "completed"],
        message: "Status must be pending or completed",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
