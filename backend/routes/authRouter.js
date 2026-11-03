
import express from "express";

import {
    logoutFromAll,
    refreshToken,
    registerNewUser,
    userLogin,
    userLogout
} from "../controllers/auth.controller.js";

import {
    authLoginLimiter,
    authRegLimiter
} from "../middleware/rateLimiters/authLimiter.js";

import {
    authLoginThrottle,
    authRegThrottle
} from "../middleware/reqThrottel/authThrottel.js";

import { validateRequest } from "../middleware/reqValidators/reqValidate.js";

import {
    registerSchema,
    loginSchema
} from "../validators/auth.validator.js";

const authRouter = express.Router();

// Registration
authRouter.post(
    "/registration",
    authRegLimiter,
    authRegThrottle,
    validateRequest(registerSchema),
    registerNewUser
);

// Login
authRouter.post(
    "/login",
    authLoginLimiter,
    authLoginThrottle,
    validateRequest(loginSchema),
    userLogin
);

// Logout
authRouter.post("/logout", userLogout);

// Refresh access token
authRouter.get("/refresh-token", refreshToken);

// Logout from all devices
authRouter.post("/logoutAll", logoutFromAll);

export default authRouter;