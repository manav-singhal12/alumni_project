import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../redux/api/userApiSlice';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { logout } from "../redux/auth/authSlice.js";

const Header = () => {
    const {userInfo} = useSelector(state=>state.auth)
    

  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
 


  const dispatch = useDispatch()
//   console.log()
  
//   console.log( "the user information is " , userInfo)
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };


  const [logoutApiCall] = useLogoutMutation();


const LogoutHandler = async()=>{
  
    await logoutApiCall().unwrap();
    dispatch(logout());
      toast.success(" logout success")
          navigate("/");



}



  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Optional: Animate nav items on load
  useEffect(() => {
    const navItems = document.querySelectorAll('nav ul li');
    navItems.forEach((item, index) => {
      item.style.opacity = 0;
      item.style.transform = 'translateX(-30px)';
      setTimeout(() => {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.opacity = 1;
        item.style.transform = 'translateX(0)';
      }, 100 * index);
    });
  }, []);

  return (
    <header className="bg-[#004d40]">
      <nav className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Left-side Navigation */}
        <div className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-50 underline text-lg font-bold transition duration-200"
                : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="eventposting"
            className={({ isActive }) =>
              isActive
                ? "text-blue-50 underline text-lg font-bold transition duration-200"
                : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
            }
          >
            Events
          </NavLink>
          <NavLink
            to="donation"
            className={({ isActive }) =>
              isActive
                ? "text-blue-50 underline text-lg font-bold transition duration-200"
                : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
            }
          >
            Donation
          </NavLink>
          <NavLink
            to="alljobs"
            className={({ isActive }) =>
              isActive
                ? "text-blue-50 underline text-lg font-bold transition duration-200"
                : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
            }
          >
            Jobs
          </NavLink>
         
         
          <NavLink
            to="/batches"
            className={({ isActive }) =>
              isActive
                ? "text-blue-50 underline text-lg font-bold transition duration-200"
                : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
            }
          >
            Batches
          </NavLink>

          <NavLink
            to="/getAllProjects"
            className={({ isActive }) =>
              isActive
                ? "text-blue-50 underline text-lg font-bold transition duration-200"
                : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
            }
          >
          Projects
          </NavLink>

        </div>

        {/* Right-side Authentication/Profile */}
        <div className="flex items-center">
          {!userInfo ? (
            <div className="flex space-x-4">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-600 text-white text-lg font-bold rounded-md px-4 py-2 transition duration-200 hover:bg-blue-50 hover:text-blue-700"
                    : "bg-blue-600 text-white text-lg font-bold rounded-md px-4 py-2 transition duration-200 hover:bg-blue-50 hover:text-blue-700"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-600 text-white text-lg font-bold rounded-md px-4 py-2 transition duration-200 hover:bg-blue-50 hover:text-blue-700"
                    : "bg-blue-600 text-white text-lg font-bold rounded-md px-4 py-2 transition duration-200 hover:bg-blue-50 hover:text-blue-700"
                }
              >
                Register
              </NavLink>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 text-white focus:outline-none"
              >
                {userInfo.data.user.avatar ? (
                  <img
                    src={userInfo.data.user.avatar}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-lg text-gray-800">{userInfo.data.user.userName}</span>
                  </div>
                )}
                <span className="hidden sm:block">{userInfo.data.user.userName}</span>
              </button>
              {dropdownVisible && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-20 transition transform origin-top-right"
                >
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      {userInfo.data.user.avatar ? (
                        <img
                          src={userInfo.data.user.avatar}
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-xl text-gray-800">{userInfo.data.user.userName}</span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{userInfo.data.user.userName}</h3>
                        <p className="text-sm text-gray-600">{userInfo.email}</p>
                      </div>
                    </div>
                    {userInfo.data.user.role && (
                      <p className="mt-2 text-sm text-gray-600 capitalize">
                        Role: {userInfo.data.user.role}
                      </p>
                    )}
                    {userInfo.data.user.role === 'student' && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          Skills: {userInfo.data.user.skills && userInfo.data.user.skills.length ? userInfo.data.user.skills.join(', ') : 'None'}
                        </p>
                        {userInfo.interestedDomain && (
                          <p className="text-sm text-gray-600">
                            Interested Domain: {userInfo.interestedDomain}
                          </p>
                        )}
                      </div>
                    )}
                    {userInfo.data.user.role === 'alumni' && (
                      <div className="mt-2">
                        {userInfo.data.user.skills && (
                          <p className="text-sm text-gray-600">
                            Tech Stack: {userInfo.data.user.skills}
                          </p>
                        )}
                        {userInfo.data.user.company && (
                          <p className="text-sm text-gray-600">
                            Company: {userInfo.data.user.company}
                          </p>
                        )}
                      </div>
                    )}
                  </div>


                  <div className="p-4 space-y-2">

                    <button
                      onClick={() => {
                        setDropdownVisible(false);
                        navigate('getCurrentUser');
                      }}
                      className="w-full text-left px-4 py-2 font-semibold text-gray-800 rounded transition duration-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      Update Profile
                    </button>

                    <button
                      onClick={ LogoutHandler}
                      className="w-full text-left px-4 py-2 font-semibold text-gray-800 rounded transition duration-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      Logout
                    </button>

                  </div>


                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;





