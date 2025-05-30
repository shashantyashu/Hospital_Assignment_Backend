import express from "express";
import {
  getAllMessages,
  sendMessage,
  deleteMessage,
  getUnreadCount,
  markAllAsRead,
} from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";
import { Message } from "../models/messageSchema.js";

const router = express.Router();


router.post("/send", sendMessage);
router.get("/getall", isAdminAuthenticated, getAllMessages);
router.delete("/delete/:id", isAdminAuthenticated, deleteMessage);
router.get("/unread-count", isAdminAuthenticated, getUnreadCount);
router.put("/mark-all-read", isAdminAuthenticated, markAllAsRead);

router.put("/mark-unread/:id", isAdminAuthenticated, async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) return res.status(404).json({ success: false, message: "Message not found" });

  message.isRead = false;
  await message.save();

  res.status(200).json({ success: true, message: "Marked as unread" });
});

router.put("/mark-read-toggle/:id", isAdminAuthenticated, async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) return res.status(404).json({ success: false, message: "Message not found" });

  message.isRead = !message.isRead; // toggle
  await message.save();

  res.status(200).json({ success: true, message: "Toggled read status", isRead: message.isRead });
});





export default router;
