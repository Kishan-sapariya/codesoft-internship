import express from "express";
import {
  getAllLikedPostByUserId,
  getAllPostById,
  updateProfile,
  getProfileByUsername,
} from "../controller/profile.controller.js";

const router = express.Router();

router.get("/user/:username",getProfileByUsername);
router.get("/:id", getAllPostById);
router.get("/likes/:id", getAllLikedPostByUserId);
router.put("/update/:id", updateProfile);

export default router;
