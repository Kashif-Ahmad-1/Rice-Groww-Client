import React, { useState } from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom"; // Using useNavigate for navigation
import { toast, ToastContainer } from "react-toastify"; // Optional: for toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Importing Toastify styles

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const loginData = {
      login: email, // Sending email as login
      pswd: password,
    };

    try {
      const response = await fetch("https://veer-rice-backend.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        // Optionally store the user data and role in localStorage or a global state
        localStorage.setItem("user", JSON.stringify(data)); // Storing user data (you can store token or role here)
        localStorage.setItem("role", data.role); // Storing user role
        localStorage.setItem("token", data.token); // Storing user token
        // Redirect user based on role using navigate()
        if (data.role === "admin") {
          navigate("/users"); // Redirect to Admin Dashboard
        } else if (data.role === "sales executive") {
          navigate("/sales-dashboard"); // Redirect to Sales Executive Dashboard
        } else {
          navigate("/"); // Redirect to home if role is not recognized
        }

        // Optionally show a success toast
        toast.success("Login successful!");
      } else {
        toast.error("Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Network error, please try again.");
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Side - Background Image */}
      <div
        className="w-full md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://plus.unsplash.com/premium_photo-1705338026411-00639520a438?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-40">
          {/* Optional: You can add a title here */}
        </div>
      </div>
  
      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 md:p-0">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          {/* Logo */}
          <div className="text-center mb-6">
            <img
              src={logo} // Replace with your logo
              alt="Rice Traders Logo"
              className="mx-auto w-24"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mt-2">Veer Overseas Ltd.</h2>
            <p className="text-gray-500 text-sm mb-6">Craft Something That Outlives You</p>
          </div>
  
          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email or Username
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 p-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
                required
              />
            </div>
  
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 p-4 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                required
              />
            </div>
  
            <div className="flex justify-between items-center mb-6">
              <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
                Forgot password?
              </a>
            </div>
  
            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-darkRed text-white rounded-md hover:bg-darkRed-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
  
          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-blue-500 hover:text-blue-700">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
  
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
  
  
};

export default LoginPage;
