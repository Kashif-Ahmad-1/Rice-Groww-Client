import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Smart ItBox</h2>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-10">
        <ul>
          <li>
            <Link to="/" className="block py-2 px-6 hover:bg-gray-700" onClick={toggleSidebar}>Home</Link>
          </li>
          <li>
            <Link to="/users" className="block py-2 px-6 hover:bg-gray-700" onClick={toggleSidebar}>Users</Link>
          </li>
          <li>
            <Link to="/clients" className="block py-2 px-6 hover:bg-gray-700" onClick={toggleSidebar}>Clients</Link>
          </li>
          <li>
            <Link to="/items-master" className="block py-2 px-6 hover:bg-gray-700" onClick={toggleSidebar}>Items</Link>
          </li>
          <li>
            <Link to="/rm-master" className="block py-2 px-6 hover:bg-gray-700" onClick={toggleSidebar}>RM Master</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
