import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
    {
        //the one who click on the follow button
        //that user's id will be stored in this section;
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        //who gets followed, that user's id will be here;
        following: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

//for uniqueness, prevent duplicate relationship;
followSchema.index(
    { follower: 1, following: 1 },
    { unique: true }
)


const Follow = mongoose.model("Follow", followSchema);

export default Follow;