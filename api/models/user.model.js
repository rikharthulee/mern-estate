import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
// This code defines a Mongoose schema for a User model in a Node.js application.
// The schema includes fields for username, email, password, and createdAt timestamp.
// Each field has specific validation rules, such as being required, unique, and trimmed.
// The User model is then exported for use in other parts of the application, allowing for easy interaction with user data in a MongoDB database.
