//this layer is directly communicating with backend's api
//and then our context will use this
//here we will have loginUser(), regisgteruser(), logoutUser(), 
const BASE_URL = "http://localhost:5000";

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            credentials: "include", //Include cookies when making this request, and allow cookies to be handled for the response. 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }
        return data;
    } catch (err) {
        console.error("Some Error Occured while login", err);
        throw err;
    }
}

//for new Registration 
// firstName, lastName, username, email, password 
export const registerUser = async (firstName, lastName, username, email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/registration`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                username,
                email,
                password
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }
        return data;
    } catch (err) {
        console.log("Some Error occured while registration: ", err);
        throw err;
    }
}

//refresh access token api layer
//as react's strictmode is sending two requests concurently
//so two different request is made and controller is rotating refreshToken twice
//so thats why our app throws 401 as it has old(first request's refreshtoken);
//but controller is validating new refreshToken(due to second request);
let refreshPromise = null;
export const refreshAccessToken = async () => {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        try {
            const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to refresh access token"
                );
            }

            return data;
        } finally {
            //once this request is finishe, make the tarcker null again;
            refreshPromise = null;
        }
    })();

    return refreshPromise;
};

//logout api layer; 
export const logoutSession = async () => {
    try {
        const response = await fetch(`${BASE_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Logout failed");
        }

        return data;
    } catch (err) {
        console.log("Some Error occurred while logging out:", err);
        throw err;
    }
};

//logout from all devices;
export const logoutFromAll = async () => {
    try {
        const response = await fetch(`${BASE_URL}/auth/logoutAll`, {
            method: "POST",
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Logout from all devices failed");
        }

        return data
    } catch (err) {
        console.log("Some Error occurred while logging out:", err);
        throw err;
    }
};