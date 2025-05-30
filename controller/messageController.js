import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Message } from "../models/messageSchema.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message Sent!",
  });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  // const messages = await Message.find();
  const messages = await Message.find().sort({ createdAt: -1 }); // ✅ Newest first
  res.status(200).json({
    success: true,
    messages,
  });
});


export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const message = await Message.findById(id);

  if (!message) {
    return next(new ErrorHandler("Message not found", 404));
  }

  await message.deleteOne();

  res.status(200).json({
    success: true,
    message: "Message deleted successfully!",
  });
});

export const getUnreadCount = catchAsyncErrors(async (req, res, next) => {
  const count = await Message.countDocuments({ isRead: false });
  res.status(200).json({ success: true, count });
});

export const markAllAsRead = catchAsyncErrors(async (req, res, next) => {
  await Message.updateMany({ isRead: false }, { $set: { isRead: true } });

  res.status(200).json({
    success: true,
    message: "All messages marked as read",
  });
});

