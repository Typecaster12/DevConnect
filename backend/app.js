import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/router.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import { apiLimiter } from "./middleware/userEndPointsLimiter.js";
import { apiThrottle } from "./middleware/userEndPThrottel.js";
import followRouter from "./routes/follow.route.js";

const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true //share accesstoken with every request
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

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
