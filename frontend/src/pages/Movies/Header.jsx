import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <header className="bg-[#121212] text-white px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center md:items-start gap-8">
        {/* Navigation */}
        <nav className="w-full md:w-48 flex flex-col space-y-3">
          <Link
            to="/"
            className="text-lg font-medium bg-[#1F1F1F] hover:bg-red-600 transition-colors p-3 rounded shadow"
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="text-lg font-medium bg-[#1F1F1F] hover:bg-red-600 transition-colors p-3 rounded shadow"
          >
            Browse Movies
          </Link>
        </nav>

        {/* Slider */}
        <div className="w-full md:flex-1">
          <SliderUtil data={data} />
        </div>
      </div>
    </header>
  );
};

export default Header;
