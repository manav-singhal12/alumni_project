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
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">All Users</h1>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((user) => (
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
          <p className="text-center text-gray-500 col-span-3">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Batches;


// import React from 'react';

// const Batches = () => {
//   // Calculate the current year and generate an array for the last 6 years
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="container mx-auto">
//         <h1 className="text-4xl font-bold text-center text-[#004d40] mb-8">
//           Past Batches
//         </h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
