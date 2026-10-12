
import { slowDown } from "express-slow-down";

// Login throttling
export const authLoginThrottle = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes

    delayAfter: 3, // First 3 requests have no delay

    // Increase delay by 1 second per request
    delayMs: (used) => (used - 3) * 1000,

    maxDelayMs: 5000, // Maximum delay 5s
});

// Registration throttling
export const authRegThrottle = slowDown({
    windowMs: 15 * 60 * 1000,

    delayAfter: 2, // First 2 requests have no delay

    delayMs: (used) => (used - 2) * 1000,

    maxDelayMs: 5000,
});
