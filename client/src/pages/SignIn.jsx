import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  // State to store form input values (email and password)
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch(); // Used to dispatch Redux actions
  const { loading, error } = useSelector((state) => state.user); // Get loading/error state from Redux store

  const navigate = useNavigate(); // Allows navigation programmatically

  // Handle input changes and update formData state
  const handleChange = (e) => {
    setFormData({
      ...formData, // Keep existing values
      [e.target.name]: e.target.value, // Update the changed field
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    dispatch(signInStart()); // Set loading to true and clear any previous errors

    try {
      // Send POST request to backend API with form data
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tells server to expect JSON
        },
        body: JSON.stringify(formData), // Convert form data to JSON
      });

      const data = await res.json(); // Parse response

      // If the response is not OK, dispatch error
      if (!res.ok) {
        dispatch(signInFailure(data.message)); // Set error message in Redux
        return;
      }

      // Success: store user in Redux and navigate to home page
      dispatch(signInSuccess(data));
      navigate("/"); // Redirect to homepage
    } catch (err) {
      // Catch any network/server error and dispatch failure
      dispatch(signInFailure(err.message || "Network error."));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      {/* Title */}
      <h1 className="text-3xl text-center font-semibold my-7">Sign-In</h1>

      {/* Form for user login */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email input */}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="border p-3 rounded-lg border-gray-300"
          onChange={handleChange}
        />
        {/* Password input */}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="border p-3 rounded-lg border-gray-300"
          onChange={handleChange}
        />
        {/* Submit button */}
        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          type="submit"
          disabled={loading} // Disable while loading
        >
          {loading ? "Loading..." : "Sign In"} {/* Show loading state */}
        </button>
        <OAuth /> {/* OAuth component for Gmail login */}
      </form>

      {/* Redirect to sign-up if no account */}
      <div className="flex gap-2 mt-5">
        <p>Don't have an account?</p>
        <Link to="/signup" className="text-blue-700 cursor-pointer">
          <span>Sign Up</span>
        </Link>
      </div>

      {/* Error message display */}
      {error && (
        <div className="bg-red-100 text-red-500 p-3 rounded-lg mt-5">
          {error}
        </div>
      )}
    </div>
  );
};

export default SignIn;
