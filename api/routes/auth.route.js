import express from "express";
import {
  google,
  signOut,
  signin,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post(
  "/google",
  (req, res, next) => {
    console.log("➡️  /api/auth/google route was hit");
    next(); // pass to controller
  },
  google
);

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signOut);

export default router;
