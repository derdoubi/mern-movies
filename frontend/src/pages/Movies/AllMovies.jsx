import { useGetAllMoviesQuery } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import banner from "../../assets/pellicola-cinematografica.png";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredMovies = data.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreClick = (genreId) => {
    const filterByGenre = data.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year) => {
    const filterByYear = data.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;
      default:
        dispatch(setFilteredMovies([]));
        break;
    }
  };

  return (
    <div className="bg-[#121212] text-white py-8">
      {/* Banner Section */}
      <div
        className="relative w-full h-[50vh] bg-cover bg-center mb-12"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-70"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-white">
          <h1 className="text-6xl font-bold mb-4">The Movies Hub</h1>
          <p className="text-xl">Cinematic Odyssey: Unveiling the Magic of Movies</p>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          {/* Search Input */}
          <input
            type="text"
            className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-600 bg-[#1F1F1F] text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Search for a movie"
            value={moviesFilter.searchTerm}
            onChange={handleSearchChange}
          />

          {/* Filters Section */}
          <div className="flex gap-4">
            <select
              className="px-4 py-2 rounded-lg border border-gray-600 bg-[#1F1F1F] text-white"
              value={moviesFilter.selectedGenre}
              onChange={(e) => handleGenreClick(e.target.value)}
            >
              <option value="">Genres</option>
              {genres?.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 rounded-lg border border-gray-600 bg-[#1F1F1F] text-white"
              value={moviesFilter.selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
            >
              <option value="">Year</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 rounded-lg border border-gray-600 bg-[#1F1F1F] text-white"
              value={moviesFilter.selectedSort}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="new">New Movies</option>
              <option value="top">Top Movies</option>
              <option value="random">Random Movies</option>
            </select>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredMovies?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
