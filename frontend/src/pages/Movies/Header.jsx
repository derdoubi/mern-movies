import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <header className="bg-[#121212] text-white px-4 py-8">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center md:items-start gap-8">

        {/* Slider */}
        <div className="w-full md:flex-1">
          <SliderUtil data={data} nbrToShow={4} />
        </div>
      </div>
    </header>
  );
};

export default Header;
