import React, { useEffect } from "react";
import Signup from "./pages/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { LoaderIcon, Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreateBlog from "./components/CreateBlog";
import Profile from "./pages/Profile";

const App = () => {
  const { user, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <LoaderIcon />;
  }

  return (
    <div className="h-screen overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-300">
      <Navbar />
      <Routes>
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route
          path="/profile/:username"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
