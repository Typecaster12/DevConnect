import mockPosts from "../data/mockPost.js";
import mockUsers from "../data/mockUser.js";

const currentUser = mockUsers[0]; //let the first user is being handle by us;
export const fetchMockPost = (req, res) => {
    try {
        if (mockPosts.length <= 0) {
            console.log("No post, ", mockPosts.length);
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
    //we will take input(the post data which user will enter);
    //  const newPost = {
    //         id: crypto.randomUUID(),
    //         authorId: currentUser.id, 
    //         content,
    //         createdAt: new Date().toLocaleDateString("en-GB", {
    //             day: "2-digit",
    //             month: "long",
    //             year: "numeric",
    //         }),
    //     };

    // we will use this dataformate for post
    //and finally frontend will fetch the data from here;

    try {
        //get the input from req.body;
        const {content} = req.body;
        console.log("data from req.body: ", req.body);
        //new post template;
        const newPost = {
            id: crypto.randomUUID(),
            authorId: currentUser.id,
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