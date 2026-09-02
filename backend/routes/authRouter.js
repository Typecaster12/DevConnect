import express from "express";
import { registerNewUser, userLogin } from "../controllers/authController.js";

const authRouter = express.Router();

//registration router;
authRouter.post("/registration", registerNewUser);
authRouter.post("/login", userLogin);

export default authRouter;