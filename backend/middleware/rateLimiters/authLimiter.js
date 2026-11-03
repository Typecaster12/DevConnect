
import { rateLimit } from "express-rate-limit";

//this is working as a brute-force protection layer;
export const authLoginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 min
    limit: 5, //5 req, per ip, per window

    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {

        res.status(429).json({
            status: "Failed",
            message: "Too many authentication attempts. Please try again later.",
        });
    },
});

//also a brute-force protection layer;
export const authRegLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,

    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {

        res.status(429).json({
            status: "Failed",
            message: "Too many authentication attempts. Please try again later.",
        });
    },
});