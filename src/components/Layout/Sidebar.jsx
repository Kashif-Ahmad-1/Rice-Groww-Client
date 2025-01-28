import React, { useState } from "react";
import {
  FaHome,
  FaBox,
  FaUsers,
  FaSignOutAlt,
  FaCaretDown,
  FaListAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [isOrdersOpen, setIsOrdersOpen] = useState(true);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(true);

  const userRole = localStorage.getItem("role");
  console.log(userRole);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-full bg-gray-300 text-white shadow-2xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} w-56`} // Reduced width
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="text-xl font-semibold text-indigo-900">SMART ITBOX</div> {/* Reduced text size */}
        <button
          className="text-gray-400 hover:text-yellow-400 transition duration-300 ease-in-out"
          onClick={toggleSidebar}
        >
          <FaCaretDown size={24} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-6">
        <ul className="space-y-1"> {/* Reduced space between items */}
          <li>
            <button
              onClick={() => handleNavigate("/")}
              className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-700 hover:text-yellow-400 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <FaHome size={18} />
              <span className="text-sm font-medium text-black">Home</span> {/* Reduced text size */}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate("/users")}
              className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-700 hover:text-yellow-400 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <FaUsers size={18} />
              <span className="text-sm font-medium text-black">Users</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate("/clients")}
              className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-700 hover:text-yellow-400 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <FaUsers size={18} />
              <span className="text-sm font-medium text-black">Clients</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate("/items-master")}
              className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-700 hover:text-yellow-400 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <FaListAlt size={18} />
              <span className="text-sm font-medium text-black">Items</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate("/rm-master")}
              className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-700 hover:text-yellow-400 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <FaBox size={18} />
              <span className="text-sm font-medium text-black">RM Master</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate("/riceproduction")}
              className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-700 hover:text-yellow-400 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <FaBox size={18} />
              <span className="text-sm font-medium text-black">Rice Production</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate("/milling/output")}
              className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-700 hover:text-yellow-400 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <FaBox size={18} />
              <span className="text-sm font-medium text-black">Milling Output</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate("/milling/front")}
              className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-700 hover:text-yellow-400 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <FaBox size={18} />
              <span className="text-sm font-medium text-black">Milling Front</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate("/milling/Qclab-report")}
              className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-700 hover:text-yellow-400 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <FaBox size={18} />
              <span className="text-sm font-medium text-black">QC Lab Report</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigate("/milling/sortex/output")}
              className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-700 hover:text-yellow-400 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <FaBox size={18} />
              <span className="text-sm font-medium text-black">Milling Sortex Output</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full px-4 py-4 border-t border-gray-700 text-center">
        <button
          className="flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-700 hover:text-yellow-400 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-105"
          onClick={handleLogout}
        >
          <FaSignOutAlt size={18} />
          <span className="text-sm font-medium text-black">Logout</span> {/* Reduced text size */}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
