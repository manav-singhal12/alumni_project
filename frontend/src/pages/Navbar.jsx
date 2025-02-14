import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaBriefcase, FaHandshake, FaDonate, FaCalendarAlt, FaProjectDiagram } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/api/userApiSlice.js";
import { logout } from "../redux/auth/authSlice.js";
import { toast } from "react-toastify";

function Navbar() {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const LogoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();

      dispatch(logout());
      toast.success(" logout success")
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen w-60 bg-gray-900 text-white flex flex-col p-4 fixed">
      <h1 className="text-2xl font-bold mb-6">Alumni Network</h1>

      <ul className="space-y-4">
        <li className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
          <Link to="/" className="flex items-center space-x-2">
            <FaHome /> <span>Home</span>
          </Link>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
          <Link to="/batches" className="flex items-center space-x-2">
            <FaUsers /> <span>Batches</span>
          </Link>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
          <Link to="/alljobs" className="flex items-center space-x-2">
            <FaBriefcase /> <span>Jobs</span>
          </Link>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
          <Link to="/collaboration" className="flex items-center space-x-2">
            <FaHandshake /> <span>Collaboration</span>
          </Link>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
          <Link to="/donation" className="flex items-center space-x-2">
            <FaDonate /> <span>Donation</span>
          </Link>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
          <Link to="/getallevents" className="flex items-center space-x-2">
            <FaCalendarAlt /> <span>Events</span>
          </Link>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
          <Link to="/getAllProjects" className="flex items-center space-x-2">
            <FaProjectDiagram /> <span>Projects</span>
          </Link> 
        </li>
        <li className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
          <Link to="/updateProfile" className="flex items-center space-x-2">
            <FaProjectDiagram /> <span>Update Profile</span>
          </Link> 
        </li>

        {/* Show Login or Logout Based on User Authentication */}
        
        {userInfo ? (
          <li className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
            <button onClick={LogoutHandler} className="flex items-center space-x-2">
              <span>Logout</span>
            </button>
          </li>
        ) : (
          <li className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400">
            <Link to="/login" className="flex items-center space-x-2">
              <span>Login</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
