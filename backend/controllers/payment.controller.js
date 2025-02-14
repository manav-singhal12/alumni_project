// import { Payment } from "../models/payment.mode.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";

// // ✅ Send a new message
// export const sendPayment = asyncHandler(async (req, res) => {
//   console.log("Incoming request body:", req.body);

//   const { sendername,recipientId,receiveremail,amount,mode } = req.body;
//   const sender = req.user?._id;
  
//   if (!sender) {
//     throw new ApiError(401, "Unauthorized: User not authenticated");
//   }

//   if (!recipientId || !amount || !mode) {
//     console.error("Missing recipientId, amount or mode", { recipientId, amount, mode });
//     throw new ApiError(400, "Receiver ID and text are required");
//   }

//   // ✅ Save message to DB
//   const newPayment = new Payment({ sender,senderName:sendername, receiver: recipientId,receiverEmail:receiveremail, amount, mode });
//   await newPayment.save();

//   // Emit message to recipient in real-time
//   io.emit("receiveMessage", newPayment);

//   res.status(201).json(newPayment);
// });



// // ✅ Get messages for a specific user
// export const getPayments = asyncHandler(async (req, res) => {
//   const { userId } = req.params;  // User we are chatting with
//   const currentUserId = req.user?._id; // Logged-in user

//   if (!currentUserId) {
//     throw new ApiError(401, "Unauthorized: User not authenticated");
//   }

//   if (!userId) {
//     throw new ApiError(400, "User ID is required to fetch messages");
//   }

//   const messages = await Payment.find({
//     $or: [
//       { sender: currentUserId}
//     ],
//   }).sort({ createdAt: 1 });

//   res.status(200).json(messages);
// });
