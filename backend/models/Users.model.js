import mongoose from "mongoose";

//after this schema will be our final, then all the id will be replaced by _id(give by mongodb);
const userSchema = new mongoose.Schema(
    {
        personalInfo: {
            firstName: {
                type: String,
                required: true,
                trim: true,
            },

            lastName: {
                type: String,
                required: true,
                trim: true,
            },

            username: {
                type: String,
                required: true,
                unique: true,
                trim: true,
            },

            avatar: {
                type: String,
                default: "",
            },

            headline: {
                type: String,
                default: "",
            },

            bio: {
                type: String,
                default: "",
            },

            location: {
                type: String,
                default: "",
            },
        },

        // Stores ids of all friends
        friends: [
            {
                //here we will use users's id only to store(not username of other data);
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", //these id's belongs to User document
            },
        ],

        stats: {
            followers: {
                type: Number,
                default: 0,
            },

            following: {
                type: Number,
                default: 0,
            },

            posts: {
                type: Number,
                default: 0,
            },
        },

        social: {
            github: {
                type: String,
                default: "",
            },

            linkedin: {
                type: String,
                default: "",
            },

            portfolio: {
                type: String,
                default: "",
            },
        },

        quickLinks: [
            {
                title: {
                    type: String,
                    required: true,
                },

                path: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;