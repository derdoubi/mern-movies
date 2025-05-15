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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-slate-900 to-slate-800 p-6 text-white font-sans">
      <form className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-2xl border border-blue-400">
        <h2 className="text-3xl font-semibold mb-6 text-blue-300">🎬 Update Movie</h2>

        <div className="mb-4">
          <label className="block mb-1 text-blue-100">Name</label>
          <input
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-slate-700 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-blue-100">Year</label>
          <input
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-slate-700 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-blue-100">Detail</label>
          <textarea
            name="detail"
            value={movieData.detail}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-slate-700 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-blue-100">Cast (comma-separated)</label>
          <input
            type="text"
            name="cast"
            value={movieData.cast.join(", ")}
            onChange={(e) =>
              setMovieData({ ...movieData, cast: e.target.value.split(", ") })
            }
            className="w-full px-4 py-2 rounded-md bg-slate-700 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-blue-100">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-white"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleUpdateMovie}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded transition"
            disabled={isUpdatingMovie || isUploadingImage}
          >
            {isUpdatingMovie || isUploadingImage ? "Updating..." : "Update Movie"}
          </button>

          <button
            type="button"
            onClick={handleDeleteMovie}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition"
            disabled={isUpdatingMovie || isUploadingImage}
          >
            {isUpdatingMovie || isUploadingImage ? "Deleting..." : "Delete Movie"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMovie;
