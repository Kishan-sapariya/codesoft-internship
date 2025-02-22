import pool from "../config/db.js";

export const Blogs = {
  createBlog: async (title, content, authuser_id, image_url = null) => {
    try {
      const result = await pool.query(
        "INSERT INTO blog(title, content, authuser_id, image_url) VALUES($1, $2, $3, $4) RETURNING *",
        [title, content, authuser_id, image_url]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error in createBlogModel", error);
    }
  },
  updateBlog: async (id, title, content, image_url = null) => {
    try {
      const result = await pool.query(
        "UPDATE blog SET title=$1, content=$2, image_url=$3 WHERE id=$4 RETURNING *",
        [title, content, image_url, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error in updateBlogModel", error);
    }
  },

  getAllBlogs: async () => {
    try {
      const result = await pool.query(`
                SELECT blog.*, authuser.username 
                FROM blog 
                JOIN authuser ON blog.authuser_id = authuser.id
            `);
      return result.rows;
    } catch (error) {
      console.log("Error in getAllBlogsModel", error);
    }
  },
  getBlogById: async (id) => {
    try {
      const result = await pool.query(
        `
                SELECT blog.*, authuser.username 
                FROM blog 
                JOIN authuser ON blog.authuser_id = authuser.id 
                WHERE blog.id=$1
            `,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.log("Error in getBlogByIdModel", error);
    }
  },
  deleteBlog: async (id) => {
    try {
      const result = await pool.query(
        "DELETE FROM blog WHERE id=$1 RETURNING *",
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.log("Error in deleteBlogModel", error);
    }
  },
};
