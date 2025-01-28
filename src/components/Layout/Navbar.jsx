import React from "react";
import { FaBars } from "react-icons/fa";
import logo from './../images/logo.png';

const Navbar = ({ toggleSidebar }) => {
  return (
    <div>
      <nav className="flex items-center justify-between p-4 mt-0 bg-[#880000] shadow-lg">
        {/* Left Section: Hamburger Menu for Sidebar */}
        <button
          className="p-2 rounded-md text-white hover:bg-indigo-700 transition-colors duration-300"
          onClick={toggleSidebar}
        >
          <FaBars className="text-2xl" />
        </button>

        {/* Right Section: Logo and Company Name */}
        <div className="flex items-center space-x-4 ml-4">
         
          {/* Company Name */}
          <div className="text-2xl font-extrabold tracking-tight text-white">
            <span className="text-white text-2xl font-serif">VEER </span>
            <span className="text-white font-sans">OVERSEAS PVT. LTD.</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
