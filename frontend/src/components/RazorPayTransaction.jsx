import React, { useState } from 'react';
import { useSendPaymentMutation } from '../redux/api/Payment.ApiSlice';
const RazorpayTransaction = () => {
  const [responseId, setResponseId] = useState("");

  // Function to dynamically load Razorpay script
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
const [recipientEmail, setRecipientEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("bank-transfer");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [sendPayment , {isLoading}] = useSendPaymentMutation();


  const handleSubmit =async (e) => {
    e.preventDefault();

    handleRazorpayScreen(amount);
    setIsSubmitting(true);


    const paymentForm = {
        recipientEmail,
        amount,
        "mode":"Razorpay"
    }

    const result = await sendPayment(paymentForm).unwrap();
    };
  // Function to trigger Razorpay payment
  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Failed to load Razorpay. Check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_VujczZmFh8s9fk",  // Replace with your Razorpay Test Key
      amount: amount * 100,  // Convert to paise
      currency: 'INR',
      name: "Student Name",
      description: "Payment for services",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxtW1ODLecvWHGx0FoDMXYuHwHNlBaDVsIcA&s",
      order_id: "", // Not using backend, so leave blank (Razorpay will generate an order)
      handler: function (response) {
        setResponseId(response.razorpay_payment_id);
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "Student Name",
        email: "rollno@gmail.com",
      },
      theme: {
        color: "#F4C430",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="App">
      {/* <button onClick={() => handleRazorpayScreen(100)}>Pay ₹100</button>
      {responseId && <p>Transaction ID: {responseId}</p>} */}
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
          {/* <div>
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
          </div> */}

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
    </div>
  );
};

export default RazorpayTransaction;
