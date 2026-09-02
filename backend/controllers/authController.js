import User from "../models/Users.model.js";
import bcrypt from "bcrypt";

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
            username
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

