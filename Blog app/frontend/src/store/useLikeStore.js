import { create } from "zustand";

const useLikeStore = create((set, get) => ({
  likedPosts: new Map(),
  likeCounts: {},
  isLoading: false,
  LikedUsernames: [],

  initializeLikes: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        "http://localhost:5000/api/likes/liked-blogs",
        {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (data.success && Array.isArray(data.likedBlogs)) {
        const likeMap = new Map();
        data.likedBlogs.forEach((id) => likeMap.set(id, true));
        set({ likedPosts: likeMap });
      }
    } catch (error) {
      set({ likedPosts: new Map() });
    } finally {
      set({ isLoading: false });
    }
  },

  toggleLike: async (blogId) => {
    const isLiked = get().likedPosts.get(blogId);
    try {
      const response = await fetch(
        `http://localhost:5000/api/likes/${blogId}`,
        {
          method: isLiked ? "DELETE" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        set((state) => {
          const newMap = new Map(state.likedPosts);
          if (isLiked) {
            newMap.delete(blogId);
          } else {
            newMap.set(blogId, true);
          }
          return { likedPosts: newMap };
        });
        // Update like count after toggle
        await get().getLikeCount(blogId);
      }
    } catch (error) {
      console.error("Like operation failed:", error);
    }
  },

  getLikeCount: async (blog_Id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/likes/${blog_Id}/count`,
        {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      set((state) => ({
        likeCounts: {
          ...state.likeCounts, // Preserve existing like counts
          [blog_Id]: data.count, // Update the like count for the specific blog
        },
      }));
    } catch (error) {
      console.log("Error fetching like count:", error);
    }
  },

  getLikesByUsername: async (blog_Id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/likes/${blog_Id}`,
        {
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      set({ LikedUsernames: data.username });
    } catch (error) {
      console.error("Error fetching likes by username:", error);
      return [];
    }
  },

  isLiked: (blogId) => get().likedPosts.has(blogId),

}));

export default useLikeStore;
