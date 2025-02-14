import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ Route to send a new message
router.post("/", verifyJWT, sendMessage);

// ✅ Route to get messages for a specific user
router.get("/:userId", verifyJWT, getMessages);

export default router;
