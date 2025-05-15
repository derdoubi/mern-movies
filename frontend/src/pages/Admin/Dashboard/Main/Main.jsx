import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealTimeCard from "./RealTimeCard";
import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies.js";
import { useGetUsersQuery } from "../../../../redux/api/user";
import { useMemo } from "react";

const Main = () => {
  const { data: topMovies, isLoading: isLoadingTopMovies, error: topMoviesError } = useGetTopMoviesQuery();
  const { data: visitors, isLoading: isLoadingVisitors, error: visitorsError } = useGetUsersQuery();
  const { data: allMovies, isLoading: isLoadingAllMovies, error: allMoviesError } = useGetAllMoviesQuery();

  // Memoize the sum of comments length to avoid unnecessary recalculations
  const sumOfCommentsLength = useMemo(() => {
    const totalCommentsLength = allMovies?.map((m) => m.numReviews);
    return totalCommentsLength?.reduce((acc, length) => acc + length, 0) || 0;
  }, [allMovies]);

  if (isLoadingTopMovies || isLoadingVisitors || isLoadingAllMovies) {
    return <div>Loading...</div>;
  }

  if (topMoviesError || visitorsError || allMoviesError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="flex flex-wrap justify-between px-4 py-10">
        {/* Left Section: Cards and Top Content */}
        <div className="flex flex-col items-center sm:ml-0 md:ml-8">
          {/* Secondary Cards */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <SecondaryCard
              pill="Users"
              content={visitors?.length}
              info="20.2k more than usual"
              gradient="from-teal-500 to-lime-400"
            />
            <SecondaryCard
              pill="Comments"
              content={sumOfCommentsLength}
              info="742.8 more than usual"
              gradient="from-[#CCC514] to-[#CDCB8E]"
            />
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length}
              info="372+ more than usual"
              gradient="from-green-500 to-lime-400"
            />
          </div>

          {/* Top Content Section */}
          <div className="w-full text-center mb-6">
            <div className="flex justify-between w-full text-xl font-bold mb-4">
              <p>Top Content</p>
              <p>Comments</p>
            </div>
            <div className="space-y-6">
              {topMovies?.map((movie) => (
                <VideoCard
                  key={movie._id}
                  image={movie.image}
                  title={movie.name}
                  date={movie.year}
                  comments={movie.numReviews}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Real-time card */}
        <div className="sm:ml-8 mt-10 sm:mt-0">
          <RealTimeCard />
        </div>
      </section>
    </div>
  );
};

export default Main;
