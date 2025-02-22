import AuthUser from "../model/auth.model.js";
import bcrypt from "bcryptjs";
import { genrateToken } from "../config/genrateToken.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await AuthUser.findUserByEmail(email);
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await AuthUser.createUser(username, email, hashedPassword);

    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    genrateToken(newUser.id, res);
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.log("Error in signupController", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AuthUser.findUserByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found with this email" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    genrateToken(user.id, res);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.log("Error in loginController", error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logout successful" });
};

export const checkAuthStatus = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await AuthUser.CheckAuthUser(userId);
    res.status(200).json({
      success: true,
      user: {
        user,
      },
    });
  } catch (error) {
    console.log("Error in checkAuthStatus:", error);
    res.status(500).json({
      success: false,
      message: "Error checking auth status",
    });
  }
};

export const getAllusersId = async (req, res) => {
  try {
    const users = await AuthUser.getAllusersId();
    res.status(200).json({ users });
  } catch (error) {
    console.log("Error in getAllusersId", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
