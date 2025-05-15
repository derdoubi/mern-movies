const GenreForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="max-w-md mx-auto bg-slate-700 p-6 rounded-lg shadow-xl border-2 border-blue-400">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="genreName"
          className="block text-slate-100 text-lg font-medium mb-2"
        >
          Genre Name:
        </label>

        <input
          id="genreName"
          type="text"
          placeholder="Write genre name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-slate-400 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-400"
        />

        <div className="mt-4 flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200 font-semibold"
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-rose-500 text-white px-6 py-2 rounded-md hover:bg-rose-600 transition duration-200 font-semibold"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GenreForm;
