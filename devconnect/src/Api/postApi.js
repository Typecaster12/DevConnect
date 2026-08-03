//to fetch the post already exixts from express;\
const BASE_URL = "http://localhost:5000";

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