import { useState } from "react";
import {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useUpdateGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";
import { toast } from "react-toastify";
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";

const GenreList = () => {
  const { data: genres, refetch, isLoading, isError, error } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Genre name is required");

    try {
      const result = await createGenre({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted`);
        refetch();
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Genre deletion failed. Try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();
    if (!updatingName.trim()) return toast.error("Genre name is required");

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: { name: updatingName },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Update failed.");
    }
  };

  if (isLoading) {
    return <div className="text-center py-8 text-blue-400">Loading genres...</div>;
  }

  if (isError) {
    return <div className="text-center py-8 text-rose-500">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 font-sans px-6 py-10">
      <div className="max-w-3xl mx-auto bg-slate-700 p-8 rounded-lg shadow-2xl border-4 border-blue-400">
        <h1 className="text-3xl font-bold text-blue-300 mb-6 text-center">🎬 Genre Management</h1>

        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
          buttonText="Create"
        />

        <hr className="my-8 border-blue-400" />

        <div className="space-y-4">
          {genres?.map((genre) => (
            <div
              key={genre._id}
              className="bg-slate-600 text-white px-6 py-4 rounded-lg shadow-md flex justify-between items-center border border-slate-400 hover:shadow-blue-300/20 transition duration-200"
            >
              <span className="text-lg font-medium">{genre.name}</span>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedGenre(genre);
                    setUpdatingName(genre.name);
                  }}
                  className="text-blue-300 hover:text-blue-200 font-semibold transition duration-150"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete ${genre.name}?`)) {
                      handleDeleteGenre();
                    }
                  }}
                  className="text-rose-400 hover:text-rose-300 font-semibold transition duration-150"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <GenreForm
          value={updatingName}
          setValue={setUpdatingName}
          handleSubmit={handleUpdateGenre}
          handleDelete={handleDeleteGenre}
          buttonText="Update"
        />
      </Modal>
    </div>
  );
};

export default GenreList;
