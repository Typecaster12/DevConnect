import express from "express";
import { logoutFromAll, refreshToken, registerNewUser, userLogin, userLogout } from "../controllers/authController.js";
import { authLoginLimiter, authRegLimiter } from "../middleware/authLimiter.js";
import { authLoginThrottle, authRegThrottle } from "../middleware/authThrottel.js";

const authRouter = express.Router();

//registration router;
authRouter.post("/registration", authRegLimiter, authRegThrottle, registerNewUser);
authRouter.post("/login", authLoginLimiter, authLoginThrottle, userLogin);
authRouter.post("/logout", userLogout);
authRouter.get("/refresh-token", refreshToken); //to generate new accessToken
authRouter.post("/logoutAll", logoutFromAll);

export default authRouter;