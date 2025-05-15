import { useGetUsersQuery } from "../../../../redux/api/user";

const PrimaryCard = () => {
  const { data: visitors, isLoading, isError } = useGetUsersQuery();

  if (isLoading) {
    return (
      <div className="w-full h-[10%] bg-[#282828] text-white rounded-lg p-6 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[10%] bg-red-600 text-white rounded-lg p-6 flex justify-center items-center">
        <p>Error loading data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[50%] lg:w-[30%] h-[auto] bg-[#282828] text-white rounded-lg p-6 shadow-lg flex flex-col justify-center items-start">
      <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
      <p className="text-base">
        You have {visitors?.length} new users, watching your content.
      </p>
    </div>
  );
};

export default PrimaryCard;
