import express from "express";
import userRouter from "./routes/user.route.js"; // Import user routes for handling user-related requests
import authRouter from "./routes/auth.route.js"; // Import authentication routes for handling auth-related requests
import dotenv from "dotenv"; // Load environment variables from .env file - keeps sensitive data out of code
import mongoose from "mongoose"; // Import mongoose for MongoDB interactions
import cookieParser from "cookie-parser"; // Middleware to parse cookies from requests
dotenv.config(); // Ensure dotenv is loaded before any other imports that might use process.env

mongoose // Connect to MongoDB using the URI from environment variables
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
}); // Start the Express server on port 3000

app.use("/api/users", userRouter); // “Hey Express, any request starting with /api/users, pass it to the userRouter to figure out what to do next.”
app.use("/api/auth", authRouter);

// Error handling middleware to catch and respond to errors in a consistent format

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if no status code is set
  const message = err.message || "Internal Server Error"; // Default message if none is provided
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
export default app;
