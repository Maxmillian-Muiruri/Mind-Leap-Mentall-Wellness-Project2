import dotenv from "dotenv";
dotenv.config(); // Load environment variables
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { connect } from "mongoose";
import appointmentsRouter from "./routes/appointments.js";
import { start as startReminders } from "./services/reminders.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from './routes/admin.js';
import { auth } from "./middleware/auth.js";

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later",
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(limiter);

// Routes
app.use("/api/appointments", appointmentsRouter);
app.use("/api/auth", authRoutes);
app.use("/api/admin", auth, adminRoutes); // Protect admin routes
// Database and Server
const startServer = async () => {
  try {
    console.log('MongoDB URI:', process.env.MONGODB_URI); // Log the MongoDB URI
    await connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB");

    startReminders();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(
        `Server running in ${
          process.env.NODE_ENV || "development"
        } mode on port ${PORT}`
      );
    });
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1);
  }
};

startServer();

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});
