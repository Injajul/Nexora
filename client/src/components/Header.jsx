import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { FaSearch, FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Header({ toggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      setIsUserMenuOpen(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) return;
    navigate(`/search-video?q=${encodeURIComponent(trimmedTerm)}`);
    setSearchTerm("");
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Close dropdown if click is outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className="bg-gradient-to-r from-[#0f1e29] via-[#142f44] to-[#0f1e29] p-2 text-gray-100 fixed top-0 z-50 w-full shadow-md"
    >
      <div className="max-w-7xl px-2 sm:px-4 flex items-center justify-between">
        {/* Menu Icon + Logo */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="p-2 rounded-full hover:bg-gray-700 hover:text-amber-400 transition-all duration-200 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          >
            <FaBars className="text-xl sm:text-2xl" />
          </button>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <h1 className="text-4xl font-black uppercase bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_18px_#facc15] tracking-wider">
              Nexora
            </h1>
          </motion.div>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden sm:flex flex-1 mx-2 sm:mx-4 max-w-2xl">
          <form
            onSubmit={handleSearch}
            className="flex rounded-md overflow-hidden border border-gray-700 bg-gray-800 w-full"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search videos by title, tags or category..."
              className="flex-1 px-4 py-2 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 text-gray-900 font-semibold px-4 py-2 transition-all duration-300 hover:scale-[1.05] hover:brightness-110"
            >
              <FaSearch className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Search Bar (Mobile) */}
        <div className="flex sm:hidden flex-1 mx-2">
          <form
            onSubmit={handleSearch}
            className="flex rounded-md overflow-hidden border border-gray-700 bg-gray-800 w-full"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search..."
              className="flex-1 px-4 py-2 bg-transparent text-gray-100 placeholder-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 transition-colors duration-200"
            >
              <FaSearch className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* User Menu */}
        <div className="sm:block relative" ref={dropdownRef}>
          {currentUser ? (
            <>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700 text-gray-100 hover:text-amber-400 focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all duration-200"
              >
                {currentUser.profileImage ? (
                  <img
                    src={currentUser.profileImage}
                    alt={`Profile of ${currentUser.name}`}
                    className="h-10 w-10 rounded-full object-cover"
                    onError={(e) => (e.target.src = "/default-profile.png")}
                  />
                ) : (
                  <FaUserCircle className="h-8 w-8 text-gray-400" />
                )}
                <span className="hidden sm:block text-sm">
                  {currentUser.name}
                </span>
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-gray-900 text-gray-100 rounded-lg shadow-xl py-2 z-50 border border-gray-700"
                  >
                    <Link
                      to="/user-account"
                      className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-amber-400"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Your Account
                    </Link>

                    {currentUser.role !== "creator" && (
                      <Link
                        to="/become-creator"
                        className="block px-4 py-2 text-sm hover:bg-gray-700 hover:text-amber-400"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Become a Creator
                      </Link>
                    )}

                    <button
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 hover:text-red-400"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="inline mr-2" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm px-4 py-2 rounded-md text-gray-100 hover:text-amber-400 hover:bg-gray-700 transition-all duration-200"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
