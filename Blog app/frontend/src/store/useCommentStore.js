import { create } from "zustand";
import { toast } from "react-hot-toast";

const useCommentStore = create((set, get) => ({
  commentsByBlogId: {},

  postComment: async (data, id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.success) {
        set((state) => ({
          commentsByBlogId: {
            ...state.commentsByBlogId,
            [id]: [...(state.commentsByBlogId[id] || []), res.comment],
          },
        }));
        toast.success("Commented successfully");
        await get().getComments(id);
      }
    } catch (error) {
      console.log(error);
    }
  },

  getComments: async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const res = await response.json();
      if (res.success) {
        set((state) => ({
          commentsByBlogId: {
            ...state.commentsByBlogId,
            [id]: res.comments,
          },
        }));
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useCommentStore;
