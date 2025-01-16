import React, { useState } from "react";
import Navbar from "./Navbar"; // Import your Navbar component
import Sidebar from "./Sidebar"; // Import your Sidebar component

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Navbar toggleSidebar={toggleSidebar} />

          {/* Main Content Area */}
          <div className="flex-1 p-6 overflow-auto">{children}</div>

          {/* Footer */}
          <footer className="bg-gray-800 text-white p-4 text-center">
            <p className="text-sm">
              © 2025 <span className="text-yellow-400">Smart ItBox</span>. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
