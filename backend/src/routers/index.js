import express from "express";
import authRoutes from "../features/auth/auth.routers.js";
import tasksRoutes from "../features/tasks/tasks.routers.js";
import usersRoutes from "../features/users/users,routers.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tasks", tasksRoutes);
router.use("/users", usersRoutes);
export default router;
