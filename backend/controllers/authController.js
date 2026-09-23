import User from "../models/Users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Sessions from "../models/Session.model.js";
import crypto from "crypto";
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

        //first create a hash of refreshtoken;
        //hash technique for tokens, different from password hash;
        const hashedRefreshToken = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        //this is session, created for every device saperately;
        const session = await Sessions.create({
            user: user._id,
            refreshTokenHash: hashedRefreshToken,
            ip: req.ip,
            userAgent: req.headers["user-agent"] //browser details of user
        });

        //accessToken;
        const accessToken = jwt.sign(
            {
                //id of user, who currently logged in;
                id: user._id,
                sessionId: session._id //different devices of user have different session id
                //so by loging out from one devic dont let logout from other device of user
                //untill user wants to complete remove the session(logout from all the devices);
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        // store the token in cookie
        //this cookie will be sent with every future requests;
        //now we only store refresh token inside http-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, //javascript on the client-side cannot read token;
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
                message: "Refresh Token not found. You are already logged out."
            })
        }

        //as we have sessions of each logins, we have to revoke: ture and clear the session of perticular refresh token
        //and then we have to clear the refreshToken as well;

        //first create hash of refreshToken to search it from DB;
        const hashedRefreshToken = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        //now search for this perticular hash of refreshToken which is not revoked yet;
        const thisSession = await Sessions.findOne({
            refreshTokenHash: hashedRefreshToken,
            revoked: false
        });

        //check if we got the session or not;
        if (!thisSession) {
            res.clearCookie("refreshToken"); //clear it

            return res.status(200).json({
                status: "Failed",
                message: "Session not found, You are already logged out."
            })
        }

        //if twe find session, revoke it so that its refreshToken becomes invalid;
        thisSession.revoked = true;
        await thisSession.save();

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
export const refreshToken = async (req, res) => {
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

        //instead of directly, generating access and refreshToke, adding some verification layer;
        const hashedRefreshToken = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        //session must not be invoked;
        const thisSession = await Sessions.findOne({
            refreshTokenHash: hashedRefreshToken,
            revoked: false
        });

        //check if we have above data or not;
        if (!thisSession) {
            return res.status(401).json({
                status: "Failed",
                message: "Invalid refresh token"
            })
        }

        //create accessToken;
        const accessToken = jwt.sign(
            {
                //id of user, who currently logged in;
                id: decode.id,
                sessionId: thisSession._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        //for more extra security, we will create new refreshToken as well and will delete or make old one invalid
        //also we will maintain session of user, which contains, browser's version, ip, refreshToken etc
        //will be store in db;

        //new refreshToken also called rotating refreshToken, for more safty;
        const newRefreshToken = jwt.sign({
            id: decode.id
        }, process.env.JWT_SECRET,
            {
                expiresIn: "2d"
            }
        );

        //now this newRefreshToken will be saved in the session;
        const newHashedRefreshToken = crypto
            .createHash("sha256")
            .update(newRefreshToken)
            .digest("hex");


        thisSession.refreshTokenHash = newHashedRefreshToken;
        await thisSession.save();

        //store new refresh token into cookie;
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true, //javascript on the client-side cannot read token;
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 24 * 60 * 60 * 1000 //2d(same as expiresIn: 2d)
        });

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