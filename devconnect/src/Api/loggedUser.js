const BASE_URL = "http://localhost:5000";

export const fetchLoggedUserDetails = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/user`);

        if (!response.ok) {
            throw new Error("Failed to fetch logged user's details")
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error Fetching Posts:", err);
        throw err;
    }
}
