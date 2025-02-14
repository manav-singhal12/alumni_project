// src/pages/Batches.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Reusable UserCard component styled similar to your TeamCard UI
const UserCard = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full px-4 md:w-1/2 xl:w-1/4">
      <div className="mx-auto mb-8 w-full max-w-[400px]">
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img
            src={user.avatar || "/default-avatar.png"}
            alt={user.username}
            className="w-full h-64 object-cover"  // Increased image height remains
          />
          <div className="absolute bottom-5 left-0 w-full text-center">
            {/* Reduced box dimensions: decreased horizontal margin and padding */}
            <div className="relative mx-7 overflow-hidden rounded-lg bg-white px-1 py-4">
              <h3 className="text-sm font-semibold text-dark">
                {user.username}
              </h3>
              <p className="text-xs text-body-color">{user.email}</p>
              <button
                onClick={() => navigate(`/chat/${user._id}`)}
                className="mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
              >
                Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    <>

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

    <section className="pb-10 pt-10 bg-[#e0f2f1]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-8 max-w-[510px] text-center">
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark sm:text-4xl md:text-[40px]">
                Connect with Our Alumni
              </h2>
              <p className="text-base text-body-color">
                Chat with our alumni and network with industry professionals.
              </p>
            </div>
          </div>
        </div>

        {/* Grid of User Cards */}
        <div className="-mx-4 flex flex-wrap justify-center">
          {users.length > 0 ? (
            users.map((user) => <UserCard key={user._id} user={user} />)
          ) : (
            <p className="text-center text-gray-500">No users found.</p>
          )}
        </div>
      </div>
    </section>
    </>

  );
};

export default Batches;












// import React from 'react';

// const Batches = () => {
//   // Calculate the current year and generate an array for the last 6 years
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

//   return (
//     <div className="min-h-screen bg-[#e0f2f1] p-4">
//       <div className="container mx-auto">
//         <h1 className="text-4xl font-bold text-center text-[#004d40] mb-8">
//           Past Batches
//         </h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {years.map((year) => (
//             <div
//               key={year}
//               className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
//             >
//               <h2 className="text-2xl font-bold text-[#004d40]">Batch {year}</h2>
//               <p className="text-gray-700 mt-2 text-center">
//                 A glimpse of our alumni from the year {year}. Their journey
//                 began here and continues to inspire future generations.
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Batches;

