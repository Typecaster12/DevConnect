import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/router.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


//routes
app.use("/auth", authRouter);
app.use("/api", router);

//wildcard route;
app.use((req, res) => {
    res.status(404).send("No such page found, Page 404.")
});

export default app;
