import express from "express";
import authRoutes from "../features/auth/auth.routers.js";
import tasksRoutes from "../features/tasks/tasks.routers.js";
import usersRoutes from "../features/users/users.routers.js";
import dailyWorldRoutes from "../features/dailyWords/dailyWord.routers.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tasks", tasksRoutes);
router.use("/users", usersRoutes);
router.use("/daily-words", dailyWorldRoutes);
export default router;
