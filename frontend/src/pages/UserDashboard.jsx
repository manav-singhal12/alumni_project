import { useSelector } from "react-redux";
import { useGetUserQuery } from "../redux/api/userApiSlice.js";

function UserDashboard() {
  const {userInfo} = useSelector(state =>state.auth)
  const { data: user, error, isLoading } = useGetUserQuery();

  if (isLoading) return <p className="text-center text-gray-500">Loading user data...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching user data</p>;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border border-gray-200">
        <img
          src={user?.avatar || "https://via.placeholder.com/150"}
          alt="User Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
        />
        <h2 className="text-2xl font-bold mt-4 text-blue-600">{user?.fullName}</h2>
        <p className="text-gray-700 font-medium">@{user?.userName}</p>
        <p className="text-gray-600 mt-2">{user?.email}</p>
        <p className="text-gray-500">Role: {user?.role}</p>
        <p className="text-gray-500">Batch: {user?.batch}</p>
        <p className="text-gray-500">Education: {user?.education}</p>
        <p className="text-gray-500 mt-2">Skills: {user?.skills}</p>
        <p className="text-gray-500 mt-2">Bio: {user?.bio}</p>
        <p className="text-gray-500 mt-2">Interests: {user?.intrests}</p>
        <div className="flex gap-4 mt-4">
          <a href={user?.linkedin} className="text-blue-500 font-medium" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={user?.github} className="text-gray-800 font-medium" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>

      <div className="mt-10 p-6 bg-blue-100 rounded-lg shadow-md text-center border border-blue-300">
        <h3 className="text-xl font-semibold text-blue-700">Educational Insights</h3>
        <p className="text-gray-600 mt-2">Stay ahead with the latest trends in technology and education. Enhance your skills and keep learning!</p>
      </div>
    </div>
  );
}

export default UserDashboard;
