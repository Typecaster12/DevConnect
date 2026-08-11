import mockPosts from "../data/mockPost.js";
import mockUsers from "../data/mockUser.js";

const currentUser = mockUsers[0]; //let the first user is being handle by us;
export const fetchMockPost = (req, res) => {
    try {
        if (mockPosts.length <= 0) {
            // console.log("No post, ", mockPosts.length);
            return res.status(200).json({
                status: "Sucess",
                length: mockPosts.length,
            });
        }

        return res.status(200).json({
            status: "Sucess",
            length: mockPosts.length,
            posts: mockPosts
        });
    } catch (err) {
        return res.status(500).json({
            status: "Failed",
            error: err.message
        })
    }
}

//for creating new post;
export const createUserPost = (req, res) => {

    try {
        //get the input from req.body;
        const { content } = req.body;
        // console.log("data from req.body: ", req.body);
        //new post template;
        const newPost = {
            id: crypto.randomUUID(),
            authorId: currentUser.id, //this is the id which will connect posts with their actual user;
            content,
            createdAt: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }),
        }

        //stores the newPost data on data base(currently in array);
        mockPosts.unshift(newPost); //so that nwest post will be on first index always, we can use push also here;

        //once newpost created, send the response;
        res.status(201).json({ //201 shows resource created;
            status: "Success",
            data: newPost,
        });
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            error: err.message,
        });
    }
};

//delete operation, for post;
export const deleteUserPost = (req, res) => {
    try {
        //first get the id of the post;
        const { id } = req.params;
        // console.log("Id of the post: ", id);

        //will find the post of matching id;
        // const postToBeDeleted = mockPosts.find(element => element.id === postId);
        //as we have to delete the post and update the existing array;
        //but we have const so that the array cannot be updated;
        //and .filter() will create new array instead of giving new values in same array;
        //problem with .filter() is that we are using our existing array and the the operations has been performed on that only so we cant afford creating new array with updated value;

        //get the index of the post by post's id;
        // then we will splice it;
        const indexOfPost = mockPosts.findIndex(post => post.id === id);
        // console.log("The index of the post: ", indexOfPost);

        //if we get the index from this, then we can remove that post;
        mockPosts.splice(indexOfPost, 1); //start from that index and delete one post(which is going to be that post only);

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
export const updateUserPost = (req, res) => {
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

        //finding the index;
        const postIndex = mockPosts.findIndex(post => post.id === id); //we get the index from here;
        //validation, if path does not exists;
        if (postIndex === -1) {
            return res.status(404).json({
                status: "Failed",
                message: "Post not found",
            });
        }
        //update the content;
        mockPosts[postIndex].content = newPostContent;

        //return the response;
        res.status(200).json({
            status: "Success",
            message: "Post Updated sucessfully...",
            post: mockPosts[postIndex],
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