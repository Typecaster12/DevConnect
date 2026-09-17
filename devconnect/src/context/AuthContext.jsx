import { loginUser, logoutSession, refreshAccessToken, registerUser } from "@/Api/auth";
import { fetchLoggedUserDetails } from "@/Api/loggedUser";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    //state which are imp for auth;
    //state that will store the logedin user's details, initially will be null;
    const [loggedUser, setLoggedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    //we are now storing the accessToken inside the memory;
    const [accessToken, setAccessToken] = useState(null);

    //tracker, to track if the user authenticated or not?
    const isUserAuthenticated = !!loggedUser;

    //we will check for user when this component mounts;
    useEffect(() => {
        //so onevery time app mounts, first fetch the accessToken is there is any
        //then using that we will see loggedUser's details;
        const checkLoginStatus = async () => {
            try {
                const accessTokenData = await refreshAccessToken();
                setAccessToken(accessTokenData.accessToken);

                const data = await fetchLoggedUserDetails(accessTokenData.accessToken);
                setLoggedUser(data.details);
            } catch (err) {
                setLoggedUser(null);
                setAccessToken(null);
                console.log("User not authenticated: ", err);
            } finally {
                setLoading(false);
            }
        }

        checkLoginStatus();
    }, []); //will run on every mount;

    //now to login user if not;
    const login = async (email, password) => {
        try {
            const data = await loginUser(email, password); //if this trows error, catch block will be executed;
            //response from backend = {status,message,accessToken},
            setAccessToken(data.accessToken);

            //if successfull we have to call next function reponsible for fetching user data;
            //pass the accessToken as parameter;
            const loggedUserData = await fetchLoggedUserDetails(data.accessToken);
            setLoggedUser(loggedUserData.details);
        } catch (err) {
            console.log("Login failed:", err.message);
            throw err;
        }
    }

    //for reg;
    const register = async (firstName, lastName, username, email, password) => {
        try {
            const registerData = await registerUser(firstName, lastName, username, email, password);
            console.log("Registration successfully: ", registerData);
        } catch (err) {
            console.log("Registration failed: ", err);
            throw err;
        }
    }

    //for logout;
    const logout = async () => {
        try {
            const data = await logoutSession();
            //clear the previous(who just loged out) user's details
            //as backend removes the token of that user;
            setLoggedUser(null);
            setAccessToken(null);
            console.log("Logout successfull", data);
        } catch (err) {
            console.log("Logout failed: ", err);
            throw err;
        }
    }


    return <AuthContext.Provider value={{ loggedUser, loading, isUserAuthenticated, login, register, logout, accessToken }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;