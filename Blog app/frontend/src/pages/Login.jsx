import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LoaderIcon } from "react-hot-toast";

const Login = () => {
  const { login, isLoggingin } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSumbit = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="mx-auto w-96 shadow-lg p-12 py-16 rounded-lg">
        <h1 className="text-center text-emerald-500 text-3xl font-bold mb-4">
          Login
        </h1>
        <form className="mt-4" onSubmit={handleSumbit}>
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
            className="w-full p-2 text-center bg-emerald-400 hover:bg-emerald-500 text-black rounded"
          >
            {isLoggingin ? <LoaderIcon/> : "Login"}
          </button>
          <Link
            to="/signup"
            className="text-center block mt-4 hover:text-emerald-600 hover:underline"
          >
            Don't have an Account? Create One
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
