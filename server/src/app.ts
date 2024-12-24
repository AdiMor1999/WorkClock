import env from "dotenv";
env.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import timeRoutes from "./routes/timeRoutes";
import { loadData } from "./utils";
import { Data } from "./types";

export const data: Data = loadData();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/api", timeRoutes);

export default app;
