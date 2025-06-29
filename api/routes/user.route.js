import express from "express";
import { testUser } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router(); // Create a new Express router instance

router.post(
  "/update/:id",
  (req, res, next) => {
    console.log("Update user route hit");
    next();
  },
  verifyToken,
  updateUser
);

router.get("/test", testUser); // Define a GET route for testing user functionality, using the testUser controller
router.post("/update/:id", verifyToken, updateUser); // Define a POST route for updating user information, using the updateUser controller

export default router;

// This code sets up a basic Express router for user-related routes.
