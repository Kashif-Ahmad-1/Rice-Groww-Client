import React from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../images/logo.png";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="bg-gradient-to-r from-darkRed-600 to-darkRed-800 p-5 shadow-xl flex justify-between items-center w-full">
      {/* Hamburger Menu (Left Side) */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="text-white md:hidden">
          {isSidebarOpen ? (
            <HiX size={30} className="hover:text-yellow-400 transition duration-300" />
          ) : (
            <HiMenu size={30} className="hover:text-yellow-400 transition duration-300" />
          )}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-4 text-white font-extrabold text-2xl tracking-wider">
          <img
            src={logo}
            alt="Veer Overseas Ltd."
            className="w-12 h-12 object-contain rounded-full border-4 border-yellow-400 shadow-lg"
          />
          <Link
            to="/"
            className="hover:text-yellow-400 transition duration-300 ease-in-out text-lg"
          >
            VEER OVERSEAS LTD.
          </Link>
        </div>
      </div>

      {/* Navbar Links (Desktop View) */}
      <nav className="hidden md:flex space-x-12 text-white">
        <ul className="flex space-x-12">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-400 transition duration-300 ease-in-out text-lg font-medium transform hover:scale-105"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className="hover:text-yellow-400 transition duration-300 ease-in-out text-lg font-medium transform hover:scale-105"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/clients"
              className="hover:text-yellow-400 transition duration-300 ease-in-out text-lg font-medium transform hover:scale-105"
            >
              Clients
            </Link>
          </li>
          <li>
            <Link
              to="/items-master"
              className="hover:text-yellow-400 transition duration-300 ease-in-out text-lg font-medium transform hover:scale-105"
            >
              Items
            </Link>
          </li>
          <li>
            <Link
              to="/rm-master"
              className="hover:text-yellow-400 transition duration-300 ease-in-out text-lg font-medium transform hover:scale-105"
            >
              RM Master
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
