import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";

const SliderUtil = ({ data, nbrToShow }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: nbrToShow,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024, // Tablet screen width
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // Mobile screen width
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full px-4">
      <Slider {...settings}>
        {data?.map((movie) => (
          <div className="px-2" key={movie._id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderUtil;
