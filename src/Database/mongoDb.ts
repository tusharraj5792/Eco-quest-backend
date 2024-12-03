import mongoose from "mongoose";

const connectToDatabase = async () => {
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;
  try {
    await mongoose.connect(uri);
    console.log("Connected to Mongo!");
  } catch (error) {
    console.error("Connection to MongoDB failed:", error);
    throw error;
  }
};

export default connectToDatabase
