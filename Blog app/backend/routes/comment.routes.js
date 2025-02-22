import express from "express";
import {
  commentOnBlog,
  deleteComment,
  getComments,
} from "../controller/comments.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/:blog_id", protectRoute, commentOnBlog);
router.delete("/:blog_id", protectRoute, deleteComment);
router.get("/:blog_id", protectRoute, getComments);

export default router;
