import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5230", { withCredentials: true });

const ChatPage = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]); // Messages fetched from DB
  const [newMessage, setNewMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getCurrentUser();
    fetchMessages(); // Fetch messages on component mount

    // Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg._id === message._id)) {
          return [...prevMessages, message].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        }
        return prevMessages;
      });
      scrollToBottom();
    });

    // Listen for online users update
    socket.on("updateOnlineUsers", (users) => {
      setOnlineUsers([...new Set(users)]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("updateOnlineUsers");
    };
  }, [userId]); // Re-run when userId changes

  const getCurrentUser = async () => {
    try {
      const response = await axios.get("http://localhost:5230/api/v1/users/getCurrentUser", {
        withCredentials: true,
      });
      setCurrentUserId(response.data.data._id);
      socket.emit("userConnected", response.data.data._id);
    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error.message);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:5230/api/messages/${userId}`, {
        withCredentials: true,
      });

      console.log("Fetched Messages:", response.data); // Debugging
      setMessages(
        response.data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // Sort messages
      );
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error.response?.data || error.message);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const messageData = { recipientId: userId, text: newMessage };
      const response = await axios.post("http://localhost:5230/api/messages", messageData, {
        withCredentials: true,
      });

      socket.emit("sendMessage", response.data); // Emit message to socket
      setNewMessage(""); // Clear input field
      fetchMessages(); // Re-fetch messages from database to ensure persistence
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  console.log(onlineUsers);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-4">
        {/* Online Users */}
       {/* Online Status */}
<div className="mb-2 flex gap-2">
  <span className="font-semibold">Status:</span>
  {onlineUsers.includes(userId) ? (
    <span className="text-green-500 font-bold">Online</span>
  ) : (
    <span className="text-gray-500">Offline</span>
  )}
</div>


        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-3 border-b flex flex-col">
          {messages.map((msg) => {
            const isSentByCurrentUser = msg.sender === currentUserId;
            return (
              <div
                key={msg._id}
                className={`p-2 my-2 rounded-md max-w-xs ${
                  isSentByCurrentUser
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                {msg.text}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Field */}
        <div className="flex mt-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border rounded-md"
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
