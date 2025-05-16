import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const sidebarLinks = [
    { path: "/admin/movies/dashboard", label: "Dashboard" },
    { path: "/admin/movies/create", label: "Create Movie" },
    { path: "/admin/movies/genre", label: "Create Genre" },
    { path: "/admin/movies-list", label: "Update Movie" },
    { path: "/admin/movies/comments", label: "Comments" },
  ];

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-[#1a1a1a] border-r border-white/10 backdrop-blur-sm
                transition-all duration-300 z-40 ${isOpen ? "w-64" : "w-0 lg:w-64"}`}
    >
      <div className="flex flex-col h-full">
        {/* Logo/Header */}
        <div className="h-16 flex items-center justify-center border-b border-white/10">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            Admin Dashboard
          </h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-4">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200
                            ${isActiveRoute(link.path)
                              ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg"
                              : "text-gray-400 hover:bg-white/5"
                            }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
