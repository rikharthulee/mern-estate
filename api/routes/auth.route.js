import express from "express";
import { signin, signup } from "../controllers/auth.controller.js"; // Import the signup controller from the auth controller module

const router = express.Router(); // Create a new Express router instance

router.post("/signup", signup); // Define a POST route for user signup, using the signup controller
router.post("/signin", signin); // Define a POST route for user login, using the signup controller (this should be replaced with the actual login controller)

export default router; // Export the router to be used in other parts of the application
