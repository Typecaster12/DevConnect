import express from "express";
import { logoutFromAll, refreshToken, registerNewUser, userLogin, userLogout } from "../controllers/authController.js";
import { authLimiter } from "../middleware/authLimiter.js";

const authRouter = express.Router();

//registration router;
authRouter.post("/registration", authLimiter, registerNewUser);
authRouter.post("/login", authLimiter, userLogin);
authRouter.post("/logout", userLogout);
authRouter.get("/refresh-token", refreshToken); //to generate new accessToken
authRouter.post("/logoutAll", logoutFromAll);

export default authRouter;