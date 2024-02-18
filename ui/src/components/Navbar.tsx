import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import { logUserOut } from "../slices/authSlice";

import logo from "../images/logo-white.png";

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const { id } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logUserOut());
  };

  const navVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <div className="bg-black text-white px-4 py-3">
      {/* Desktop Menu */}
      <div className="hidden md:flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:underline flex items-center gap-2">
            <img src={logo} className="h-8 w-8 rounded-full" />
            Lifestyle Blogs
          </Link>
        </div>
        <div className="flex space-x-4">
          {id ? (
            <>
              <button onClick={() => handleLogout()}>Logout</button>
              <Link to="/account" className="hover:underline">
                My Account
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden flex justify-between items-center">
        <Link to="/" className="hover:underline flex items-center gap-2">
          <img src={logo} className="h-8 w-8 rounded-full" />
          Lifestyle Blogs
        </Link>
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
            <div className="absolute top-0 flex justify-between w-full p-3">
              <Link to="/" className="hover:underline flex items-center gap-2">
                <img src={logo} className="h-8 w-8 rounded-full" />
                Lifestyle Blogs
              </Link>
              <button
                className=" text-white outline-none"
                onClick={() => setIsOpen(false)}
              >
                <FaTimes size={24} />
              </button>
            </div>
            {id ? (
              <>
                <button onClick={() => handleLogout()}>Logout</button>
                <Link to="/account" className="hover:underline">
                  My Account
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
                <Link to="/register" className="hover:underline">
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
