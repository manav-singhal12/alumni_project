// src/pages/ChatPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("https://alumni-project-i1qf.onrender.com", { withCredentials: true });

const ChatPage = () => {
  const { userId } = useParams(); // Recipient ID
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [receiverName, setReceiverName] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getCurrentUser();
    fetchMessages();
    getReceiverUser();

    // Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg._id === message._id)) {
          return [...prevMessages, message].sort(
            (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
          );
        }
        return prevMessages;
      });
      scrollToBottom();
    });

    // Listen for online users update
    socket.on("updateOnlineUsers", (users) => {
      setOnlineUsers([...new Set(users)]);
    });

    // Listen for typing event from recipient
    socket.on("typing", (data) => {
      if (data.senderId === userId) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("updateOnlineUsers");
      socket.off("typing");
    };
  }, [userId]);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        "https://alumni-project-i1qf.onrender.com/api/v1/users/getCurrentUser",
        { withCredentials: true }
      );
      setCurrentUserId(response.data.data._id);
      socket.emit("userConnected", response.data.data._id);
    } catch (error) {
      console.error(
        "Error fetching user:",
        error.response?.data || error.message
      );
    }
  };

  const getReceiverUser = async () => {
    try {
      const response = await axios.get(
        "https://alumni-project-i1qf.onrender.com/api/v1/users/getReceiverUser",
        { withCredentials: true }
      );
      setReceiverName(response.data.data.username);
    } catch (error) {
      console.error(
        "Error fetching receiver user:",
        error.response?.data || error.message
      );
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
       ` https://alumni-project-i1qf.onrender.com/api/messages/${userId}`,
        { withCredentials: true }
      );
      setMessages(
        response.data.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        )
      );
      scrollToBottom();
    } catch (error) {
      console.error(
        "Error fetching messages:",
        error.response?.data || error.message
      );
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const messageData = { recipientId: userId, text: newMessage };
      const response = await axios.post(
        "https://alumni-project-i1qf.onrender.com/api/messages",
        messageData,
        { withCredentials: true }
      );
      socket.emit("sendMessage", response.data);
      setNewMessage("");
      fetchMessages();
      scrollToBottom();
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md rounded-b-xl p-4 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Chat with {receiverName}
        </h1>
        <div className="mt-2 sm:mt-0 flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Status:</span>
          {onlineUsers.includes(userId) ? (
            <span className="text-green-500 font-semibold">Online</span>
          ) : (
            <span className="text-gray-500">Offline</span>
          )}
        </div>
      </header>
      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto p-6">
        {messages.map((msg) => {
          const isSentByCurrentUser = msg.sender === currentUserId;
          return (
            <div
              key={msg._id}
              className={`flex mb-4 ${
                isSentByCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs shadow-lg transition transform duration-300 ${
                  isSentByCurrentUser
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                <div className="text-xs text-gray-100 mt-1 text-right">
                  {formatTimestamp(msg.timestamp)}
                </div>
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="p-3 rounded-lg bg-gray-200 text-gray-800 max-w-xs shadow-lg">
              <span className="animate-pulse">Typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      {/* Input Area */}
      <footer className="p-4 bg-white shadow-t mt-auto">
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              } else {
                socket.emit("typing", { senderId: currentUserId });
              }
            }}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;