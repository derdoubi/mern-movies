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
    return <div className="text-center py-8">Loading comments...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error fetching data. Please try again later.</div>;
  }

  return (
    <div className="py-8">
      {movies?.map((movie) => (
        <section
          key={movie._id}
          className="flex flex-col justify-center items-center space-y-8"
        >
          <div className="text-white text-xl font-bold mb-4">
            {movie.name} - Comments
          </div>
          {movie.reviews?.length === 0 && (
            <div className="text-gray-500">No comments yet.</div>
          )}
          {movie?.reviews?.map((review) => (
            <div
              key={review._id}
              className="bg-[#1A1A1A] p-4 rounded-lg w-[90%] sm:w-[70%] lg:w-[50%] mt-[2rem] mx-auto"
            >
              <div className="flex justify-between text-[#B0B0B0]">
                <strong>{review.name}</strong>
                <p>{review.createdAt.substring(0, 10)}</p>
              </div>
              <p className="my-4 text-white">{review.comment}</p>

              <button
                className="text-red-500 mt-2"
                onClick={() => handleDeleteComment(movie._id, review._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

export default AllComments;
