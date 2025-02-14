import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Batches = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5230/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Group users by batch
  const batches = users.reduce((acc, user) => {
    const batch = user.batch || "Unknown Batch";
    if (!acc[batch]) acc[batch] = [];
    acc[batch].push(user);
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 drop-shadow-lg">
        Select a Batch
      </h1>
  
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object.keys(batches).map((batch) => (
          <button
            key={batch}
            onClick={() => navigate(`/batch/${batch}`)}
            className="px-6 py-3 bg-green-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300"
          >
            {batch}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Batches;
