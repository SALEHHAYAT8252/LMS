import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./database/db.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import authRouter from "./routes/authRouter.js";
import bookrouter from "./routes/bookRouter.js";
import borrowRouter from "./routes/borrowRouter.js";
import userRouter from "./routes/userRouter.js";

import expressFileupload from "express-fileupload";
import { notifyUsers } from "./services/notifyUsers.js";
import { removeUnverifiedAccounts } from "./services/removeUnverifiedAccounts.js";
export const app = express();

config({ path: "./config/.env" });

app.use(
  cors({
    // origin: [process.env.FRONTEND_URL],
    origin:["https://lms-server-synr.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser()); // for parsing cookies
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(expressFileupload({ useTempFiles: true ,
    tempFileDir: "/tmp/", // specify a temporary directory for uploaded files
})); // for parsing multipart/form-data

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/book/", bookrouter);
app.use("/api/v1/borrow/", borrowRouter);
app.use("/api/v1/user/", userRouter);
notifyUsers(); // Start the notification service
removeUnverifiedAccounts(); // Start the unverified accounts removal service
connectDB();
app.use(errorMiddleware);
