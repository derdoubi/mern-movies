import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-[#242424] text-white mt-10">
      <aside className="flex flex-col py-4 space-y-6">
        <ul>
          <li className="sidebar-link">
            <Link to="/admin/movies/dashboard" className="block p-2 ml-5">
              Dashboard
            </Link>
          </li>
          <li className="sidebar-link">
            <Link to="/admin/movies/create" className="block p-2 ml-5">
              Create Movie
            </Link>
          </li>
          <li className="sidebar-link">
            <Link to="/admin/movies/genre" className="block p-2 ml-5">
              Create Genre
            </Link>
          </li>
          <li className="sidebar-link">
            <Link to="/admin/movies-list" className="block p-2 ml-5">
              Update Movie
            </Link>
          </li>
          <li className="sidebar-link">
            <Link to="/admin/movies/comments" className="block p-2 ml-5">
              Comments
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
