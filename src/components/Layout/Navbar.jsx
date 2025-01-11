import React from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 shadow-lg flex justify-between items-center">
      {/* Logo */}
      <div className="text-white font-bold text-2xl">
        <Link to="/" className="hover:text-yellow-300 transition duration-300 ease-in-out">
          Smart ItBox
        </Link>
      </div>

      {/* Navbar Links (Desktop View) */}
      <nav className="hidden md:flex space-x-8 text-white">
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-300 transition duration-300 ease-in-out"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className="hover:text-yellow-300 transition duration-300 ease-in-out"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/clients"
              className="hover:text-yellow-300 transition duration-300 ease-in-out"
            >
              Clients
            </Link>
          </li>
          <li>
            <Link
              to="/items-master"
              className="hover:text-yellow-300 transition duration-300 ease-in-out"
            >
              Items
            </Link>
          </li>
          <li>
            <Link
              to="/rm-master"
              className="hover:text-yellow-300 transition duration-300 ease-in-out"
            >
              RM Master
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden relative">
        <button onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <HiX size={30} className="text-white" />
          ) : (
            <HiMenu size={30} className="text-white" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
