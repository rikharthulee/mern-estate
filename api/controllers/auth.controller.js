import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; // Import bcrypt for password hashing
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10); // Hash the password with a salt rounds of 10
  const newUser = User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: _, ...userDetails } = validUser._doc; // Exclude the password from the user details

    res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      message: "Login successful",
      userDetails,
    });
  } catch (error) {
    next(error);
  }
};
