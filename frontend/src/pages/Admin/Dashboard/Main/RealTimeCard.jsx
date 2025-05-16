import { useGetUsersQuery } from "../../../../redux/api/user";
import PrimaryCard from "./PrimaryCard";

const RealTimeCard = () => {
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
          Real-time Activity
        </h2>
        <p className="text-gray-400 mt-1">Live updates</p>
      </div>

      {/* Stats */}
      <div className="space-y-6">
        <div className="relative bg-[#2a2a2a] rounded-lg border border-white/5 p-6">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-500/5 rounded-lg" />
          
          {/* Content */}
          <div className="relative">
            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              {visitors?.length}
            </h3>
            <p className="text-gray-400 mt-2">Active Users</p>
          </div>
        </div>

        {/* Activity Card */}
        <PrimaryCard />
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#2a2a2a] rounded-lg border border-white/5 p-4">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            24%
          </div>
          <p className="text-gray-400 text-sm mt-1">Growth Rate</p>
        </div>
        <div className="bg-[#2a2a2a] rounded-lg border border-white/5 p-4">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            95%
          </div>
          <p className="text-gray-400 text-sm mt-1">Satisfaction</p>
        </div>
      </div>
    </div>
  );
};

export default RealTimeCard;
