import { loginUser, registerUser } from "@/Api/auth";
import { fetchLoggedUserDetails } from "@/Api/loggedUser";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    //state which are imp for auth;
    //state that will store the logedin user's details, initially will be null;
    const [loggedUser, setLoggedUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //tracker, to track if the user authenticated or not?
    const isUserAuthenticated = !!loggedUser;

    //we will check for user when this component mounts;
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const data = await fetchLoggedUserDetails();
                setLoggedUser(data.details);
            } catch (err) {
                setLoggedUser(null);
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
            //testlog;
            console.log("Login Successfully: ", data);

            //if successfull we have to call next function reponsible for fetching user data;
            const loggedUserData = await fetchLoggedUserDetails();
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
    return <AuthContext.Provider value={{ loggedUser, loading, isUserAuthenticated, login, register }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;