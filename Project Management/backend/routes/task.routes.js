import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createTask, getAllTasks, updateTaskStatus } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createTask);
router.get("/:id", protectRoute, getAllTasks);
router.patch("/status/:id", protectRoute, updateTaskStatus);


export default router;
