const BASE_URL = "http://localhost:5000";

//this is basically fetching the users from database, after the sucessfull registration of the user;
//after login(to confirm the credentils) when we get the jwt of user, using that we will get the user's data from this api function
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
