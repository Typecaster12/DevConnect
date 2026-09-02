import User from "../models/Users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

//for login existing user;
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

        //if password is correct, generate jwt;
        const token = jwt.sign(
            {
                //id of user, who currently logged in;
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d" //this token will expire in 1 day;
            }
        );


        // store the token in cookie
        //this cookie will be sent with every future requests;
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        //send the final response;
        res.status(200).json({
            status: "Success",
            message: "Login Successfull, Welcome User."
        })
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message,
        })
    }

}