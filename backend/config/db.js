const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI;
    if (!connStr) {
      console.warn('WARNING: MONGODB_URI is not defined. Using in-memory fallback / mock storage.');
      return null;
    }
    const conn = await mongoose.connect(connStr);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn('Falling back to local simulation due to connection failure.');
    return null;
  }
};

module.exports = connectDB;
