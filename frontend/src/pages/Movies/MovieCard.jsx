import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="relative group w-[16rem] sm:w-[18rem] md:w-[20rem] aspect-[2/3] overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 bg-zinc-900 border border-zinc-800">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image}
          alt={movie.name}
          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-40"
        />
        {/* Overlay Info */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <h2 className="text-lg sm:text-xl font-semibold text-white">{movie.name}</h2>
          {movie.year && (
            <p className="text-sm text-zinc-300">{movie.year}</p>
          )}
        </div>
      </Link>

      {/* Optional Rating Badge */}
      {movie.rating && (
        <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded shadow-md">
          ⭐ {movie.rating}/10
        </span>
      )}
    </div>
  );
};

export default MovieCard;
