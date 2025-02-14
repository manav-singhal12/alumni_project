import { Transaction } from "../models/payment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/Apiresponse.js";
// import exp from "constants";
import {User} from '../models/user.model.js'


// ✅ Send a new message
const sendPayment = asyncHandler(async (req, res) => {
    try {
      const { recipientEmail, amount, mode } = req.body;
      
      // Validate user authentication
      const sender = req.user?._id;
      const senderName = req.user?.userName;
  
      if (!sender) {
        throw new ApiError(401, "Unauthorized: User not authenticated");
      }
  
      // Validate request body
      if (!recipientEmail || !amount || !mode) {
        console.error("Missing recipientEmail, amount, or mode", { recipientEmail, amount, mode });
        throw new ApiError(400, "Recipient email, amount, and mode are required");
      }
  
      // Find recipient user
      const recipient = await User.findOne({ email: recipientEmail });
      if (!recipient) return res.status(404).json({ message: "Recipient not found" });
  
      // Store transaction in DB
      const transaction = await Transaction.create({
        sender,
        senderName,
        recipientId: recipient._id,
        recipientEmail,
        amount,
        mode
      });
  
      res.status(201).json(new ApiResponse(201, transaction, "Transaction successful"));
    } catch (error) {
      console.error("Transaction error:", error);
      res.status(500).json(new ApiError(500, "Transaction unsuccessful"));
    }
  });
  


 const getPayments = asyncHandler(async (req, res) => {
//   const { userId } = req.params;  // User we are chatting with
  const currentUserId = req.user?._id; // Logged-in user
console.log(currentUserId)
  if (!currentUserId) {
    throw new ApiError(401, "Unauthorized: User not authenticated");
  }

//   if (!userId) {
//     throw new ApiError(400, "User ID is required to fetch messages");
//   }

  const messages = await Transaction.find({
    $or: [
      { sender: currentUserId}  
    ],
  })

  console.log(messages);
  
  if(!messages){
    throw new ApiError(400 , "message not found")
  }
  

  res.status(200).json(new ApiResponse(200 , messages , "messages fetched successfully"));
});


export  {getPayments , sendPayment};