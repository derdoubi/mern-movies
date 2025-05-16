import { useGetUsersQuery } from "../../../../redux/api/user";

const PrimaryCard = () => {
  const { data: visitors, isLoading, isError } = useGetUsersQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-500/10 rounded-lg p-6">
        <p className="text-red-500 text-center">Error loading data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="relative bg-[#2a2a2a] rounded-lg border border-white/5 p-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-500/5 rounded-lg" />
      
      {/* Content */}
      <div className="relative space-y-4">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
          Congratulations! 🎉
        </h2>
        <p className="text-gray-400">
          You have <span className="text-white font-medium">{visitors?.length}</span> new users watching your content.
        </p>
        
        {/* Stats */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full" />
          </div>
          <span className="text-sm text-gray-400">75%</span>
        </div>
      </div>
    </div>
  );
};

export default PrimaryCard;
