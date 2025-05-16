import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    ratings: 0,
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie }] = useUpdateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage, error: uploadImageErrorDetails }] = useUploadImageMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateMovie = async () => {
    try {
      if (!movieData.name || !movieData.year || !movieData.detail || !movieData.cast) {
        toast.error("Please fill in all required fields");
        return;
      }

      let uploadedImagePath = movieData.image;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image:", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }
      }

      await updateMovie({
        id,
        updatedMovie: { ...movieData, image: uploadedImagePath },
      });

      toast.success("Movie updated");
      navigate("/admin/movies-list");
    } catch (error) {
      console.error("Failed to update movie:", error);
      toast.error("Update failed");
    }
  };

  const handleDeleteMovie = async () => {
    try {
      await deleteMovie(id);
      toast.success("Movie deleted successfully");
      navigate("/admin/movies-list");
    } catch (error) {
      console.error("Failed to delete movie:", error);
      toast.error(`Failed to delete movie: ${error?.message}`);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0a0a0a] p-6 text-white">
      <form className="bg-[#1a1a1a] p-8 rounded-xl shadow-xl w-full max-w-2xl border border-white/10">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-8">
          Update Movie
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-white/80">Name</label>
            <input
              type="text"
              name="name"
              value={movieData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div>
            <label className="block mb-2 text-white/80">Year</label>
            <input
              type="number"
              name="year"
              value={movieData.year}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div>
            <label className="block mb-2 text-white/80">Detail</label>
            <textarea
              name="detail"
              value={movieData.detail}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div>
            <label className="block mb-2 text-white/80">Cast (comma-separated)</label>
            <input
              type="text"
              name="cast"
              value={movieData.cast.join(", ")}
              onChange={(e) =>
                setMovieData({ ...movieData, cast: e.target.value.split(", ") })
              }
              className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div>
            <label className="block mb-2 text-white/80">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 bg-[#2a2a2a] border border-white/10 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-600 file:to-blue-500 file:text-white hover:file:opacity-90"
            />
            {selectedImage && (
              <p className="text-xs text-green-400 mt-1">{selectedImage.name}</p>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={handleUpdateMovie}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-60"
              disabled={isUpdatingMovie || isUploadingImage}
            >
              {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
            </button>

            <button
              type="button"
              onClick={handleDeleteMovie}
              className="px-6 py-2 bg-red-500/10 text-red-500 rounded-lg font-semibold transition-all duration-300 hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/50 disabled:opacity-60"
              disabled={isUpdatingMovie || isUploadingImage}
            >
              {isUpdatingMovie || isUploadingImage ? "Deleting..." : "Delete Movie"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovie;
