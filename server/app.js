import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import error from "./middlewares/error.js";

config({
  path: "./db/config.env",
});

export const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: [process.env.FRONTEND_URI_1, process.env.FRONTEND_URI_2],
  })
);

app.get("/", (req, res, next) => {
  res.send("Working");
});

// Import Routers
import user from "./routes/user.js";
import todo from "./routes/todo.js";

app.use("/api/v1", user);
app.use("/api/v1", todo);

// Using Error Middleware
app.use(error);
