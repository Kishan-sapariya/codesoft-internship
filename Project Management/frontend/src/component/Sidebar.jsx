import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Plus, ChevronRight, ChevronLeft, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { InitialLetter } from "../utils/InitialLetter";

const Sidebar = () => {
  const { authUser, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className={`absolute z-50 h-screen py-2 px-1 bg-zinc-900 shadow-xl transition-all duration-300 ease-in-out ${
        isOpen ? "w-72" : "w-14 sm:w-20"
      }`}
    >
      {isOpen && (
        <div className="flex flex-col justify-between h-full p-6">
          <div>
            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-950 cursor-pointer transition-colors">
              <Home className="text-gray-300" />
              <Link to="/" className="text-gray-200 text-xl font-medium">
                Home
              </Link>
            </div>
            <div className="h-[1px] w-full bg-zinc-700"></div>
            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-950 cursor-pointer transition-colors">
              <Plus className="text-gray-300" />
              <Link to="/create" className="text-gray-200 font-medium text-xl">
                Create Project
              </Link>
            </div>
            <div className="h-[1px] w-full bg-zinc-700"></div>

            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-950 cursor-pointer transition-colors">
              <LogOut className="text-gray-300" onClick={handleLogout} />
              <span className="text-gray-200 font-medium text-xl">Logout</span>
            </div>

            <div className="h-[1px] w-full bg-zinc-700"></div>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-lg bg-zinc-900 cursor-pointer hover:bg-zinc-950 transition-colors">
            <div className="border border-zinc-200 rounded-full w-10 h-10 overflow-hidden text-gray-200 bg-black flex items-center justify-center">
              {InitialLetter(authUser?.username)}
            </div>
            <div className="text-gray-200 font-medium">
              {authUser?.username}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={toggleSidebar}
        className="absolute top-4 -right-5 p-2 bg-zinc-800 text-2xl text-gray-200 rounded-full hover:bg-zinc-800 transition-colors"
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </button>

      {!isOpen && (
        <div className="flex flex-col items-center justify-between h-full pt-10">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 rounded-full hover:bg-zinc-950 cursor-pointer transition-colors">
              <Link to="/">
                <Home className="size-7 text-gray-300" />
              </Link>
            </div>
            <div className="p-3 rounded-full hover:bg-zinc-950 cursor-pointer transition-colors">
              <Link to="/create">
                <Plus className="size-7 text-gray-300" />
              </Link>
            </div>
            <div className="p-3 rounded-full hover:bg-zinc-950 cursor-pointer transition-colors">
              <LogOut className="size-7 text-gray-300" onClick={handleLogout} />
            </div>
          </div>
          <div>
            <div className="border border-zinc-200 rounded-full w-10 h-10 overflow-hidden text-gray-200 bg-black flex items-center justify-center mb-6 cursor-pointer hover:bg-zinc-950 transition-colors">
              {InitialLetter(authUser?.username)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
