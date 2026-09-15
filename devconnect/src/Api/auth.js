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