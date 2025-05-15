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
    <div className="min-h-screen bg-[#121212] text-white px-4 py-8">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-block mb-6 text-sm text-red-400 hover:underline"
        >
          ← Go Back
        </Link>
      </div>

      {/* Movie Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="w-full">
          <img
            src={movie?.image}
            alt={movie?.name}
            className="w-full rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Movie Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-red-500">
              {movie?.name}
            </h2>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              {movie?.detail}
            </p>

            <p className="text-gray-400 mb-2">
              <span className="font-semibold text-white">Release Year:</span>{" "}
              {movie?.year}
            </p>

            <div className="mb-4">
              <p className="font-semibold text-white mb-2">Cast:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {movie?.cast?.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs + Reviews */}
      <div className="max-w-5xl mx-auto mt-12">
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
  );
};

export default MovieDetails;
