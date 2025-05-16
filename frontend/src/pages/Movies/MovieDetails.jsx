import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();

      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={movie?.image}
            alt={movie?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Image */}
          <div className="lg:w-1/3">
            <img
              src={movie?.image}
              alt={movie?.name}
              className="w-full rounded-lg shadow-2xl border-2 border-white/10"
            />
          </div>

          {/* Right Column - Details */}
          <div className="lg:w-2/3">
            <Link
              to="/"
              className="inline-block mb-6 text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200"
            >
              ← Back to Movies
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {movie?.name}
            </h1>

            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                {movie?.detail}
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Release Year:</span>
                  <span className="text-white">{movie?.year}</span>
                </div>

                {movie?.cast && movie.cast.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Cast</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.cast.map((actor, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#2a2a2a] rounded-full text-sm text-gray-300"
                        >
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
