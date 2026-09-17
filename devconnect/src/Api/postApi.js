//to fetch the post already exixts from express;\
const BASE_URL = "http://localhost:5000";

//to get existing posts of the users;
export const fetchUserPost = async (accessToken) => {
    try {

        const response = await fetch(`${BASE_URL}/api/posts`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

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
export const createUserPost = async (content, accessToken) => {
    try {
        //here response holds http response
        //if response.ok becomes true, then we will get our json data;
        const response = await fetch(`${BASE_URL}/api/posts`, {

            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
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
        await fetchUserPost();
        return data;
    } catch (err) {
        console.error("Error Creating Post:", err);
        throw err;
    }
}

export const deleteUserPost = async (postId, accessToken) => {
    try {
        const response = await fetch(`${BASE_URL}/api/posts/${postId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
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
export const updateUserPost = async (postId, newPostContent, accessToken) => {
    try {
        const response = await fetch(`${BASE_URL}/api/posts/${postId}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            },

            body: JSON.stringify({
                newPostContent, //this is the new data we are sending to the server;
                //imp => server must use this variable, if used something else then we will get 404;
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to update the post.");
        }
        const data = await response.json();
        console.log("Data from update User Post: ", data);
        return data;

    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
};
