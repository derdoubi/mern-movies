import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <div className="space-y-12">
      {/* Review Form Section */}
      <section className="bg-[#1a1a1a] rounded-xl p-6 border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Write a Review</h2>
        
        {userInfo ? (
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <textarea
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Share your thoughts about the movie..."
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-200"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-400 mb-4">
              Please sign in to write a review
            </p>
            <Link
              to="/login"
              className="inline-block px-6 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>
        )}
      </section>

      {/* Reviews Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">
          Reviews ({movie?.reviews?.length || 0})
        </h2>

        {movie?.reviews?.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-6">
            {movie?.reviews?.map((review) => (
              <div
                key={review._id}
                className="bg-[#1a1a1a] rounded-xl p-6 border border-white/10 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    {review.name}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieTabs;
