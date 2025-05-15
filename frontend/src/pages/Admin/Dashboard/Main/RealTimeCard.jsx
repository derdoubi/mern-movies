import { useGetUsersQuery } from "../../../../redux/api/user";
import PrimaryCard from "./PrimaryCard";

const RealTimeCard = () => {
  const { data: visitors, isLoading, isError } = useGetUsersQuery();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="w-[30rem] mt-10 bg-[#282828] text-[#fff] rounded-lg shadow-lg p-4 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="w-[30rem] mt-10 bg-red-600 text-[#fff] rounded-lg shadow-lg p-4 flex justify-center items-center">
        <p>Error loading data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full sm:w-[30rem] mt-10 bg-[#282828] text-[#fff] rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2">Realtime</h2>
      <p className="text-gray-500 mb-4">Update Live</p>
      <div className="border-t border-[#666] my-4"></div>
      
      <h2 className="text-3xl font-bold mb-2">{visitors?.length}</h2>
      <p className="text-gray-500 mb-2">Subscribers</p>

      <div className="border-t border-[#666] my-4"></div>

      <PrimaryCard />
    </div>
  );
};

export default RealTimeCard;
