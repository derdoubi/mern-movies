import React, { useState } from 'react';
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import { MdOutlineLocalMovies } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../redux/api/user';
import { logout } from '../../redux/features/auth/authSlice';

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 to-black/60 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left Links */}
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
          >
            MovieHub
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
            >
              <AiOutlineHome className="text-lg" />
              <span>Home</span>
            </Link>
            <Link
              to="/movies"
              className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
            >
              <MdOutlineLocalMovies className="text-lg" />
              <span>Movies</span>
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-6">
          {userInfo ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                <span>{userInfo.username}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-[#1a1a1a] rounded-lg shadow-xl border border-white/10 overflow-hidden backdrop-blur-lg">
                  {userInfo.isAdmin && (
                    <Link
                      to="/admin/movies/dashboard"
                      className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/10 transition-colors duration-200"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/10 transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/10 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="flex items-center space-x-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                <AiOutlineLogin className="text-lg" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition-opacity duration-200"
              >
                <AiOutlineUserAdd className="text-lg" />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
