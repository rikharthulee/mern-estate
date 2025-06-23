import express from "express";
import { testUser } from "../controllers/user.controller.js";

const router = express.Router(); // Create a new Express router instance

router.get("/test", testUser); // Define a GET route for testing user functionality, using the testUser controller

export default router;

// This code sets up a basic Express router for user-related routes.
