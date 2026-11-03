import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI.trim());

    console.log("MongoDB connected successfully.");
};

export default connectDB;