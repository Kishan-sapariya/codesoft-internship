import express from "express";
import {
  checkAuthStatus,
  getAllusersId,
  login,
  logout,
  signup,
} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protectRoute, logout);
router.get("/", protectRoute, checkAuthStatus);
router.get("/users", getAllusersId);

export default router;
