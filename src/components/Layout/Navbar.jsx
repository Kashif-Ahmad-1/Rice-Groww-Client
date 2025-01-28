import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div>
      <nav className="flex items-center justify-between p-4  mt-0" style={{ backgroundColor: '#880000' }}>
        {/* Left Section: Hamburger Menu for Sidebar */}
        <button
          className="p-2 rounded-md text-white hover:bg-indigo-700 transition-colors duration-300"
          onClick={toggleSidebar}
        >
          <FaBars className="text-2xl" />
        </button>

        {/* Center Section: App Title or Logo */}
        <div className="text-2xl font-bold tracking-wide text-white ">
          <span className="text-indigo-100">SMART </span>
          <span className="text-pink-100">ITBOX</span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
