import User from "../models/Users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { token } from "morgan";

//for new registration;
export const registerNewUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        //all the required info of user for registration;
        //before saving these info into mongo, we have to validate the data;
        //every data we need must not be empty;
        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400).json({
                status: "Failed",
                message: "All required fields must be provided."
            });
        }

        //now checking if user already exists with same email id or username;
        const isMailAlreadyTaken = await User.findOne({
            email
        });

        const isUserNameAlreadyTaken = await User.findOne({
            "personalInfo.username": username
        });

        //error if already taken;
        if (isMailAlreadyTaken) {
            return res.status(409).json({
                message: "This mail is already in use, Please select another one."
            });
        }

        //error if already taken;
        if (isUserNameAlreadyTaken) {
            return res.status(409).json({
                message: "This User name already taken, Please selection unique user name."
            });
        }

        //now we are hashing the pass, as pass cannot be directly used;
        const hashedPassword = await bcrypt.hash(password, 10); //here 10 is the cost factor(saltRounds);

        //creating new user document based on the data we collected;
        const newUser = await User.create({
            personalInfo: {
                firstName,
                lastName,
                username
            },

            email,
            password: hashedPassword
        });

        res.status(201).json({
            status: "Success",
            message: "New User Registered successfully."
        })
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message,
        })
    }
};

//for login existing(registered) user;
//now we are going to use concept of refresh token and accesstoken
//currently our project is using accesstoken of expiration time of 1d which is not ideal
//now our project will support mpre better security;
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        //find user in mongodb;
        const user = await User.findOne({
            email
        });

        //validation;
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        //if user exists, compare the password;
        //to compare plain pass with hashed
        const isPasswordCorrect = await bcrypt.compare( //will return true or false;
            password,
            user.password
        );

        //validation;
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        //this is a access token
        //if password is correct, generate jwt;
        // const token = jwt.sign(
        //     {
        //         //id of user, who currently logged in;
        //         id: user._id
        //     },
        //     process.env.JWT_SECRET,
        //     {
        //         expiresIn: "1d" //this token will expire in 1 day;
        //     }
        // );

        //accessToken;
        const accessToken = jwt.sign(
            {
                //id of user, who currently logged in;
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );


        //refreshToken;
        const refreshToken = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2d"
            }
        )

        // store the token in cookie
        //this cookie will be sent with every future requests;
        //now we only store refresh token inside http-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 24 * 60 * 60 * 1000 //2d(same as expiresIn: 2d)
        });

        //send the final response;
        res.status(200).json({
            status: "Success",
            message: "Login Successfull, Welcome User.",
            accessToken //as this will  be stored inside the memory that why we have to send response token inside the response body;
        });
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message,
        })
    }
}

export const userLogout = async (req, res) => {
    try {
        //get the user's token;
        const refreshToken = req.cookies.refreshToken;

        //get the auth header;
        // const authHeader = req.headers.authorization;

        //validation;
        if (!refreshToken) {
            return res.status(200).json({
                status: "Success",
                message: "No token found. You are already logged out."
            })
        }

        res.clearCookie("refreshToken"); //takes the name of token which is "token" in our case
        //and userToken contains value of token and we dont need the actual token here, we only need the name of token

        //send the response;
        res.status(200).json({
            status: "Success",
            message: "Logout successfull"
        })
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message
        })
    }
}

//we have to make one controller function for generating new accessToken(once it will get expired);
export const refreshToken = (req, res) => {
    try {
        //get the refreshToken;
        const refToken = req.cookies.refreshToken;
        //validate;
        if (!refToken) {
            return res.status(401).json({
                status: "Failed",
                message: "Unauthorized, No refreshToken Found"
            });
        }

        //verify the refreshToken;
        const decode = jwt.verify(refToken, process.env.JWT_SECRET);

        //create accessToken;
        const accessToken = jwt.sign(
            {
                //id of user, who currently logged in;
                id: decode.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        res.status(200).json({
            status: "Success",
            message: "AccessToken refresh successfully",
            accessToken
        })
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message,
        })
    }
};