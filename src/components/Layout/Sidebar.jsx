import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineHome, HiOutlineUser, HiOutlineUsers, HiOutlineClipboardList, HiOutlineArchive, HiOutlineX } from "react-icons/hi";
import logo from './../images/logo.png'
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 bg-gray-300 text-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        {/* Logo (replace with your logo image) */}
        <img src={logo} className="w-64"/>
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-yellow-400 transition duration-300 ease-in-out"
        >
          <HiOutlineX size={28} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-12">
  <ul className="space-y-4">
    <li>
      <Link
        to="/"
        className="flex items-center gap-5 px-6 py-4 text-black hover:bg-gray-700 hover:text-yellow-400 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={toggleSidebar}
      >
        <HiOutlineHome size={22} className="text-black" />
        <span className="text-lg font-medium text-black">Home</span>
      </Link>
    </li>
    <li>
      <Link
        to="/users"
        className="flex items-center gap-5 px-6 py-4 text-black hover:bg-gray-700 hover:text-yellow-400 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={toggleSidebar}
      >
        <HiOutlineUsers size={22} className="text-black" />
        <span className="text-lg font-medium text-black">Users</span>
      </Link>
    </li>
    <li>
      <Link
        to="/clients"
        className="flex items-center gap-5 px-6 py-4 text-black hover:bg-gray-700 hover:text-yellow-400 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={toggleSidebar}
      >
        <HiOutlineUser size={22} className="text-black" />
        <span className="text-lg font-medium text-black">Clients</span>
      </Link>
    </li>
    <li>
      <Link
        to="/items-master"
        className="flex items-center gap-5 px-6 py-4 text-black hover:bg-gray-700 hover:text-yellow-400 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={toggleSidebar}
      >
        <HiOutlineClipboardList size={22} className="text-black" />
        <span className="text-lg font-medium text-black">Items</span>
      </Link>
    </li>
    <li>
      <Link
        to="/rm-master"
        className="flex items-center gap-5 px-6 py-4 text-black hover:bg-gray-700 hover:text-yellow-400 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={toggleSidebar}
      >
        <HiOutlineArchive size={22} className="text-black" />
        <span className="text-lg font-medium text-black">RM Master</span>
      </Link>
    </li>
  </ul>
</nav>


      {/* Footer */}
      <div className="absolute bottom-0 w-full px-6 py-6 border-t border-gray-700 text-center">
        <p className="text-gray-500 text-sm">
          © 2025 <span className="text-yellow-400">Smart ItBox</span>. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
