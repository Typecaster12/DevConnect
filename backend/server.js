import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import mongoose from "mongoose";

const startServer = async () => {
    const mongoUri = process.env.MONGO_URI?.trim();
    const jwtSecret = process.env.JWT_SECRET;
    const port = Number(process.env.PORT || 5000);

    if (!mongoUri) {
        throw new Error("MONGO_URI must be configured.");
    }

    if (!jwtSecret || Buffer.byteLength(jwtSecret) < 32) {
        throw new Error("JWT_SECRET must be configured and at least 32 bytes long.");
    }

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error("PORT must be a valid TCP port.");
    }

    if (process.env.NODE_ENV === "production" && !process.env.CORS_ORIGIN?.trim()) {
        console.warn("CORS_ORIGIN is unset; browser requests will not be allowed.");
    }

    await connectDB();

    const server = app.listen(port, "0.0.0.0", () => {
        console.log(`Server is listening on port ${port}.`);
    });

    const shutdown = (signal) => {
        console.log(`${signal} received; shutting down.`);
        server.close(() => {
            mongoose.disconnect().then(() => {
                process.exitCode = 0;
            }).catch((error) => {
                console.error("MongoDB disconnect failed:", error.message);
                process.exitCode = 1;
            });
        });
    };

    process.once("SIGTERM", () => shutdown("SIGTERM"));
    process.once("SIGINT", () => shutdown("SIGINT"));
};

startServer().catch((error) => {
    console.error("Server startup failed:", error.message);
    process.exitCode = 1;
});