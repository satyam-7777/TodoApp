const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      set: (value) =>
        value
          .trim()
          .toLowerCase()
          .replace(/\s+/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase()),
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      minlength: [8, "Password must be atleast 8 character long"],
    },
    confirmPassword: {
      type: String,
      trim: true,
      minlength: [8, "Confirm Password must be atleast 8 character long"],
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
