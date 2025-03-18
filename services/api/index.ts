import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { errorHandler } from "./middlewares/error.middleware";
import userRoutes from "./routes/user.route";
import moodRoutes from "./routes/mood.route";
import journalRoutes from "./routes/journal.route";
import eventRoutes from "./routes/events.route";
import resourceRoutes from "./routes/resources.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/users", userRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/resources", resourceRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});
