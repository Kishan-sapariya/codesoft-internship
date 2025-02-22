import pool from "../config/db.js";

export const Likes = {
  likeBlog: async (blog_id, authuser_id) => {
    try {
      const hasLiked = await pool.query(
        "SELECT * FROM likes WHERE blog_id = $1 AND authuser_id = $2",
        [blog_id, authuser_id]
      );

      if (hasLiked.rows.length > 0) {
        return { success: true, message: "User has already liked this blog" };
      }

      const result = await pool.query(
        "INSERT INTO likes (blog_id, authuser_id) VALUES ($1, $2) RETURNING *",
        [blog_id, authuser_id]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error liking blog:", error);
      throw error;
    }
  },
  hasLiked: async (blog_id, authuser_id) => {
    try {
      const result = await pool.query(
        "SELECT * FROM likes WHERE blog_id = $1 AND authuser_id = $2",
        [blog_id, authuser_id]
      );
      return result.rows.length > 0;
    } catch (error) {
      console.log("Error in hasLiked", error);
      return false;
    }
  },
  unLikeBlog: async (blog_id, authuser_id) => {
    try {
      await pool.query(
        "DELETE FROM likes WHERE blog_id = $1 AND authuser_id = $2",
        [blog_id, authuser_id]
      );
      return true;
    } catch (error) {
      console.log("Error in unLikeBlog", error);
      throw error;
    }
  },
  getLikesCount: async (blog_id) => {
    try {
      const result = await pool.query(
        "SELECT COUNT(*) FROM likes WHERE blog_id = $1",
        [blog_id]
      );
      return result.rows[0].count;
    } catch (error) {
      console.log("Error in getLikesCount", error);
    }
  },
  getLikesByUsername: async (blog_id) => {
    try {
      const result = await pool.query(
        "SELECT likes.id AS like_id,likes.blog_id,likes.authuser_id,authuser.username,likes created_at FROM likes JOIN authuser ON likes.authuser_id = authuser.id WHERE likes.blog_id = $1;",
        [blog_id]
      );
      return result.rows;
    } catch (error) {
      console.log("Error in getLikesByUser", error);
    }
  },
};
