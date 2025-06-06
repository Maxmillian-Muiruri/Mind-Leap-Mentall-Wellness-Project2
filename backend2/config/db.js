import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default { connectDB };
