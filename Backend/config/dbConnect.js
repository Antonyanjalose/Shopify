const mongoose = require("mongoose");
require('dotenv').config()
const MONGO_URL = process.env.MONGODB_URL;

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = dbConnect;