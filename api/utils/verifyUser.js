import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

/* export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Token is not valid!"));
    req.user = user;
    next();
  });
}; */

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("verifyToken middleware hit"); // Add this

  if (!token) {
    console.log("No token found");
    return next(errorHandler(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed", err);
      return next(errorHandler(403, "Token is not valid!"));
    }
    console.log("Token verified", user);
    req.user = user;
    next();
  });
};
