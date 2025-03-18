import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import moodRoutes from "./routes/mood";
import journalRoutes from "./routes/journal";
import eventRoutes from "./routes/events";
import resourceRoutes from "./routes/resources";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/resources", resourceRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
