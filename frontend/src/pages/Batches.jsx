import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Batches.css"; // Import the custom CSS for flip effects

const Batches = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://alumni-project-i1qf.onrender.com/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4 animate-spin"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="text-center">
          <p className="text-red-400 text-2xl mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded shadow transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (Object.keys(batches).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
        <p className="text-white text-xl">No batches found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e0f2f1] f py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-extrabold text-center text-gray-800 mb-12 drop-shadow-lg">
          Select a Batch
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {Object.keys(batches).map((batch) => (
            <div
              key={batch}
              className="group perspective"
              onClick={() => navigate(`/batch/${encodeURIComponent(batch)}`)}
            >
              <div className="relative w-full h-48 transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180 cursor-pointer">
                {/* Front Side */}
                <div className="absolute inset-0 bg-green-300  rounded-2xl shadow-2xl flex items-center justify-center border border-gray-200 backface-hidden">
                  <h2 className="text-2xl font-bold text-gray-800">{batch}</h2>
                </div>rom-blue-50 to-purple-50
                {/* Back Side */}
                <div className="absolute inset-0 bg-gradient-to-r bg-[#0ef2f1] to-indigo-500 rounded-2xl shadow-2xl flex items-center justify-center transform rotate-y-180 backface-hidden">
                  <h2 className="text-2xl font-bold text-white">Explore {batch}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Batches;