const BASE_URL = "http://localhost:5000";

export const individualUser = async (userId, accessToken) => {
    try {
        const response = await fetch(
            `${BASE_URL}/api/userProfile/${userId}`,
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
        console.error("Error Fetching User Details", err);
        throw err;
    }
}