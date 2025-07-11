import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import OAuth from "../components/OAuth";

const SignUp = () => {
  // Store form input values (username, email, password)
  const [formData, setFormData] = useState({});
  // Store any error message returned from the API
  const [error, setError] = useState(null);
  // Indicate whether the form is currently submitting
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Allows redirection after signup

  // Update formData state as the user types in input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Use input name as the key
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(null); // Clear any previous error
    setLoading(true); // Set loading state while waiting for response

    try {
      // Send POST request to signup endpoint with form data
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Sending JSON
        },
        body: JSON.stringify(formData), // Convert formData to JSON
      });

      const data = await res.json(); // Parse server response

      // If request failed, show error message
      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      // On success: stop loading, clear errors, and redirect to Sign In
      setLoading(false);
      setError(null);
      navigate("/signin");
      console.log("Signup successful:", data);
    } catch (err) {
      // Catch and display network or server error
      setError(err.message || "Network error.");
    } finally {
      setLoading(false); // Always stop loading, even on error
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign-Up</h1>

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Username field */}
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          className="border p-3 rounded-lg border-gray-300"
          onChange={handleChange}
        />
        {/* Email field */}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="border p-3 rounded-lg border-gray-300"
          onChange={handleChange}
        />
        {/* Password field */}
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
          disabled={loading} // Prevent clicking while loading
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth /> {/* OAuth component for Gmail login */}
      </form>

      {/* Redirect to sign in if user already has an account */}
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/signin" className="text-blue-700 cursor-pointer">
          <span>Sign In</span>
        </Link>
      </div>

      {/* Display any error message */}
      {error && (
        <div className="bg-red-100 text-red-500 p-3 rounded-lg mt-5">
          {error}
        </div>
      )}
    </div>
  );
};

export default SignUp;
