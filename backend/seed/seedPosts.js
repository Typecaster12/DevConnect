//seeding is only for seeding the demo data from array to mongodb
//when this project is start taking actual users, this file will not be in use;

import "dotenv/config";
import connectDB from "../config/db.js";
import Post from "../models/Posts.model.js";
import User from "../models/Users.model.js";
import mongoose from "mongoose";

const seedPost = async () => {
    try {
        console.log("MongoUri loaded from seedPost");

        // Connect to MongoDB
        await connectDB();

        // Find all existing users
        // These are mock users, but they are now stored in MongoDB
        const users = await User.find();

        if (users.length < 2) {
            throw new Error("At least 2 users are required to seed posts.");
        }
        console.log("Testing user's id:", users[0]._id);

        // Temporary mock posts
        const posts = [
            {
                author: users[0]._id,
                content: "Just started learning MongoDB!",
            },
            {
                author: users[1]._id,
                content: "Building something interesting with React.",
            },
            {
                author: users[0]._id,
                content: "Finally connected my Express server to MongoDB.",
            },
        ];

        // Insert all posts into MongoDB
        await Post.insertMany(posts);
        console.log("Posts seeded successfully.");
        await mongoose.connection.close();

    } catch (err) {
        console.error("Error seeding posts:", err);
        await mongoose.connection.close();

        process.exit(1);
    }
};

seedPost();