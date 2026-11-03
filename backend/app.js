import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/router.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { apiLimiter } from "./middleware/rateLimiters/userEndPointsLimiter.js";
import { apiThrottle } from "./middleware/reqThrottel/userEndPThrottel.js";
import followRouter from "./routes/follow.route.js";

const app = express();
const allowedOrigins = new Set(
    (process.env.CORS_ORIGIN || (process.env.NODE_ENV === "production" ? "" : "http://localhost:5173"))
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
);

if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
}

// Middlewares
app.use(cors({
    origin: (origin, callback) => {
        callback(null, !origin || allowedOrigins.has(origin));
    },
    credentials: true
}));
app.use(express.json({ limit: "32kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/health", (req, res) => {
    const databaseReady = mongoose.connection.readyState === 1;
    res.status(databaseReady ? 200 : 503).json({
        status: databaseReady ? "ok" : "unavailable"
    });
});

//rate-limiter middleware;
app.use("/api", apiLimiter, apiThrottle);

//routes
app.use("/auth", authRouter);
app.use("/api", router);
app.use("/user", followRouter);

//wildcard route;
app.use((req, res) => {
    res.status(404).send("No such page found, Page 404.")
});

export default app;
