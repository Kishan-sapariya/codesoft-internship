import expresss from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controller/blog.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = expresss.Router();

router.post("/create", protectRoute, createBlog);
router.get("/", protectRoute, getAllBlogs);
router.get("/:id", protectRoute, getBlogById);
router.put("/:id", protectRoute, updateBlog);
router.delete("/:id", protectRoute, deleteBlog);

export default router;
