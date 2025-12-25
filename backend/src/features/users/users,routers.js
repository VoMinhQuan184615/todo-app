import express from "express";
import { regeisterUser } from "./users.controller.js";
const router = express.Router();
router.post("/", regeisterUser);
export default router;
