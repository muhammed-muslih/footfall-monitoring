import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongo_uri = process.env.MONGO_URI;

const connectDb = async () => {
  if (!mongo_uri) {
    console.error("❌ MONGO_URI not defined in .env".bgRed);
    process.exit(1);
  }
  try {
    await mongoose.connect(mongo_uri);
    console.log("✅ Database connected".bgGreen);
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
};
export default connectDb;
