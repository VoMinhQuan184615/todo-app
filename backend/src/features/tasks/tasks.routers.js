import express from "express";
import authMiddleware from "../../shared/middlewares/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getTasksByFilter,
  getTaskById,
  getMyLatestTask,
  updateTask,
} from "./tasks.controllers.js";

const router = express.Router();

router.get("/me/latest", authMiddleware, getMyLatestTask);

// General routes
router.get("/", authMiddleware, getTasksByFilter);
router.get("/:id", authMiddleware, getTaskById);

router.post("/", authMiddleware, createTask);

router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
