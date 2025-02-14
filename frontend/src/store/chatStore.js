import { create } from "zustand";
import axios from "axios";

const useChatStore = create((set) => ({
  messages: [],
  fetchMessages: async (receiverId, token) => {
    try {
      const res = await axios.get(`/api/messages/${receiverId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ messages: res.data.data });
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },
  sendMessage: async (receiverId, message, token) => {
    try {
      await axios.post(
        "/api/messages/send",
        { receiverId, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
}));

export default useChatStore;
