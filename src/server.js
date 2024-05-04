import { config } from "dotenv";
config({ path: ".env" });

import connectDB from "./db/connection.js";
import { app } from "./app.js";
import { connectRedis } from "./services/redis.services.js";

const port = process.env.PORT || 8000;

connectDB()
	.then(() => {
		connectRedis();
	})
	.then(() => {
		app.listen(port, () => {
			console.log(`\n⚡️ Server is running at http://localhost:${port}`);
		});
	})
	.catch((error) => {
		console.log("Failed to connectDB", error);
	});
