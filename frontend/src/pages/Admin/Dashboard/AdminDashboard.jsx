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
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-0"} transition-all`}>
        <Main />
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <button
        className="lg:hidden fixed top-6 left-6 text-white bg-teal-600 p-2 rounded"
        onClick={toggleSidebar}
      >
        &#9776; {/* Hamburger icon */}
      </button>
    </div>
  );
};

export default AdminDashboard;

