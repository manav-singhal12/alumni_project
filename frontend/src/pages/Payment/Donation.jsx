import React, { useState } from "react";
import { useSendPaymentMutation } from "../../redux/api/Payment.ApiSlice";


const Donation = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("bank-transfer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [sendPayment , {isLoading}] = useSendPaymentMutation();


  const handleSubmit =async (e) => {
    e.preventDefault();


    setIsSubmitting(true);


    const paymentForm = {
        recipientEmail,
        amount,
        mode
    }

    const result = await sendPayment(paymentForm).unwrap();
    if(result){
        alert("success")
    }
    // // Simulate API call or payment processing
    // setTimeout(() => {
    //   alert(`Success! $${amount} sent to ${recipientEmail} via ${mode}.`);
    //   setIsSubmitting(false);
    //   setRecipientEmail("");
    //   setAmount("");
    //   setMode("bank-transfer");
    // }, 2000);



  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          💸 Send Money
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recipient Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Email
            </label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="Enter recipient's email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Amount Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Payment Mode Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Mode
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="bank-transfer">Bank Transfer</option>
              <option value="Credit-Card">Credit-Card</option>
              <option value="Bank-Transfer">Bank-Transfer</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Money"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donation;