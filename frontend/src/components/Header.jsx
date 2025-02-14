import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../redux/api/userApiSlice';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { logout } from "../redux/auth/authSlice.js";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Dropdown and mobile menu state
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  // Logout handler (calls the API and then logs out in redux)
  const [logoutApiCall] = useLogoutMutation();
  const LogoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Logout successful");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

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

  // Optional: Animate nav items on load (for both desktop and mobile menus)
  useEffect(() => {
    const navItems = document.querySelectorAll('.animate-nav li');
    navItems.forEach((item, index) => {
      item.style.opacity = 0;
      item.style.transform = 'translateX(-30px)';
      setTimeout(() => {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.opacity = 1;
        item.style.transform = 'translateX(0)';
      }, 100 * index);
    });
  }, [mobileMenuVisible]);

  return (
    <header className="bg-[#004d40] shadow-md">
      {/* Mobile Navigation (visible below sm breakpoint) */}
      <nav className="sm:hidden container mx-auto p-4">
        <div className="flex items-center justify-between">
          {/* Hamburger Icon */}
          <button
            onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuVisible ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
          {/* Brand */}
          <div className="text-white text-xl font-bold">
            Alumni Association
          </div>
          {/* Right: If logged in, show logout button */}
          <div>
            {userInfo && (
              <button
                onClick={LogoutHandler}
                className="text-white font-bold focus:outline-none"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Links */}
        {mobileMenuVisible && (
          <div className="mt-4 bg-[#004d40] rounded shadow-md">
            <ul className="animate-nav flex flex-col space-y-4 p-4">
              <li>
                <NavLink
                  to="/"
                  onClick={() => setMobileMenuVisible(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-50 underline text-lg font-bold transition duration-200"
                      : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/eventposting"
                  onClick={() => setMobileMenuVisible(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-50 underline text-lg font-bold transition duration-200"
                      : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
                  }
                >
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/donation"
                  onClick={() => setMobileMenuVisible(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-50 underline text-lg font-bold transition duration-200"
                      : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
                  }
                >
                  Donation
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/alljobs"
                  onClick={() => setMobileMenuVisible(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-50 underline text-lg font-bold transition duration-200"
                      : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
                  }
                >
                  Jobs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/batches"
                  onClick={() => setMobileMenuVisible(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-50 underline text-lg font-bold transition duration-200"
                      : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
                  }
                >
                  Batches
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/getAllProjects"
                  onClick={() => setMobileMenuVisible(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-50 underline text-lg font-bold transition duration-200"
                      : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
                  }
                >
                  Projects
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Desktop Navigation (visible at sm and above) */}
      <nav className="hidden sm:flex container mx-auto items-center justify-between p-4">
        {/* Left-side Navigation Links */}
        <div className="flex items-center space-x-6 animate-nav">
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
            to="/eventposting"
            className={({ isActive }) =>
              isActive
                ? "text-blue-50 underline text-lg font-bold transition duration-200"
                : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/donation"
            className={({ isActive }) =>
              isActive
                ? "text-blue-50 underline text-lg font-bold transition duration-200"
                : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
            }
          >
            Donation
          </NavLink>
          <NavLink
            to="/alljobs"
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
                    <span className="text-lg text-gray-800">
                      {userInfo.data.user.userName[0]}
                    </span>
                  </div>
                )}
                <span className="hidden sm:block">
                  {userInfo.data.user.userName}
                </span>
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
                          <span className="text-xl text-gray-800">
                            {userInfo.data.user.userName[0]}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">
                          {userInfo.data.user.userName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {userInfo.data.user.email}
                        </p>
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
                          Skills:{" "}
                          {userInfo.data.user.skills && userInfo.data.user.skills.length
                            ? userInfo.data.user.skills.join(", ")
                            : "None"}
                        </p>
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
                        navigate('/update-profile');
                      }}
                      className="w-full text-left px-4 py-2 font-semibold text-gray-800 rounded transition duration-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      Update Profile
                    </button>
                    <button
                      onClick={() => {
                        setDropdownVisible(false);
                        navigate('/dashboard');
                      }}
                      className="w-full text-left px-4 py-2 font-semibold text-gray-800 rounded transition duration-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={LogoutHandler}
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
