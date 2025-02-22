import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LoaderIcon } from "react-hot-toast";

const Signup = () => {
  const { signup, isSigningup } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="mx-auto w-96 shadow-lg p-12 py-16 rounded-lg">
        <h1 className="text-center text-emerald-500 text-3xl font-bold mb-4">
          Signup
        </h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            className="w-full p-2 px-4 border-2 rounded mb-4 focus:outline-none focus:border-black "
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            className="w-full p-2 px-4 border-2 rounded mb-4 focus:outline-none focus:border-black "
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            className="w-full p-2 px-4 border-2 rounded mb-4 focus:outline-none focus:border-black "
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="submit"
            className="w-full p-2 bg-emerald-400 text-center hover:bg-emerald-500 text-black rounded"
          >
            {isSigningup ? <LoaderIcon /> : "Signup"}
          </button>
          <Link
            to="/login"
            className="text-center block mt-4 hover:text-emerald-600 hover:underline"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
