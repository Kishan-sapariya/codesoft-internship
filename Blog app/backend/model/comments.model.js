import pool from "../config/db.js";

export const Comments = {
  commentOnBlog: async (blog_id, authuser_id, content) => {
    try {
      const result = await pool.query(
        "INSERT INTO comments (blog_id,authuser_id,content) VALUES ($1,$2,$3) RETURNING *",
        [blog_id, authuser_id, content]
      );
      return result.rows[0];
    } catch (error) {
      console.log("Error in commentOnBlog", error);
    }
  },
  deleteComment: async (blog_id, authuser_id) => {
    try {
      const result = await pool.query(
        "DELETE FROM comments WHERE blog_id = $1 AND authuser_id = $2",
        [blog_id, authuser_id]
      );
      return result.rows[0];
    } catch (error) {
      console.log("Error in deleteComment", error);
    }
  },
  getComments: async (blog_id) => {
    try {
      const result = await pool.query(
        "SELECT c.*, a.username FROM comments c JOIN authuser a ON c.authuser_id = a.id WHERE c.blog_id = $1 ORDER BY c.created_at DESC",
        [blog_id]
      );
      return result.rows;
    } catch (error) {
      console.log("Error in getComments", error);
    }
  },
};
