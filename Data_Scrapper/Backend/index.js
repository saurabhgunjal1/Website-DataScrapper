import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import scrapRouter from "./routes/scrapRoute.js";
import Company from "./model/model.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/", scrapRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`APP STARTED ON PORT ${PORT}`);
});

// Database connection
const DB_URI = process.env.DB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {});
    console.log("Connected to DB");
  } catch (error) {
    console.error("Failed to connect to DB", error);
    process.exit(1); // Exit process with failure
  }
};

connectDB();
