import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Batches = () => {
  const [users, setUsers] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null); // Track selected batch
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5230/api/users");
        const data = await response.json();
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Group users by batch
  const batches = users.reduce((acc, user) => {
    const batch = user.batch || "Unknown Batch"; // Default to "Unknown Batch" if no batch
    if (!acc[batch]) {
      acc[batch] = [];
    }
    acc[batch].push(user);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">All Users</h1>
      
      {/* Display Batches */}
      <div className="max-w-4xl mx-auto mb-6">
        <h2 className="text-xl font-semibold mb-4">Select a Batch:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.keys(batches).map((batch) => (
            <button
              key={batch}
              onClick={() => setSelectedBatch(batch)}
              className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-800 transition"
            >
              {batch}
            </button>
          ))}
        </div>
      </div>

      {/* Display Users for Selected Batch */}
      {selectedBatch && (
        <>
          <h2 className="text-2xl font-semibold text-center mb-4">{selectedBatch} Users</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {batches[selectedBatch].length > 0 ? (
              batches[selectedBatch].map((user) => (
                <div key={user._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                  <img 
                    src={user.avatar || "/default-avatar.png"} 
                    alt={user.username} 
                    className="w-16 h-16 rounded-full border-2 border-gray-300 mb-3"
                  />
                  <h2 className="text-lg font-semibold">{user.username}</h2>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <button
                    onClick={() => navigate(`/chat/${user._id}`)}
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Chat
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3">No users found in this batch.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Batches;
