import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie }) => {
  return (
    <div className="mt-6">
      {/* Review Form Section */}
      <section>
        {userInfo ? (
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label htmlFor="comment" className="block text-xl font-semibold mb-2">
                Write Your Review
              </label>
              <textarea
                id="comment"
                rows="5"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-4 border rounded-lg text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Your review..."
                aria-label="Write your review"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-center text-xl mt-4">
            Please <Link to="/login" className="text-teal-500">Sign In</Link> to write a review.
          </p>
        )}
      </section>

      {/* Reviews Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

        {movie?.reviews.length === 0 ? (
          <p className="text-center text-lg">No Reviews Yet</p>
        ) : (
          <div className="space-y-6">
            {movie?.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#1A1A1A] p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <strong className="text-xl text-[#B0B0B0]">{review.name}</strong>
                  <p className="text-sm text-[#B0B0B0]">
                    {review.createdAt.substring(0, 10)}
                  </p>
                </div>

                <p className="text-lg text-white">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MovieTabs;
