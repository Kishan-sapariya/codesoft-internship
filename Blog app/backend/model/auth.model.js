import pool from "../config/db.js";

const AuthUser = {
  createUser: async (username, email, password) => {
    try {
      const result = await pool.query(
        "INSERT INTO authuser(username,email,password) VALUES($1,$2,$3) RETURNING *",
        [username, email, password]
      );
      return result.rows[0];
    } catch (error) {
      console.log("Error in createUserModel", error);
    }
  },

  findUserByEmail: async (email) => {
    try {
      const result = await pool.query("SELECT * FROM authuser WHERE email=$1", [
        email,
      ]);
      return result.rows[0];
    } catch (error) {
      console.log("Error in getUserByEmailModel", error);
    }
  },

  findUserById: async (id) => {
    try {
      const result = await pool.query("SELECT * FROM authuser WHERE id=$1", [
        id,
      ]);
      return result.rows[0];
    } catch (error) {
      console.log("Error in getUserByEmailModel", error);
    }
  },

  CheckAuthUser: async (id) => {
    try {
      const result = await pool.query("SELECT * FROM authuser WHERE id = $1", [
        id,
      ]);
      return result.rows[0];
    } catch (error) {
      console.log("Error in CheckAuthUser", error);
    }
  },
};

export default AuthUser;
