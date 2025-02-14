// // src/components/Dashboard.jsx
// import React, { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-[#e0f2f1] flex items-center justify-center px-4">
//         <h2 className="text-2xl font-bold text-center">
//           Please log in to view your dashboard.
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#e0f2f1] py-8 px-4">
//       <h2 className="text-3xl font-bold mb-6 text-center">My Dashboard</h2>
//       <div className="bg-white p-6 rounded shadow-lg max-w-6xl mx-auto">
//         {/* Top Section: Image, Name & Email */}
//         <div className="flex flex-col items-center">
//           {user.profilePicture && (
//             <img
//               src={user.profilePicture}
//               alt={user.name}
//               className="w-24 h-24 rounded-full mb-4"
//             />
//           )}
//           <h3 className="text-2xl font-semibold">{user.name}</h3>
//           <p className="text-gray-600 mb-4">{user.email}</p>
//         </div>
//         {/* Details Section */}
//         <div className="mt-4">
//           <div className="space-y-2">
//             <p>
//               <strong>Batch:</strong> {user.batch}
//             </p>
//             <p>
//               <strong>Role:</strong> {user.role}
//             </p>
//             <p>
//               <strong>Education:</strong> {user.education}
//             </p>
//             <p>
//               <strong>Bio:</strong> {user.bio}
//             </p>
//             <p>
//               <strong>LinkedIn:</strong> {user.linkedin}
//             </p>
//             <p>
//               <strong>GitHub:</strong> {user.github}
//             </p>
//             <p>
//               <strong>Skills:</strong>{" "}
//               {user.skills && user.skills.length ? user.skills.join(", ") : "None"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
