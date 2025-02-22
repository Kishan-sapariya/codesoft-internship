import pool from "../config/db.js";

const profileDetails = {
  getProfileByUsername: async (username) => {
    try {
      const result = await pool.query(
        "SELECT * FROM authuser WHERE username = $1",
        [username]
      );
      if (!result.rows[0]) {
        throw new Error("User not found");
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getAllPostById: async (id) => {
    try {
      const result = await pool.query(
        `SELECT blog.*, authuser.username 
           FROM blog 
           JOIN authuser ON blog.authuser_id = authuser.id 
           WHERE blog.authuser_id = $1 
           ORDER BY blog.created_at DESC`,
        [id]
      );
      return result.rows;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  },
  getAllLikedPostByUserId: async (id) => {
    try {
      const result = await pool.query(
        `SELECT 
          b.id,
          b.title,
          b.content,
          b.image_url,
          b.authuser_id,
          b.created_at,
          au.username as username,
          l.authuser_id as liker_id,
          lu.username as liker_username
        FROM blog b
        LEFT JOIN authuser au ON b.authuser_id = au.id
        LEFT JOIN likes l ON b.id = l.blog_id
        LEFT JOIN authuser lu ON l.authuser_id = lu.id
        WHERE l.authuser_id = $1`,
        [id]
      );

      if (result.rows.length === 0) {
        return { message: "No liked posts found for this user." };
      }

      return result.rows;
    } catch (error) {
      console.error("Error fetching liked posts:", error.message);
      throw new Error("Internal Server Error");
    }
  },
  updateProfile: async (id, username, email, bio, link) => {
    try {
      const result = await pool.query(
        `UPDATE authuser SET username=$1, email=$2, bio=$3, link=$4 WHERE id=$5 RETURNING *`,
        [username, email, bio, link, id]
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return result.rows[0];
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default profileDetails;
