import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

// Test route for user
export const testUser = (req, res) => {
  res.status(200).json({
    message: "User route is working",
  });
};

// Update user route
export const updateUser = async (req, res, next) => {
  console.log("updateUser controller hit");
  console.log("req.user:", req.user);
  console.log("req.params.id:", req.params.id);

  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    // If password is being updated, hash it
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    console.log("Request body:", req.body);

    const userExists = await User.findById(req.params.id);
    console.log("User exists:", userExists);
    if (!userExists) return next(errorHandler(404, "User not found"));

    // Update the user document
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    // Exclude password from response
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
