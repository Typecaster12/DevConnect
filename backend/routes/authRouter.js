import express from "express";
import { registerNewUser } from "../controllers/authController.js";

const authRouter = express.Router();

//registration router;
authRouter.post("/registration", registerNewUser);
export default authRouter;