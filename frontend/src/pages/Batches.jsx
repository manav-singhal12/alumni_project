import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Batches = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://alumni-project-3.onrender.com/api/users");
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
    return <div className="text-center text-lg text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-600">Error: {error}</div>;
  }

  if (Object?.keys(batches)?.length === 0) {
    return <div className="text-center text-lg text-gray-700">No batches found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 drop-shadow-lg">
        Select a Batch  
      </h1>
  
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Object?.keys(batches)?.map((batch) => (
          <button
            key={batch}
            onClick={() => navigate(`/batch/${encodeURIComponent(batch)}`)}
            className="px-6 py-3 bg-green-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300"
            aria-label={`Select batch ${batch}`}
          >
            {batch}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Batches;