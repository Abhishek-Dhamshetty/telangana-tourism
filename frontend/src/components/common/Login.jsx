import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:9000/user-api/login", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.6, ease: "easeOut" }} 
      className="flex h-screen bg-gray-900 text-white"
    >
      {/* Left Side - Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          src="data:image/jpeg;base64,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"
          
          alt="Login Illustration"
          className="w-3/4 rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Right Side - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex items-center justify-center p-8"
      >
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-4">Welcome Back</h2>
          <p className="text-gray-400 text-center mb-6">Please enter your credentials</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500 text-white p-2 rounded-lg mb-4 text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full p-3 bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 bg-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Login;
