import express from "express";
import { chatWithClient } from "../controllers/aiController.js";

const router = express.Router();

// Public endpoint - no auth required (for website visitors)
router.post("/chat", chatWithClient);

export default router;