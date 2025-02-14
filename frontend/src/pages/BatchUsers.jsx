import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BatchUsers = () => {
  const { batchName } = useParams();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
  // Get logged-in user ID from localStorage
  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://alumni-project-i1qf.onrender.com/api/users');
        const data = await response.json();
        // Filter out the logged-in user
        const filteredUsers = data.filter(user => 
          String(user.batch).toLowerCase() === String(batchName).toLowerCase() &&
          String(user._id) !== String(loggedInUserId)
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    
    fetchUsers();
  }, [batchName, loggedInUserId]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 drop-shadow-md">
        {batchName} Users
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center transition transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <img 
                src={user.avatar || "/default-avatar.png"} 
                alt={user.username} 
                className="w-20 h-20 rounded-full border-4 border-indigo-300 mb-4 transition-transform duration-500 hover:scale-110"
              />
              <h2 className="text-xl font-semibold text-gray-700">{user.username}</h2>
              <p className="text-sm text-gray-500 mb-4">{user.email}</p>
              <button
                onClick={() => navigate(`/chat/${user._id}`)}
                className="mt-auto px-5 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors duration-300 shadow-md"
              >
                Chat
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-3">No users found in this batch.</p>
        )}
      </div>
    </div>
  );
};

export default BatchUsers;