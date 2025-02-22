import express from "express";
import {
  checkAuth,
  getAllUser,
  getUserById,
  login,
  logout,
  signup,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectRoute, checkAuth);
router.get("/", getAllUser);
router.get("/:id", getUserById);

export default router;
