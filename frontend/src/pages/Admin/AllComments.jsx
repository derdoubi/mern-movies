import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const AllComments = () => {
  const { data: movies, isLoading, error } = useGetAllMoviesQuery();
  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!isConfirmed) return;

    try {
      await deleteComment({ movieId, reviewId });
      toast.success("Comment deleted successfully!");
    } catch (err) {
      console.error("Error deleting comment: ", err);
      toast.error("Failed to delete comment. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="text-center py-8 text-white/80">Loading comments...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error fetching data. Please try again later.</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4">
      {movies?.map((movie) => (
        <section
          key={movie._id}
          className="max-w-4xl mx-auto mb-12"
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-8 text-center">
            {movie.name} - Comments
          </h2>
          
          {movie.reviews?.length === 0 && (
            <div className="text-white/60 text-center">No comments yet.</div>
          )}
          
          <div className="space-y-6">
            {movie?.reviews?.map((review) => (
              <div
                key={review._id}
                className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:border-white/20"
              >
                <div className="flex justify-between items-center text-white/70 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <strong>{review.name}</strong>
                  </div>
                  <p className="text-sm">{review.createdAt.substring(0, 10)}</p>
                </div>
                
                <p className="text-white/90 mb-4">{review.comment}</p>

                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 font-semibold transition-all duration-300 hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    onClick={() => handleDeleteComment(movie._id, review._id)}
                  >
                    Delete Comment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default AllComments;
