
import { slowDown } from "express-slow-down";

export const apiThrottle = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes

    delayAfter: 30, // First 30 requests have no delay

    // Increase delay by 250ms for each request after 30
    delayMs: (used) => (used - 30) * 250,

    maxDelayMs: 2000, // Maximum delay: 2 seconds
});
