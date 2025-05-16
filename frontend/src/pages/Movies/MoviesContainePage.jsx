import { useState, useEffect } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import MovieCard from "./MovieCard";

const MoviesContainerPage = () => {
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);
  const [displayMovies, setDisplayMovies] = useState({
    top: [],
    new: [],
    recommended: []
  });

  useEffect(() => {
    if (selectedGenre) {
      setDisplayMovies({
        top: topMovies?.filter(movie => movie.genre === selectedGenre) || [],
        new: newMovies?.filter(movie => movie.genre === selectedGenre) || [],
        recommended: randomMovies?.filter(movie => movie.genre === selectedGenre) || []
      });
    } else {
      setDisplayMovies({
        top: topMovies || [],
        new: newMovies || [],
        recommended: randomMovies || []
      });
    }
  }, [selectedGenre, topMovies, newMovies, randomMovies]);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId === selectedGenre ? null : genreId);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        {randomMovies?.[0] && (
          <>
            <div className="absolute inset-0">
              <img
                src={randomMovies[0].image}
                alt={randomMovies[0].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 z-10">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 
                  drop-shadow-lg tracking-wide">{randomMovies[0].name}</h1>
                <p className="text-lg md:text-xl text-gray-200 mb-6 line-clamp-2 
                  drop-shadow-md">{randomMovies[0].detail}</p>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 -mt-20 relative z-20">
        {/* Genre Navigation */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button
              onClick={() => setSelectedGenre(null)}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300
                ${!selectedGenre 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/30' 
                  : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#252525] hover:text-white'
                } backdrop-blur-sm`}
            >
              All Movies
            </button>
            {genres?.map((genre) => (
              <button
                key={genre._id}
                onClick={() => handleGenreClick(genre._id)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300
                  ${selectedGenre === genre._id 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/30' 
                    : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#252525] hover:text-white'
                  } backdrop-blur-sm`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* Movie Sections */}
        <div className="space-y-20">
          {/* Top Movies */}
          {displayMovies.top.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Top Movies
                </h2>
                <div className="h-[2px] flex-grow bg-gradient-to-r from-purple-600 to-blue-500 opacity-50"></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {displayMovies.top.map((movie) => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </div>
            </section>
          )}

          {/* New Releases */}
          {displayMovies.new.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  New Releases
                </h2>
                <div className="h-[2px] flex-grow bg-gradient-to-r from-purple-600 to-blue-500 opacity-50"></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {displayMovies.new.map((movie) => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </div>
            </section>
          )}

          {/* Recommended */}
          {displayMovies.recommended.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Recommended For You
                </h2>
                <div className="h-[2px] flex-grow bg-gradient-to-r from-purple-600 to-blue-500 opacity-50"></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {displayMovies.recommended.map((movie) => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesContainerPage;

