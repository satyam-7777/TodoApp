const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const storeTokenToCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
};

exports.signup = catchAsync(async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    throw new AppError("Please provide all required fields", 400);
  }

  if (password !== confirmPassword) {
    throw new AppError("Password and Confirm Password should be same", 400);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("An account with this email already exists. Please log in instead.", 400);
  }

  // encrypt the password
  const encryptedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    phone,
    password: encryptedPassword,
  });

  // generate token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });

  const userData = user.toObject();
  delete userData.password;

  storeTokenToCookie(res, token);

  res.status(201).json({
    status: "success",
    data: {
      user: userData,
    },
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and Password are required to log in", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(
      "Welcome! It looks like you're new here. Please click Sign Up to get started.",
      404,
    );
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (!isCorrectPassword) {
    throw new AppError("Email or Password is incorrect", 400);
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });

  const userData = user.toObject();
  delete userData.password;
  storeTokenToCookie(res, token);

  res.status(200).json({
    status: "success",
    data: {
      user: userData,
    },
  });
});

exports.authenticate = catchAsync(async (req, res, next) => {
  const authToken = req.cookies.token;

  if (!authToken) {
    return next(new AppError("You are not logged in, please login to perform this action", 401));
  }

  const tokenPayload = jwt.verify(authToken, process.env.JWT_SECRET);
  const userId = tokenPayload.id;

  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("Your account could not be found. Please log in again.", 404));
  }

  req.user = user;
  next();
});

exports.myProfile = catchAsync(async (req, res) => {
  const { user } = req;
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.logout = catchAsync(async (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    status: "success",
    message: "user logout successfully",
  });
});
