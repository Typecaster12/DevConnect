//this model will store the session of users;
//the idea is to maintain or create a session on that point when we create our refreshToken;
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    refreshTokenHash: {
        type: String,
        required: [true, "RefreshHashedToken is required"]
    },
    ip: {
        type: String,
        required: [true, "ip is required"]
    },
    userAgent: { //basically which and which verison of browser, user is using
        type: String,
        required: [true, "userAgent is required"]
    },
    revoked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Sessions = mongoose.model("Sessions", sessionSchema);
export default Sessions;