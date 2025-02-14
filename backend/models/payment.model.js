import mongoose, {Schema} from "mongoose";

const transactionSchema = new mongoose.Schema({
  sender:{type:String},
  senderName: { type: String, required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipientEmail: { type: String, required: true },
  amount: { type: Number, required: true },
  mode: { type: String,  required: true },
  timestamp: { type: Date, default: Date.now }
});

export const Transaction = mongoose.model("Transaction", transactionSchema);

