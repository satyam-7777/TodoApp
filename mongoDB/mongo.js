const mongoose = require("mongoose");

const connectMongoDB = async (mongoUrl) => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to mongodb successfully");
  } catch (err) {
    console.log("Error occured while connecting to mongodb");
    throw err;
  }
};

module.exports = { connectMongoDB };
