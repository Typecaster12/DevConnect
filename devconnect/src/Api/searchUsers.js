const BASE_URL = "http://localhost:5000";

//accessToken as we have protected api's, so login required for even searching
//publiclly available pages are only login, reg;

export const searchUsers = async (query, accessToken) => {
    try {
        const response = await fetch(
            `${BASE_URL}/api/searchusers?q=${encodeURIComponent(query)}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        const data = await response.json();

        if (!response.ok) {
            throw new Error("No user found..");
        }

        return data;
    } catch (err) {
        console.error("Error Fetching Posts:", err);
        throw err;
    }
};