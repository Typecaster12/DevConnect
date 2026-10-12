
import { rateLimit } from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5, //5 req, per ip, per window

    standardHeaders: true,
    legacyHeaders: false,

    handler: (req, res) => {
        console.log("RATE LIMIT EXCEEDED:", req.ip);

        res.status(429).json({
            status: "Failed",
            message: "Too many authentication attempts. Please try again later.",
        });
    },
});
