const Task = require("../models/Task");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.createTask = catchAsync(async (req, res) => {
  const { name, description, priority } = req.body;

  if (!name || !priority) {
    return res.status(400).json({
      status: "failed",
      message: "please provide todo name and priority",
    });
  }

  const taskData = await Task.create({
    name,
    description,
    priority,
    user: req.user.id,
  });

  res.status(201).json({
    status: "success",
    data: {
      task: taskData,
    },
  });
});

exports.getAllTasks = catchAsync(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });

  // if (!tasks.length) {
  //   throw new AppError("no task found", 404);
  // }

  res.status(200).json({
    status: "success",
    result: tasks.length,
    data: {
      tasks,
    },
  });
});

exports.getTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({
    _id: id,
    user: req.user.id,
  });
  if (!task) {
    throw new AppError("Todo not found", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
});

exports.updateTask = catchAsync(async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const { name, description, priority, status } = req.body;

  const updatedTask = await Task.findOneAndUpdate(
    {
      _id: id,
      user: req.user.id,
    },
    { name, description, priority, status },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  if (!updatedTask) {
    throw new AppError("Todo not found", 404);
  }

  res.status(200).json({
    status: "success",
    task: updatedTask,
  });
});

exports.deleteTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedTask = await Task.findOneAndDelete({
    _id: id,
    user: req.user.id,
  });

  if (!deletedTask) {
    throw new AppError("Todo not found", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Todo deleted successfully",
  });
});
