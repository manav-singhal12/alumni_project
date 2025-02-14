import { Message } from "../models/message.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { io } from "../index.js"; // Import the Socket.io instance

// ✅ Send a new message
export const sendMessage = asyncHandler(async (req, res) => {
  console.log("Incoming request body:", req.body);

  const { recipientId, text } = req.body;
  const sender = req.user?._id;

  if (!sender) {
    throw new ApiError(401, "Unauthorized: User not authenticated");
  }

  if (!recipientId || !text) {
    console.error("Missing recipientId or text", { recipientId, text });
    throw new ApiError(400, "Receiver ID and text are required");
  }

  // ✅ Save message to DB
  const newMessage = new Message({ sender, receiver: recipientId, text });
  await newMessage.save();

  // Emit message to recipient in real-time
  io.emit("receiveMessage", newMessage);

  res.status(201).json(newMessage);
});



// ✅ Get messages for a specific user
export const getMessages = asyncHandler(async (req, res) => {
  const { userId } = req.params;  // User we are chatting with
  const currentUserId = req.user?._id; // Logged-in user

  if (!currentUserId) {
    throw new ApiError(401, "Unauthorized: User not authenticated");
  }

  if (!userId) {
    throw new ApiError(400, "User ID is required to fetch messages");
  }

  const messages = await Message.find({
    $or: [
      { sender: currentUserId, receiver: userId },
      { sender: userId, receiver: currentUserId },
    ],
  }).sort({ createdAt: 1 });

  res.status(200).json(messages);
});
