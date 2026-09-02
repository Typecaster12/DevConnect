import Post from "../models/Posts.model.js";
import User from "../models/Users.model.js";

const loggedUser = "6a8340cadc4371f50a62ac45"; //from mongodb

export const fetchPost = async (req, res) => {
    try {
        //find from the post;
        const posts = await Post.find({
            author: loggedUser
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
            author: loggedUser,
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

        //we will find the post's id and then delete it using findOneAndDelete;
        const deletedPost = await Post.findOneAndDelete({
            _id: id
        });

        //checking, if post exists or not;
        if (!deletedPost) {
            res.status(400).json({
                status: "Failed",
                message: "Post not found."
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

        //fetch user's new post's content;
        const { newPostContent } = req.body;

        //new data should not be empty;
        if (!newPostContent?.trim()) {
            return res.status(400).json({
                status: "Failed",
                message: "Post content cannot be empty.",
            });
        }

        await Post.findOneAndUpdate({ _id: id }, { content: newPostContent }); //one Object for id, another one for the content

        //validation, if post index is not there;
        if (id === undefined || id == -1) {
            return res.status(400).json({
                status: "Failed",
                message: "Cant find the post.."
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
        // //get the right user;
        // const user = mockUsers.find(
        //     user => user.id === currentUser.id
        // );

        const user = await User.findById(loggedUser);
        console.log("User for their details: ", user);

        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "No User Found..",
            });
        }

        //we are counting total number of documents in from the post schema for author only
        //this will give us exact number of posts
        //as every post creates a document;
        const postCount = await Post.countDocuments({
            author: user._id
        });
        console.log("Post by User: ", postCount);
        //for postCount
        // const postCount = mockPosts.filter(
        //     post => post.authorId === currentUser.id
        // ).length;


        // return res.status(200).json({
        //     status: "Success",
        //     user: {
        //         ...user,
        //         stats: {
        //             ...user.stats,
        //             posts: postCount,
        //         },
        //     },
        // });

        res.status(200).json({
            status: "Success",
            message: "User details fetched successfully",
            details: {
                ...user.toObject(), //this converts the mongoDb object to normal object
                //as .countDocuments returns mongoDB document instead of normal js object;

                stats: {
                    ...user.stats,
                    posts: postCount
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