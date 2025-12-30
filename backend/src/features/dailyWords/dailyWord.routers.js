import express from "express";
import authMiddleware from "../../shared/middlewares/auth.middleware.js";
import { getDailyWordController } from "./dailyWord.controller.js";

const router = express.Router();
router.get("/", authMiddleware, getDailyWordController);
export default router;
