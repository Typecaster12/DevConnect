import { rateLimit } from "express-rate-limit";

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 50,                // 100 requests per client per window

    standardHeaders: true,
    legacyHeaders: false,

    message: {
        status: "Failed",
        message: "Too many requests. Please try again later.",
    },
});