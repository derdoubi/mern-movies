import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie._id}`} className="group">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[#1a1a1a] shadow-lg transition-transform duration-300 group-hover:scale-105">
        {/* Image */}
        <img
          src={movie.image}
          alt={movie.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
              {movie.name}
            </h3>
            {movie.year && (
              <p className="text-sm text-gray-300">{movie.year}</p>
            )}
          </div>
        </div>

        {/* Rating Badge */}
        {movie.rating && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-400 text-black text-xs font-semibold rounded shadow-md flex items-center space-x-1">
            <span>⭐</span>
            <span>{movie.rating}/10</span>
          </div>
        )}

        {/* Hover Effect Gradient Border */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-purple-blue rounded-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
      </div>
    </Link>
  );
};

export default MovieCard;
