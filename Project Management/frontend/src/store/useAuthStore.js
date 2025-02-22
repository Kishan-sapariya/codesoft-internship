import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null, 
  usernameById: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isLogingIn: false,

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const parsedRes = await res.json();
      if (res.ok) {
        set({ authUser: parsedRes.user });
        toast.success("Signup successful");
      } else {
        toast.error(parsedRes.message || "Signup failed");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLogingIn: true });
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const parsedRes = await res.json();
      if (res.ok) {
        set((state) => ({ ...state, authUser: parsedRes.user }));
        localStorage.setItem("authUser", JSON.stringify(parsedRes.user)); 
        toast.success("Login successful");
        return true;
      } else {
        toast.error(parsedRes.message || "Login failed");
        return false;
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
      return false;
    } finally {
      set({ isLogingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const parsedRes = await res.json();
      if (res.ok) {
        set({ authUser: null });
        localStorage.removeItem("authUser"); 
        toast.success("Logout successful");
      } else {
        toast.error(parsedRes.message || "Logout failed");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await fetch("http://localhost:5000/api/users/check", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const parsedRes = await res.json();
      if (res.ok) {
        set({ authUser: parsedRes.user });
        localStorage.setItem("authUser", JSON.stringify(parsedRes.user)); 
      } else {
        set({ authUser: null });
        localStorage.removeItem("authUser");
      }
    } catch (error) {
      set({ authUser: null });
      localStorage.removeItem("authUser");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  getUsernameById: async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`);
      const parsedRes = await res.json();
      set({ usernameById: parsedRes.user[0].username });
    } catch (error) {
      console.log(error.message);
    }
  }
}));
