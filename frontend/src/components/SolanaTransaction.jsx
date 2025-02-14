import React, { useState } from "react";
import { Buffer } from "buffer"; // ✅ Import Buffer polyfill
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

// ✅ Ensure Buffer is available globally
if (!window.Buffer) {
  window.Buffer = Buffer;
}

const SolanaTransaction = () => {
  const [wallet, setWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const network = "https://api.devnet.solana.com";
  const connection = new Connection(network);

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
  console.log(import.meta.env.VITE_SOLANA_RECEIVER_ADDRESS);

  const sendSol = async () => {
    if (!wallet) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!quantity || parseFloat(quantity) <= 0) {
      setStatus("Amount must be greater than 0!");
      return;
    }

    console.log(import.meta.env);
    const receiverAddress = import.meta.env.VITE_SOLANA_RECEIVER_ADDRESS;
    if (!receiverAddress) {
        setStatus("Receiver address is not set!");
        console.error("Error: REACT_APP_SOLANA_RECEIVER_ADDRESS is not defined in .env file.");
        return;
      }
    console.log(receiverAddress);
    const destPubkey = new PublicKey(receiverAddress);
    const lamports = parseFloat(quantity) * LAMPORTS_PER_SOL;

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
      setStatus(`Transaction Successful! Tx Hash: ${ellipsizeAddress(signature)}`);
    } catch (error) {
      console.error("Transaction Failed:", error);
      setStatus("Transaction Failed!");
    }
  };

  const ellipsizeAddress = (str) => {
    return str.length > 35 ? str.substr(0, 8) + "..." + str.substr(str.length - 8) : str;
  };

  return (
    <div style={styles.container}>
      <img style={styles.image} src="https://cryptologos.cc/logos/solana-sol-logo.png?v=024" alt="Solana" />
      <button style={styles.button} onClick={connectWallet}>
        {wallet ? "Connected" : "Connect Wallet"}
      </button>
      {wallet && <p style={styles.walletText}>Wallet: {ellipsizeAddress(walletAddress)}</p>}
      <input
        style={styles.input}
        type="number"
        placeholder="Sol to send"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button style={styles.button} onClick={sendSol}>
        Send SOL
      </button>
      <p style={styles.status}>{status}</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#1e1e2e",
    color: "#fff",
    maxWidth: "400px",
    margin: "0 auto",
  },
  image: {
    width: "80px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px",
    margin: "10px",
    cursor: "pointer",
    backgroundColor: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
  },
  input: {
    padding: "10px",
    margin: "10px",
    border: "1px solid #fff",
    borderRadius: "5px",
    fontSize: "16px",
    textAlign: "center",
  },
  status: {
    marginTop: "10px",
    color: "#facc15",
    fontSize: "14px",
  },
  walletText: {
    fontSize: "14px",
    color: "#4ade80",
  },
};

export default SolanaTransaction;
