import toast from "react-hot-toast";
import { create } from "zustand";

export const useBlogStore = create((set, get) => ({
  blogs: [],
  isCreatingBlog: false,
  isLoadingBLogs: false,
  isDeletingBlog: false,
  isUpdatingBlog: false,

  createBlog: async (data) => {
    set({ isCreatingBlog: true });
    try {
      const response = await fetch("http://localhost:5000/api/blogs/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      set({ blogs: [...get().blogs, res.data] });
      toast.success("Blog Created Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create blog");
      console.log("error in createBlog:", error);
    } finally {
      set({ isCreatingBlog: false });
    }
  },

  getAllBlogs: async () => {
    set({ isLoadingBLogs: true });
    try {
      const response = await fetch("http://localhost:5000/api/blogs/", {
        method: "GET",
        credentials: "include",
      });
      const res = await response.json();
      set({ blogs: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error in getAllBlogs:", error);
    } finally {
      set({ isLoadingBLogs: false });
    }
  },

  deleteBlog: async (id) => {
    set({ isDeletingBlog: true });
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const res = await response.json();
      set({ blogs: get().blogs.filter((blog) => blog.id !== id) });
      toast.success("Blog Deleted Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error in deleteBlog:", error);
    } finally {
      set({ isDeletingBlog: false });
    }
  },

  updateBlog: async (id, data) => {
    set({ isUpdatingBlog: true });
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog.id === id ? { ...blog, ...data } : blog
        ),
        isUpdatingBlog: false,
      }));
      await get().getAllBlogs();
      toast.success("Blog Updated Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("error in updateBlog:", error);
    } finally {
      set({ isUpdatingBlog: false });
    }
  },
}));
