import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        //this post will get the id by mongodb(unique)
        //but here author have that same id which will be given to the authore(user) by mongoDB in User schema;
        //for something like this => author: ObjectId("6a8340cadc4371f50a62ac45"),
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        //will get id from mongodb(_id);
        content: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true, 
    }
);

const Post = mongoose.model("Post", postSchema);

export default Post;