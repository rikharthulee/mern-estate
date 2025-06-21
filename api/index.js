import express from "express";
import mongoose from "mongoose"; // Import mongoose for MongoDB interactions
import dotenv from "dotenv"; // Load environment variables from .env file - keeps sensitive data out of code
import userRouter from "./routes/user.routes.js"; // Import user routes for handling user-related requests
dotenv.config(); // Ensure dotenv is loaded before any other imports that might use process.env

/* console.log("MONGODB_URI:", process.env.MONGODB_URI); // Log the MONGODB_URI to verify it's loaded correctly */

mongoose // Connect to MongoDB using the URI from environment variables
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
}); // Start the Express server on port 3000

app.use("/api/users", userRouter); // “Hey Express, any request starting with /api/users, pass it to the userRouter to figure out what to do next.”
