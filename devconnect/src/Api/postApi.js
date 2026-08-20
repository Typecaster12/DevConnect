//to fetch the post already exixts from express;\
const BASE_URL = "http://localhost:5000";

//to get existing posts of the users;
export const fetchUserPost = async () => {
    try {

        const response = await fetch(`${BASE_URL}/mock/mockPost`);

        //exception
        if (!response.ok) {
            throw new Error("Failed to fetch posts.");
        }
        const data = await response.json();
        return data;

    } catch (error) {

        console.error("Error Fetching Posts:", error);

        throw error;
    }
};

//to create new posts;
export const createUserPost = async (content) => {
    try {
        //here response holds http response
        //if response.ok becomes true, then we will get our json data;
        const response = await fetch(`${BASE_URL}/mock/mockPost`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                content,
            }),

        });

        if (!response.ok) {
            throw new Error("Failed to create post.");
        }

        //our json data;
        const data = await response.json();
        console.log(data, " : This is data")
        await fetchUserPost();
        return data;
    } catch (err) {
        console.error("Error Creating Post:", err);
        throw err;
    }
}

export const deleteUserPost = async (postId) => {
    try {
        const response = await fetch(`${BASE_URL}/mock/mockPost/${postId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete the post.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
}

//for post's content updation;
export const updateUserPost = async (postId, newPostContent) => {
    try {
        const response = await fetch(`${BASE_URL}/mock/mockPost/${postId}`, {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                newPostContent, //this is the new data we are sending to the server;
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to update the post.");
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
};