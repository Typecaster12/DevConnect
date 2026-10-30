import Post from "../models/Posts.model.js";
import User from "../models/Users.model.js";
import Follow from "../models/Follow.model.js";

export const fetchPost = async (req, res) => {
    try {
        //find from the post;
        const posts = await Post.find({
            // author: loggedUser
            author: req.user.id
        })
            .populate("author")
            .sort({ createdAt: -1 });

        res.status(200).json({
            status: "Success",
            length: posts.length,
            posts
        });
    } catch (err) {
        return res.status(500).json({
            status: "Failed",
            error: err.message
        })
    }
}

//for creating new post;
export const createUserPost = async (req, res) => {
    try {
        //get the input from req.body;
        const { content } = req.body;

        //validation
        if (!content.trim()) {
            return res.status(400).json({
                status: "Failed",
                message: "Post content cannot be empty.",
            })
        }

        await Post.create({
            author: req.user.id,
            content: content.trim()
        });

        //once newpost created, send the response;
        res.status(201).json({ //201 shows resource created;
            status: "Success",
            message: "post created sucessfully.."
        });
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            error: err.message
        });
    }
};

//delete operation, for post;
export const deleteUserPost = async (req, res) => {
    try {
        //first get the id of the post;
        const { id } = req.params;

        //id validation;
        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid ID format"
            });
        }

        //we will find the post's id and then delete it using findOneAndDelete;
        const deletedPost = await Post.findOneAndDelete({
            _id: id, //this is of post id;
            author: req.user.id //need user's id also;
        });

        //checking, if post exists or not;
        if (!deletedPost) {
            return res.status(404).json({
                status: "Failed",
                message: "Post not found or you are not the owner."
            })
        }
        //return the response;
        res.status(200).json({
            status: "Success",
            message: "Post deleted sucessfully..."
        });
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            error: err.message,
        })
    }
}


export const updateUserPost = async (req, res) => {
    try {
        const { id } = req.params;

        //id validation;
        if (!mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid ID format"
            });
        }

        //fetch user's new post's content;
        const { newPostContent } = req.body;

        //new data should not be empty;
        if (!newPostContent?.trim()) {
            return res.status(400).json({
                status: "Failed",
                message: "Post content cannot be empty.",
            });
        }

        const updatedPost = await Post.findOneAndUpdate({ _id: id, author: req.user.id }, { content: newPostContent }, { new: true }); //one Object for id, another one for the content

        if (!updatedPost) {
            return res.status(404).json({
                status: "Failed",
                message: "Can't delete the post which is not yours"
            })
        }

        //return the response;
        res.status(200).json({
            status: "Success",
            message: "Post Updated sucessfully...",
        });
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            error: err.message,
        })
    }
}

//for leftSideBar => to get the details of currentlogged in user;
export const getLoggedUserProfile = async (req, res) => {
    try {
        //we dont need password in the response althoug it is hashed but still due to security concerns
        const thisUser = await User.findById(req.user.id).select("-password");

        if (!thisUser) {
            return res.status(404).json({
                status: "Failed",
                message: "No User Found..",
            });
        }

        //we are counting total number of documents in from the post schema for author only
        //this will give us exact number of posts
        //as every post creates a document;
        const postCount = await Post.countDocuments({
            author: thisUser._id
        });

        //for followers and following count;
        const followerCount = await Follow.countDocuments({
            following: thisUser._id
        });

        const followingCount = await Follow.countDocuments({
            follower: thisUser._id
        });


        // console.log("Post by User: ", postCount);

        res.status(200).json({
            status: "Success",
            message: "User details fetched successfully",
            details: {
                ...thisUser.toObject(), //this converts the mongoDb object to normal object
                //as .countDocuments returns mongoDB document instead of normal js object;

                stats: {
                    ...thisUser.stats,
                    posts: postCount,
                    followers: followerCount,
                    following: followingCount
                }
            }
        })

    } catch (err) {
        return res.status(500).json({
            status: "Failed",
            error: err.message
        })
    }
}


//search users, based on their name or userName;
export const getMatchedUsers = async (req, res) => {
    try {
        const requestedData = req.query.q; //this will either contains the firstname or username or lastname or complete name;
        // console.log(requestedData);

        if (!requestedData) {
            return res.status(400).json({
                status: "failed",
                message: "Plese enter name to search for user"
            })
        }

        //find the user based on the data recieved;
        const users = await User.find({
            $or: [
                {
                    "personalInfo.username": {
                        $regex: requestedData,
                        $options: "i"
                    }
                },
                {
                    "personalInfo.firstName": {
                        $regex: requestedData,
                        $options: "i"
                    }
                },
                {
                    "personalInfo.lastName": {
                        $regex: requestedData,
                        $options: "i"
                    }
                },
                {
                    "personalInfo.username": {
                        $regex: requestedData,
                        $options: "i"
                    }
                }
            ]
        });

        if (users.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "User Not Found."
            })
        }

        //finally return the users;
        res.status(200).json({
            status: "Success",
            message: "User fetched Sucessfully",
            usersData: users
        })
    } catch (err) {
        return res.status(500).json({
            status: "Failed",
            error: err.message
        })
    }
}

//for any individual user(search by logged-in user);
export const individualUserDetails = async (req, res) => {
    try {
        //get the user's id;
        const userId = req.params.id;

        //validation;
        if (!userId) {
            return res.status(400).json({
                status: "Failed",
                message: "Id not found"
            });
        }

        //find on the basis of id, leave the imp things like passwords;
        const individualUser = await User.findById(userId)
            .select("-password")
            .lean();


        if (!individualUser) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            })
        }

        //for post's followers, followings;
        const [postCount, followersCount, followingCount] = await Promise.all([
            Post.countDocuments({ author: userId }),
            Follow.countDocuments({ following: userId }),
            Follow.countDocuments({ follower: userId })
        ]);

        const userDetailsObject = {
            ...individualUser,
            stats: {
                posts: postCount,
                following: followersCount,
                followers: followingCount
            }
        }

        //return this as reponse;
        res.status(200).json({
            status: "Successfull",
            message: "User details fetched successfully",
            userData: userDetailsObject
        });
    } catch (err) {
        return res.status(500).json({
            status: "Failed",
            error: err.message
        })
    }
}