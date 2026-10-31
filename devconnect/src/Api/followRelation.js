const BASE_URL = "http://localhost:5000";

export const followUser = async (userId, accessToken) => {
    try {
        const response = await fetch(
            `${BASE_URL}/user/follow/${userId}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error while following this user");
        }

        return data;
    } catch (err) {
        console.error("Unable to follow: ", err);
        throw err;
    }
};

export const unFollowUser = async (userId, accessToken) => {
    try {
        const response = await fetch(
            `${BASE_URL}/user/unfollow/${userId}`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Error while unFollowing this user");
        }
        return data;
    } catch (err) {
        console.error("Unable to unFollow: ", err);
        throw err;
    }
};

//to check if user is following user(give id);
export const checkIfUserFollowing = async (userId, accessToken) => {
    try {
        const response = await fetch(
            `${BASE_URL}/user/isFollowing/${userId}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Error while checking");
        }

        return data; //isFollowing is the required data, either true or false
    } catch (err) {
        console.error("Some error occured, while checking", err);
        throw err;
    }
}