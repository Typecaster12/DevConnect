import mongoose from "mongoose";
import Follow from "../models/Follow.model.js";
import User from "../models/Users.model.js";

//will take req.user.id, for follower;
//and req.params.id, for following;

export const followRelation = async (req, res) => {
    try {
        const followerId = req.user.id;
        //id validation;
        if (!mongoose.isObjectIdOrHexString(followerId)) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid ID format"
            });
        }

        const followingId = req.params.id;

        //id validation;
        if (!followingId || !mongoose.isObjectIdOrHexString(followingId)) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid ID format or User id not found"
            });
        }

        //checking if user present in db or not;
        const isUserPresent = await User.findById(followingId);
        if (!isUserPresent) {
            return res.status(404).json({
                status: "Failed",
                message: "User Not found"
            })
        }

        //checking if both the id is same;
        if (followerId === followingId) {
            return res.status(400).json({
                status: "Failed",
                message: "User Cannot follow themself"
            })
        }

        //checking if they are not already following each other;
        const relation = await Follow.findOne({
            follower: followerId,
            following: followingId
        });

        if (!relation) {
            //check if user is present in db or not;
            await Follow.create({
                follower: followerId,
                following: followingId
            })

            return res.status(201).json({
                status: "Success",
                message: "Following successfull"
            })
        }

        res.status(409).json({
            status: "Failed",
            message: "Already Following"
        })
    } catch (err) {
        //to prevent simultaneous request's bug
        if (err.code === 11000) {
            return res.status(409).json({
                status: "Failed",
                message: "Already Following"
            });
        }
        res.status(500).json({
            status: "Failed",
            error: err.message,
        })
    }
}