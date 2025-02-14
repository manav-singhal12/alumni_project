
import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})

// import dotenv from "dotenv";

import Razorpay from "razorpay";
import connectDB from "./config/Database.js";
import { app } from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import userRoutes from './routes/user.routes.js';
dotenv.config({ path: "../.env" });
import cors from "cors";
// Initialize the HTTP Server and Socket.io
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://alumni-project-qwg6.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  }
});



// Export `io` so it can be used in other files
export { io };

// Store online users
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("userConnected", (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit("updateOnlineUsers", Array.from(onlineUsers.keys()));
  });

  socket.on("sendMessage", (message) => {
    console.log("Message received:", message);
    const recipientSocketId = onlineUsers.get(message.receiver);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receiveMessage", message);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    io.emit("updateOnlineUsers", Array.from(onlineUsers.keys()));
  });
});



// Export `io` so it can be used in other files
// export { io };

// // Store online users
// const onlineUsers = new Map();

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on("userConnected", (userId) => {
//     onlineUsers.set(userId, socket.id);
//     io.emit("updateOnlineUsers", Array.from(onlineUsers.keys()));
//   });

//   socket.on("sendMessage", (message) => {
//     console.log("Message received:", message);
//     const recipientSocketId = onlineUsers.get(message.receiver);
//     if (recipientSocketId) {
//       io.to(recipientSocketId).emit("receiveMessage", message);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//     for (let [userId, socketId] of onlineUsers.entries()) {
//       if (socketId === socket.id) {
//         onlineUsers.delete(userId);
//         break;
//       }
//     }
//     io.emit("updateOnlineUsers", Array.from(onlineUsers.keys()));
//   });
// });


// Connect to MongoDB and Start Server
connectDB()
  .then(() => {
    server.listen(process.env.PORT || 7000, () => {
      console.log(`Server running on port ${process.env.PORT || 7000}`);
    });

    server.on("error", (error) => {
      console.error("Server error:", error);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

//Razorpay Payment
app.get('/', (req, res) => {
    res.send("Hello World!");
})
console.log("RAZORPAY_KEY:", process.env.RAZORPAY_KEY);
console.log("RAZORPAY_SECRET:", process.env.RAZORPAY_SECRET);

// console.log(process.env.RAZORPAY_KEY)
app.post('/orders', async(req, res) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
    })

    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: "receipt#1",
        payment_capture: 1
    }

    try {
        const response = await razorpay.orders.create(options)

        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        res.status(500).send("Internal server error")
    }
})


app.get("/payment/:paymentId", async(req, res) => {
    const {paymentId} = req.params;

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
    })
    
    try {
        const payment = await razorpay.payments.fetch(paymentId)

        if (!payment){
            return res.status(500).json("Error at razorpay loading")
        }

        res.json({
            status: payment.status,
            method: payment.method,
            amount: payment.amount,
            currency: payment.currency
        })
    } catch(error) {
        res.status(500).json("failed to fetch")
    }
})
// app.listen(port, () => {
//     console.log(`server is running on ${port}`);
// })

app.use("/api", userRoutes);