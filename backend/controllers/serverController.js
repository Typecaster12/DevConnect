import mockPosts from "../data/mockPost.js";

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

export const createUserPost = (req, res) => {

};