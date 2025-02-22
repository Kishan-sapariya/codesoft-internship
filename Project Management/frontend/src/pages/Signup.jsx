import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Signup = () => {
  const { authUser, signup } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md bg-black rounded-lg shadow-lg border border-gray-800 p-10 py-14">
        <h2 className="text-2xl font-bold text-center mb-2">Sign Up</h2>
        <p className="text-gray-400 text-center mb-6">
          Enter your details below to create an account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-black border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-white text-black rounded font-semibold transition hover:bg-white-700 cursor-pointer"
          >
            Signup
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-white underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
