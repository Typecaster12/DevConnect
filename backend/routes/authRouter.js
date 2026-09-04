import express from "express";
import { registerNewUser, userLogin, userLogout } from "../controllers/authController.js";

const authRouter = express.Router();

//registration router;
authRouter.post("/registration", registerNewUser);
authRouter.post("/login", userLogin);
authRouter.post("/logout", userLogout);

export default authRouter;