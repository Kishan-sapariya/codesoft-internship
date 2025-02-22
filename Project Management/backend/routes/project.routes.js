import express from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  updateProject,
} from "../controllers/project.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createProject);
router.get("/", protectRoute, getAllProjects);
router.patch("/update/:id", protectRoute, updateProject);
router.delete("/delete/:id", protectRoute, deleteProject);

export default router;
