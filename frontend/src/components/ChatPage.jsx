// src/pages/ChatPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5230", { withCredentials: true });

const ChatPage = () => {
  const { userId } = useParams(); // Recipient ID
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const[receiverName,setReceiverName]=useState('');
  const messagesEndRef = useRef(null);
  useEffect(() => {
    getCurrentUser();
    fetchMessages();
    getReceivertUser();

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
        "http://localhost:5230/api/v1/users/getCurrentUser",
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
  const getReceivertUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5230/api/v1/users/getReceiverUser`,
        { withCredentials: true }
      );
      console.log("Receiver User Data:", response.data);
      setReceiverName(response.data.data.username);
    } catch (error) {
      console.error("Error fetching receiver user:", error.response?.data || error.message);
    }
  };
  
  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5230/api/messages/${userId}`,
        { withCredentials: true }
      );
      console.log("Fetched Messages:", response.data);
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
        "http://localhost:5230/api/messages",
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
    <div className="h-screen bg-[#ecf6f5] flex flex-col p-4">
      {/* Chat Box Covering the Entire Screen */}
      <div className="flex flex-col flex-1">
        {/* Online Status */}
        <span className="text-lg font-bold mb-2">Chat with {receiverName}</span>
        <div className="mb-2 flex gap-2">
          <span className="font-semibold">Status:</span>
          {onlineUsers.includes(userId) ? (
            <span className="text-green-500 font-bold">Online</span>
          ) : (
            <span className="text-gray-500">Offline</span>
          )}
        </div>
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-3 border-b flex flex-col">
          {messages.map((msg) => {
            const isSentByCurrentUser = msg.sender === currentUserId;
            return (
              <div key={msg._id} className="mb-4 flex flex-col">
                <div
                  className={`p-2 rounded-md max-w-xs ${
                    isSentByCurrentUser
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-200 text-black self-start"
                  }`}
                >
                  {msg.text}
                </div>
                <div
                  className={`text-xs text-gray-500 mt-1 ${
                    isSentByCurrentUser ? "self-end" : "self-start"
                  }`}
                >
                  {formatTimestamp(msg.timestamp)}
                </div>
              </div>
            );
          })}
          {isTyping && (
            <div className="self-start">
              <div className="p-2 rounded-md bg-gray-200 text-black inline-block">
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Input Field Always at Bottom */}
      <div className="mt-3">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border rounded-md"
            placeholder="Type a message..."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              } else {
                socket.emit("typing", { senderId: currentUserId });
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
