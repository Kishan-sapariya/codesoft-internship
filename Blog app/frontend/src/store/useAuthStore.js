import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  userById: [],
  isCheckingAuth: true,
  isSigningup: false,
  isLoggingin: false,

  signup: async (data) => {
    set({ isSigningup: true });
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Signup failed");
      }
      const result = await response.json();
      console.log("result", result);
      set({ user: result.user });
      toast.success("Signup Successfull");
    } catch (error) {
      toast.error(error.message);
      console.log("error in signup", error);
    } finally {
      set({ isSigningup: false });
    }
  },

  login: async (data) => {
    set({ isLoggingin: true });
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("result", result);
      set({ user: result.user });
      toast.success("Login Successfull");
    } catch (error) {
      toast.error(error.message);
      console.log("error in login", error);
    } finally {
      set({ isLoggingin: false });
    }
  },

  logout: async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      set({ user: null });
      toast.success("Logout Successfull");
    } catch (error) {
      toast.error(error.message);
      console.log("error in logout", error);
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await fetch("http://localhost:5000/api/auth/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        set({ user: null, isCheckingAuth: false });
        return;
      }

      const result = await response.json();
      set({
        user: result.user.user,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({
        user: null,
        isCheckingAuth: false,
      });
      console.log("error in checkAuth", error);
    }
  },
}));
