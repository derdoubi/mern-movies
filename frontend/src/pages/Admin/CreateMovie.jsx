import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: "",
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [createMovie, { isLoading: isCreatingMovie }] = useCreateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage }] = useUploadImageMutation();
  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres) {
      setMovieData((prev) => ({
        ...prev,
        genre: genres[0]?._id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "genre") {
      const selectedGenre = genres.find((genre) => genre.name === value);
      setMovieData((prev) => ({
        ...prev,
        genre: selectedGenre ? selectedGenre._id : "",
      }));
    } else {
      setMovieData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCreateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !selectedImage
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadedImagePath = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadRes = await uploadImage(formData);

        if (uploadRes.data) {
          uploadedImagePath = uploadRes.data.image;
        } else {
          toast.error("Failed to upload image");
          return;
        }
      }

      await createMovie({
        ...movieData,
        image: uploadedImagePath,
      });

      toast.success("Movie successfully created!");
      navigate("/admin/movies-list");

    } catch (error) {
      toast.error("Failed to create movie");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-10 px-4 flex items-start justify-center">
      <form className="w-full max-w-2xl bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-8">
          Create New Movie
        </h1>

        <div>
          <label className="block text-sm mb-2 text-white/80">Movie Name</label>
          <input
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            placeholder="Enter movie name"
            className="w-full px-4 py-2 bg-[#2a2a2a] border border-white/10 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 text-white/80">Release Year</label>
          <input
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            placeholder="e.g. 2024"
            className="w-full px-4 py-2 bg-[#2a2a2a] border border-white/10 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 text-white/80">Description</label>
          <textarea
            name="detail"
            value={movieData.detail}
            onChange={handleChange}
            placeholder="Movie description"
            rows={4}
            className="w-full px-4 py-2 bg-[#2a2a2a] border border-white/10 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm mb-2 text-white/80">Cast (comma-separated)</label>
          <input
            type="text"
            name="cast"
            value={movieData.cast.join(", ")}
            onChange={(e) =>
              setMovieData({ ...movieData, cast: e.target.value.split(", ") })
            }
            placeholder="e.g. Tom Hanks, Emma Watson"
            className="w-full px-4 py-2 bg-[#2a2a2a] border border-white/10 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 text-white/80">Genre</label>
          <select
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-[#2a2a2a] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            {isLoadingGenres ? (
              <option>Loading...</option>
            ) : (
              genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-2 text-white/80">Upload Poster</label>
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

        <button
          type="button"
          onClick={handleCreateMovie}
          disabled={isCreatingMovie || isUploadingImage}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-60"
        >
          {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
