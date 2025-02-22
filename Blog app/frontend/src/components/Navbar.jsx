import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AlignJustify,
  BookCopy,
  House,
  LogOut,
  PlusCircle,
  User2,
  X,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { logout, user } = useAuthStore();

  return (
    <>
      <div
        className={`h-14 shadow-lg flex justify-between ${
          !user ? "justify-normal" : ""
        } sm:justify-around items-center px-4 bg-white`}
      >
        <div className="cursor-pointer flex items-center gap-2">
          <BookCopy size={24} />
          <h1 className="font-bold text-3xl text-emerald-400">Blog</h1>
        </div>

        {user && (
          <div className="sm:hidden cursor-pointer" onClick={() => setShowNavbar(!showNavbar)}>
            <AlignJustify size={24} />
          </div>
        )}

        {user && (
          <div className="hidden sm:flex gap-10">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-emerald-500"
            >
              <House size={24} />
              <h1 className="text-xl">Home</h1>
            </Link>
            <Link
              to={`/profile/${user?.username}`}
              className="flex items-center gap-1 hover:text-emerald-500"
            >
              <User2 size={24} />
              <h1 className="text-xl">Profile</h1>
            </Link>
            <Link
              to="/create"
              className="flex items-center gap-1 hover:text-emerald-500"
            >
              <PlusCircle size={24} />
              <h1 className="text-xl">Create</h1>
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-1 text-xl hover:text-emerald-500"
            >
              <LogOut size={24} />
              <h1 className="text-xl">Logout</h1>
            </button>
          </div>
        )}
      </div>

      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setShowNavbar(false)}
      />
      <div
        className={`sm:hidden fixed top-0 right-0 h-full w-64 bg-white p-4 z-50 shadow-lg transform transition-transform duration-300 ${
          showNavbar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end">
          <button onClick={() => setShowNavbar(false)} className="p-2">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-emerald-500 border-b border-gray-200 pb-2"
            onClick={() => setShowNavbar(false)}
          >
            <House size={24} />
            <h1 className="text-xl">Home</h1>
          </Link>
          <Link
            to={`/profile/${user?.username}`}
            className="flex items-center gap-1 hover:text-emerald-500 border-b border-gray-200 pb-2"
            onClick={() => setShowNavbar(false)}
          >
            <User2 size={24} />
            <h1 className="text-xl">Profile</h1>
          </Link>
          <Link
            to="/create"
            className="flex items-center gap-1 hover:text-emerald-500 border-b border-gray-200 pb-2"
            onClick={() => setShowNavbar(false)}
          >
            <PlusCircle size={24} />
            <h1 className="text-xl">Create</h1>
          </Link>
          <button
            onClick={() => {
              logout();
              setShowNavbar(false);
            }}
            className="flex items-center gap-1 text-xl hover:text-emerald-500 border-b border-gray-200 pb-2 text-left"
          >
            <LogOut size={24} />
            <h1 className="text-xl">Logout</h1>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;