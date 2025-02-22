import { generateToken } from "../config/generateToken.js";
import Users from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Users.getUserByEmail(email);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await Users.createUser(username, email, hashedPassword);

    generateToken(result.rows[0].id, res);
    res.status(201).json({ message: "User created successfully", user: result.rows[0] });

  } catch (error) {
    console.error("Error in signup at user.controller.js", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Users.getUserByEmail(email);
    if (existingUser.rows.length === 0) {
      return res.status(404).json({ message: "No user found with this email" });
    }

    const user = existingUser.rows[0];
    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    generateToken(user.id, res);
    res.status(200).json({ message: "Login successful", user });

  } catch (error) {
    console.error("Error in login at user.controller.js", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt"); 
    res.status(200).json({ message: "Logout successful" });

  } catch (error) {
    console.error("Error in logout at user.controller.js", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = await Users.getAllUsers();
    res.status(200).json({ user: user.rows });
  } catch (error) {
    console.error("Error in getUser at user.controller.js", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Error in checkAuth at user.controller.js", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getUserById=async(req,res)=>{
  try {
    const userId = req.params.id;
    const user = await Users.getUserById(userId);
    res.status(200).json({ user: user.rows });
  } catch (error) {
    console.error("Error in getUserById at user.controller.js", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
