import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";

const AdminMoviesList = () => {
  const { data: movies, isLoading, error } = useGetAllMoviesQuery();

  if (isLoading) {
    return <div className="text-center py-8 text-white/80">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error fetching movies. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-[#0a0a0a] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            All Movies ({movies?.length})
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies?.map((movie) => (
            <Link
              key={movie._id}
              to={`/admin/movies/update/${movie._id}`}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <div className="rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48">
                  <img
                    src={movie.image}
                    alt={`Poster of ${movie.name}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60"></div>
                </div>
                
                <div className="p-4 border-b border-white/10">
                  <h2 className="font-bold text-xl mb-2 text-white">{movie.name}</h2>
                </div>

                <div className="p-4">
                  <p className="text-white/70 text-sm line-clamp-2">{movie.detail}</p>
                </div>

                <div className="p-4 flex justify-end">
                  <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity duration-300">
                    Update Movie
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;
