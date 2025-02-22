import pool from "../config/db.js";

const Users = {
  createUser: async (username, email, password) => {
    try {
      const result = await pool.query(
        `INSERT INTO users(username, email, password_hash) VALUES($1, $2, $3) RETURNING *`,
        [username, email, password]
      );
      return result;
    } catch (error) {
      console.error("Error in createUser at user.model.js", error);
      throw error;
    }
  },
  getAllUsers:async()=>{
    try {
      const result = await pool.query(`SELECT * FROM users`);
      return result;
    } catch (error) {
      console.error("Error in getAllUsers at user.model.js", error);
      throw error;
    }
  },
  getUserByEmail: async (email) => {
    try {
      const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
      return result;
    } catch (error) {
      console.error("Error in getUserByEmail at user.model.js", error);
      throw error;
    }
  },
  getUserById: async (id) => {
    try {
      const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
      return result;
    } catch (error) {
      console.error("Error in getUserById at user.model.js", error);
      throw error;
    }
  },
  checkAuth: async (userId) => {
    try {
      const result = await pool.query(`SELECT id, username, email FROM users WHERE id=$1`, [userId]);
      return result;
    } catch (error) {
      console.error("Error in checkAuth at user.model.js", error);
      throw error;
    }
  },
};

export default Users;
