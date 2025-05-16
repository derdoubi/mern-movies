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
    <div className="min-h-screen pt-16 bg-[#0a0a0a]">
      {/* Hero Banner Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={banner}
            alt="Movies Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/60 to-[#0a0a0a]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg tracking-wide">
              The Movies Hub
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 drop-shadow-md">
              Cinematic Odyssey: Unveiling the Magic of Movies
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 -mt-20 relative z-20">
        {/* Search and Filters */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-white/10 backdrop-blur-lg shadow-xl mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Search Input */}
            <div className="lg:w-1/3">
              <input
                type="text"
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Search for a movie..."
                value={moviesFilter.searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Filters */}
            <div className="flex-1 flex flex-col sm:flex-row gap-4">
              <select
                className="flex-1 px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                value={moviesFilter.selectedGenre}
                onChange={(e) => handleGenreClick(e.target.value)}
              >
                <option value="">All Genres</option>
                {genres?.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </select>

              <select
                className="flex-1 px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                value={moviesFilter.selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
              >
                <option value="">All Years</option>
                {uniqueYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <select
                className="flex-1 px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 pb-16">
          {filteredMovies?.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
