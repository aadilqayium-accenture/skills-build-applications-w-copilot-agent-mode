import mongoose from 'mongoose';

const DB_NAME = process.env.MONGO_DB_NAME || 'octofit_db';
const MONGO_URL = process.env.MONGO_URL || `mongodb://localhost:27017/${DB_NAME}`;

export async function connectDatabase() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`Connected to MongoDB database: ${DB_NAME}`);
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    throw err;
  }
}

export default mongoose;
