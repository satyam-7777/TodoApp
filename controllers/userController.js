const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    throw new AppError("user does not exist", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getAllUser = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      users,
    },
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const { name, phone } = body;

  const user = await User.findById(id);

  if (!user) {
    throw new AppError("user does not exist", 404);
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, phone },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  res.status(200).json({
    status: "success",
    user: updatedUser,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    throw new AppError("user does not exist", 404);
  }

  await User.findByIdAndDelete(id);

  res.status(200).json({
    status: "success",
    message: "user deleted successfully",
  });
});
