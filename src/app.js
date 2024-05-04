import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();

const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(
	cors({
		origin: corsOrigin.split(","),
		credentials: true,
		exposedHeaders: "*",
		methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
	})
);
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use("/api/v1/user", userRoutes);

export { app };
