//seeding is only for seeding the demo data from array to mongodb
//when this project is start taking actual users, this file will not be in use;

import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/Users.model.js";
import mockUsers from "../data/mockUser.js";

//to seed the users in db;
const seedUser = async () => {
    try {
        console.log("MONGO_URI loaded:", !!process.env.MONGO_URI);

        await connectDB();

        const newUsers = await User.insertMany(mockUsers);

        console.log("User created successfully:");
        console.log(newUsers);

        await mongoose.connection.close();

        console.log("MongoDB connection closed.");
    } catch (error) {
        console.error("Error creating user:", error);

        await mongoose.connection.close();

        process.exit(1);
    }
};

seedUser();