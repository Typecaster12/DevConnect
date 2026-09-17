import express from "express";
import { refreshToken, registerNewUser, userLogin, userLogout } from "../controllers/authController.js";

const authRouter = express.Router();

//registration router;
authRouter.post("/registration", registerNewUser);
authRouter.post("/login", userLogin);
authRouter.post("/logout", userLogout);
authRouter.get("/refresh-token", refreshToken); //to generate new accessToken

export default authRouter;