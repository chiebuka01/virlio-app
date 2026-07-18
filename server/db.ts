import mongoose from "mongoose";

export async function connectDB() {
  try {
    const connectionString = process.env.COSMOS_DB_CONNECTION_STRING || "";
    await mongoose.connect(connectionString);
    console.log(">>> DB is connected");
  } catch (error) {
    console.error(error);
  }
}
