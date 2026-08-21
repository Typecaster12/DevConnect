import mockPosts from "../data/mockPost.js";
import mockUsers from "../data/mockUser.js";
import Post from "../models/Posts.model.js";
import User from "../models/Users.model.js";

const loggedUser = "6a8340cadc4371f50a62ac45"; //from mongodb
const currentUser = mockUsers[0]; //let the first user is being handle by us;
//customizing this getApi for DB storage as it currently deals with array;

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

        //will find the post of matching id;
        // const postToBeDeleted = mockPosts.find(element => element.id === postId);
        //as we have to delete the post and update the existing array;
        //but we have const so that the array cannot be updated;
        //and .filter() will create new array instead of giving new values in same array;
        //problem with .filter() is that we are using our existing array and the the operations has been performed on that only so we cant afford creating new array with updated value;

        //get the index of the post by post's id;
        // then we will splice it;
        // const indexOfPost = mockPosts.findIndex(post => post.id === id);
        // console.log("The index of the post: ", indexOfPost);

        //if we get the index from this, then we can remove that post;
        // mockPosts.splice(indexOfPost, 1); //start from that index and delete one post(which is going to be that post only);


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

//update operation, we use PATCH as we are only updating the content of the post not the copmplete post card)
export const updateUserPost = async (req, res) => {
    try {
        const { id } = req.params; //we have to change this id's content;
        //first find the post's index, and then from the index we will get that post
        //after that we can extract the content from the post and update it;

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
export const getLoggedUserProfile = (req, res) => {
    try {
        //get the right user;
        const user = mockUsers.find(
            user => user.id === currentUser.id
        );

        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "No User Found..",
            });
        }

        //for postCount
        const postCount = mockPosts.filter(
            post => post.authorId === currentUser.id
        ).length;


        return res.status(200).json({
            status: "Success",
            user: {
                ...user,
                stats: {
                    ...user.stats,
                    posts: postCount,
                },
            },
        });

    } catch (err) {
        return res.status(500).json({
            status: "Failed",
            error: err.message
        })
    }
}