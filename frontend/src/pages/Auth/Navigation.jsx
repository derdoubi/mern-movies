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
    <nav className="bg-zinc-900 shadow-lg border-b border-zinc-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left Links */}
        <div className="flex items-center space-x-6 text-white text-sm font-medium">
          <Link
            to="/"
            className="flex items-center hover:text-cyan-400 transition"
          >
            <AiOutlineHome className="mr-1 text-lg" />
            Home
          </Link>
          <Link
            to="/movies"
            className="flex items-center hover:text-cyan-400 transition"
          >
            <MdOutlineLocalMovies className="mr-1 text-lg" />
            Movies
          </Link>
        </div>

        {/* Right Side */}
        <div className="relative flex items-center space-x-4 text-white text-sm">
          {userInfo ? (
            <div>
              <button
                onClick={toggleDropdown}
                className="flex items-center hover:text-cyan-400 transition"
              >
                <span className="mr-1">{userInfo.username}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform ${
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
                <ul className="absolute right-0 mt-3 w-48 bg-zinc-800 text-white rounded-md shadow-lg ring-1 ring-zinc-700 animate-fade-in z-50">
                  {userInfo.isAdmin && (
                    <li>
                      <Link
                        to="/admin/movies/dashboard"
                        className="block px-4 py-2 hover:bg-zinc-700"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-zinc-700"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-2 hover:bg-zinc-700"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center hover:text-cyan-400 transition"
              >
                <AiOutlineLogin className="mr-1 text-lg" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center hover:text-cyan-400 transition"
              >
                <AiOutlineUserAdd className="mr-1 text-lg" />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
