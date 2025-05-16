import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main/Main";

const AdminDashboard = () => {
  // State to manage sidebar visibility on mobile screens
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div 
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >
        <Main />
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-purple-600 to-blue-500 
                 rounded-lg text-white shadow-lg hover:opacity-90 transition-opacity duration-200
                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                 focus:ring-offset-[#0a0a0a]"
        onClick={toggleSidebar}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 6h16M4 12h16M4 18h16" 
          />
        </svg>
      </button>
    </div>
  );
};

export default AdminDashboard;

