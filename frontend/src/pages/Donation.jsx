import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Buffer } from "buffer"; // ✅ Import Buffer polyfill
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import axios from 'axios';
// import Donation from './pages/Donation.jsx'
// ✅ Ensure Buffer is available globally
if (!window.Buffer) {
  window.Buffer = Buffer;
}

const Donation = () => {


 

  const handleSubmit = (e) => {
    e.preventDefault();
    // donation submission 
    // alert('Thank you for your donation!');
    // ('/thankyou');
  };

  const [paymentMethod, setPaymentMethod] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);

  const navigate = useNavigate();

  const network = "https://api.devnet.solana.com";
  const connection = new Connection(network);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const connectWallet = async () => {
    try {
      if (!window.solana) {
        alert("Solana wallet not found! Please install Phantom Wallet.");
        return;
      }
      const response = await window.solana.connect();
      setWallet(response);
      setWalletAddress(response.publicKey.toString());
      setStatus("Wallet Connected!");
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  const sendSol = async () => {
    if (!wallet) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setStatus("Amount must be greater than 0!");
      return;
    }

    const receiverAddress = import.meta.env.VITE_SOLANA_RECEIVER_ADDRESS;
    if (!receiverAddress) {
      setStatus("Receiver address is not set!");
      console.error("Error: SOLANA_RECEIVER_ADDRESS is not defined in .env file.");
      return;
    }

    const destPubkey = new PublicKey(receiverAddress);
    const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

    try {
      const balance = await connection.getBalance(wallet.publicKey);
      console.log("Wallet balance:", balance / LAMPORTS_PER_SOL, "SOL");

      if (balance < lamports) {
        setStatus("Insufficient balance!");
        return;
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: destPubkey,
          lamports,
        })
      );

      transaction.feePayer = wallet.publicKey;
      let { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      const signature = await window.solana.signAndSendTransaction(transaction);
      await connection.confirmTransaction(signature);

      console.log("Transaction Successful! Signature:", signature);
      // navigate('/donations'); 

      // setStatus(`Transaction Successful! Tx Hash: ${ellipsizeAddress(signature)}`); // ✅ Now this will work
    } catch (error) {
      console.error("Transaction Failed:", error);
      alert('Transaction Failed');  
      setStatus("Transaction Failed!");
    }
  };

  const createRazorpayOrder = (amount) => {
    let data = JSON.stringify({ amount: amount * 100, currency: "INR" });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5230/orders",
      headers: { 'Content-Type': 'application/json' },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        handleRazorpayScreen(response.data.amount);
      })
      .catch((error) => {
        console.log("error at", error);
      });
  };
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Error loading Razorpay checkout.");
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
    if (!razorpayKey) {
      console.error("Razorpay Key is missing in .env file");
      setStatus("Razorpay Key is not set!");
      return;
    }

    const options = {
      key: razorpayKey,
      amount: amount, // Convert to paise
      currency: "INR",
      name: "Student Name",
      description: "Payment for donation",
      image: "https://your-logo-url.com/logo.png",
      handler: function (response) {
        setResponseId(response.razorpay_payment_id);
        console.log("Payment successful! ID:", response.razorpay_payment_id);
      },
      prefill: {
        name: name,
        email: email
      },
      theme: { color: "#F4C430" }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    // navigate('/donations'); 

  };

  return (
    <div >
      <div className="min-h-screen flex items-center justify-center bg-[#e0f2f1] p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
          <h2 className="text-2xl font-bold text-[#004d40] mb-4 text-center">
            Support Our Alumni Association
          </h2>
          <p className="mb-6 text-center">
            Your donation will help us continue our mission and support alumni activities.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="name" className="mt-4 font-semibold text-[#004d40]">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name} onChange={(e) => setName(e.target.value)}
              className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
            />

            {/* <label htmlFor="email" className="mt-4 font-semibold text-[#004d40]">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
            /> */}

            <label htmlFor="Amount" className="mt-4 font-semibold text-[#004d40]">Donation Amount</label>
            <input
              type="number"
              id="Amount"
              name="Amount"
              required
              value={amount} onChange={(e) => setAmount(e.target.value)}
              className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
            />

            <label htmlFor="payment-method" className="mt-4 font-semibold text-[#004d40]">Payment Method</label>
            <select id="payment-method"
              name="payment-method"
              required className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]" value={paymentMethod} onChange={handlePaymentMethodChange}>
              <option value="">Select Payment Method</option>
              <option value="Solana">Solana</option>
              <option value="Razorpay">Razorpay</option>
            </select>

            {paymentMethod === "Solana" && (
              <div className="flex justify-center items-center">
                <button type="button" className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]" onClick={connectWallet}>
                  {wallet ? "Connected" : "Connect Wallet"}
                </button>
                {/* {wallet && <p>Wallet: {walletAddress}</p>} */}
                {/* <input type="number" placeholder="Sol to send" value={quantity} onChange={(e) => setQuantity(e.target.value)} /> */}
                {/* <button type="button" onClick={sendSol}>Send SOL</button> */}
                {/* <p>{status}</p> */}
              </div>
            )}
            <button
              type="submit"
              className="mt-6 p-3 bg-[#004d40] text-white font-semibold rounded-lg hover:bg-[#00796b] transition transform hover:-translate-y-1"
              onClick={(e) => {
                e.preventDefault();

                if (paymentMethod === "Razorpay") {
                  if (!amount || parseFloat(amount) <= 100) {
                    alert("For Razorpay, the minimum donation amount must be greater than 100 INR.");
                    return;
                  }
                  createRazorpayOrder(amount);
                } else if (paymentMethod === "Solana") {
                  if (!amount || parseFloat(amount) < 0.01) {
                    alert("For Solana, the minimum donation amount must be at least 0.01 SOL.");
                    return;
                  }
                  sendSol();
                } else {
                  alert("Please select a payment method.");
                }
              }}
            >
              Donate Now
            </button>

          </form>
        </div>
      </div>


    </div>
  );
};

export default Donation;
