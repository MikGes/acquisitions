import express from "express";
import logger from "./config/logger.js"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
const app = express();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }))
app.use(helmet())
app.use("/api/auth/", authRouter)
app.get("/health", (req, res) => {
    // logger.info("Hello there")
    res.json({
        status: "Ok",
    });
});

export default app
