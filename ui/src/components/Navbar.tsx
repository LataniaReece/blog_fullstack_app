import { FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import { logUserOut } from "../slices/authSlice";

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, username } = useSelector(
    (state: RootState) => state.user
  );

  const handleLogout = () => {
    dispatch(logUserOut());
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const userInitial = username?.[0]?.toUpperCase() || "B";

  const navVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <div className="bg-black text-white px-4 py-3">
      {/* Desktop Menu */}
      <div className="hidden md:flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="bg-red-500 h-8 w-8 rounded-full flex items-center justify-center text-xl font-bold">
            {userInitial}
          </div>
          <a href="/my-blogs" className="hover:underline">
            My Blogs
          </a>
        </div>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <button onClick={() => handleLogout()}>Logout</button>
              <a href="/account" className="hover:underline">
                My Account
              </a>
            </>
          ) : (
            <>
              <a href="/login" className="hover:underline">
                Login
              </a>
              <a href="/register" className="hover:underline">
                Register
              </a>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex justify-between items-center">
        <div className="bg-red-500 h-8 w-8 rounded-full flex items-center justify-center text-xl font-bold">
          L
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {/* Hamburger Icon */}
          <div className="flex flex-col space-y-1">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-gray-800 flex flex-col items-center space-y-4 pt-16 z-10"
            initial="closed"
            animate="open"
            exit="closed"
            variants={navVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              className="absolute top-4 right-4 text-white outline-none"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes size={24} />
            </button>
            <a href="/my-blogs" className="hover:underline">
              My Blogs
            </a>
            {isLoggedIn ? (
              <>
                <button onClick={() => handleLogout()}>Logout</button>
                <a href="/account" className="hover:underline">
                  My Account
                </a>
              </>
            ) : (
              <>
                <a href="/login" className="hover:underline">
                  Login
                </a>
                <a href="/register" className="hover:underline">
                  Register
                </a>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
