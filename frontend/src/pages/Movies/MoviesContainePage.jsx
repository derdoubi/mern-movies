import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = newMovies?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="bg-[#121212] text-white py-8 px-4">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-12 space-y-8 lg:space-y-0">
        {/* Genre Selection */}
        <nav className="flex flex-wrap justify-start lg:flex-col md:flex-row gap-4">
          {genres?.map((g) => (
            <button
              key={g._id}
              className={`transition duration-300 ease-in-out hover:bg-gray-700 text-white p-3 rounded-lg text-lg ${
                selectedGenre === g._id ? "bg-teal-500" : "bg-gray-800"
              }`}
              onClick={() => handleGenreClick(g._id)}
            >
              {g.name}
            </button>
          ))}
        </nav>

        {/* Movies Slider Section */}
        <section className="flex flex-col space-y-12 w-full lg:w-3/4">
          {/* Random Movies */}
          <div className="w-full mb-8">
            <h2 className="text-3xl font-bold text-center mb-4">Choose For You</h2>
            <SliderUtil data={randomMovies} />
          </div>

          {/* Top Movies */}
          <div className="w-full mb-8">
            <h2 className="text-3xl font-bold text-center mb-4">Top Movies</h2>
            <SliderUtil data={topMovies} />
          </div>

          {/* Filtered Movies Based on Genre */}
          <div className="w-full mb-8">
            <h2 className="text-3xl font-bold text-center mb-4">
              {selectedGenre ? "Filtered Movies" : "Choose Movie"}
            </h2>
            <SliderUtil data={filteredMovies} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MoviesContainerPage;

