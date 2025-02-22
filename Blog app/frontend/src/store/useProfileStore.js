import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useProfileStore = create((set) => ({
  userPosts: [],
  likedPost: [],
  userProfile: null,

  getProfileByUsername: async (username) => {
    try {
      const res = await fetch(`http://localhost:5000/api/profile/user/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      set({ userProfile: data });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch profile");
    }
  },

  getAllPostById: async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/profile/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const parsedData= await res.json();
      set({ userPosts: parsedData.data||[] });
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  },
  getAllLikedPostByUserId: async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/profile/likes/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      set({ likedPost: data });
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch liked posts");
    }
  },

  updateProfile: async (id, username, email, bio, link) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/profile/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, bio, link }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }
      const data = await res.json();
      useAuthStore.setState({ user: data });

      toast.success("Profile updated successfully");
      return data;
    } catch (err) {
      console.error("Update profile error:", err);
      toast.error("Failed to update profile");
    }
  },
}));
