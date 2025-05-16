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
    return <div className="text-center py-8 text-white/80">Loading genres...</div>;
  }

  if (isError) {
    return <div className="text-center py-8 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-10">
      <div className="max-w-3xl mx-auto bg-[#1a1a1a] p-8 rounded-xl shadow-xl border border-white/10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-8 text-center">
          Genre Management
        </h1>

        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
          buttonText="Create"
        />

        <div className="my-8 border-t border-white/10" />

        <div className="space-y-4">
          {genres?.map((genre) => (
            <div
              key={genre._id}
              className="bg-[#2a2a2a] px-6 py-4 rounded-lg flex justify-between items-center border border-white/10 hover:bg-[#2a2a2a]/80 transition-all duration-300"
            >
              <span className="text-lg font-medium text-white/90">{genre.name}</span>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedGenre(genre);
                    setUpdatingName(genre.name);
                  }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Delete ${genre.name}?`)) {
                      handleDeleteGenre();
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 font-semibold hover:bg-red-500/20 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-white/10">
          <GenreForm
            value={updatingName}
            setValue={setUpdatingName}
            handleSubmit={handleUpdateGenre}
            handleDelete={handleDeleteGenre}
            buttonText="Update"
          />
        </div>
      </Modal>
    </div>
  );
};

export default GenreList;
