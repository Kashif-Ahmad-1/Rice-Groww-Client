import React from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="bg-gradient-to-r from-darkRed-600 to-darkRed-800 p-5 shadow-xl flex justify-between items-center w-full">
  {/* Logo */}
  <div className="text-white font-extrabold text-3xl tracking-wider">
    <Link to="/" className="hover:text-yellow-400 transition duration-300 ease-in-out">
      Smart ItBox
    </Link>
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

  {/* Mobile Hamburger Icon */}
  <div className="md:hidden relative">
    <button onClick={toggleSidebar} className="text-white">
      {isSidebarOpen ? (
        <HiX size={30} className="hover:text-yellow-400 transition duration-300" />
      ) : (
        <HiMenu size={30} className="hover:text-yellow-400 transition duration-300" />
      )}
    </button>
  </div>
</header>

  );
};

export default Navbar;
