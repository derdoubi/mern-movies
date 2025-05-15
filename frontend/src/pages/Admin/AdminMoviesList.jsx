import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../redux/api/movies";

const AdminMoviesList = () => {
  const { data: movies, isLoading, error } = useGetAllMoviesQuery();

  if (isLoading) {
    return <div className="text-center py-8">Loading movies...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error fetching movies. Please try again later.</div>;
  }

  return (
    <div className="container mx-[9rem]">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold h-12">
            All Movies ({movies?.length})
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 p-[2rem]">
            {movies?.map((movie) => (
              <Link
                key={movie._id}
                to={`/admin/movies/update/${movie._id}`}
                className="block w-[18rem] overflow-hidden"
              >
                <div className="max-w-sm m-4 rounded-lg overflow-hidden shadow-lg bg-white">
                  <img
                    src={movie.image}
                    alt={`Poster of ${movie.name}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="px-6 py-4 border-b border-gray-400">
                    <div className="font-bold text-xl mb-2">{movie.name}</div>
                  </div>

                  <p className="text-gray-700 text-base px-6 pb-4">{movie.detail}</p>

                  <div className="flex justify-center mb-[1rem]">
                    <Link
                      to={`/admin/movies/update/${movie._id}`}
                      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update Movie
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;
