import React, { useState } from 'react';

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
      <button onClick={() => handleRazorpayScreen(100)}>Pay ₹100</button>
      {responseId && <p>Transaction ID: {responseId}</p>}
    </div>
  );
};

export default RazorpayTransaction;
