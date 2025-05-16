const GenreForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-500/20 blur-3xl" />
      
      <div className="relative bg-[#1a1a1a] p-8 rounded-xl shadow-2xl border border-white/10 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-6">
          {handleDelete ? "Edit Genre" : "Add New Genre"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="genreName"
              className="block text-sm font-medium text-gray-200 mb-2"
            >
              Genre Name
            </label>

            <input
              id="genreName"
              type="text"
              placeholder="Enter genre name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-lg text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90
                      rounded-lg font-semibold text-white transition-all duration-200 
                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                      focus:ring-offset-[#1a1a1a]"
            >
              {buttonText}
            </button>

            {handleDelete && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-rose-500 hover:opacity-90
                        rounded-lg font-semibold text-white transition-all duration-200 
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 
                        focus:ring-offset-[#1a1a1a]"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenreForm;
