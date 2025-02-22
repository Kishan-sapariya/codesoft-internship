import express from "express";
import {
  getLikedBlogsByUser,
  getLikesByUsername,
  getLikesCount,
  hasLiked,
  likeBlog,
  unLikeBlog,
} from "../controller/likes.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/liked-blogs", protectRoute, getLikedBlogsByUser);
router.post("/:id", protectRoute, likeBlog);
router.delete("/:id", protectRoute, unLikeBlog);
router.get("/:id/status", protectRoute, hasLiked);
router.get("/:blog_id/count", protectRoute, getLikesCount);
router.get("/:blog_id", protectRoute, getLikesByUsername);

export default router;
