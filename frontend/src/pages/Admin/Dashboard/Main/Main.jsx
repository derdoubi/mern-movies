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
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (topMoviesError || visitorsError || allMoviesError) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-red-500 text-xl">Error loading data.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
          Dashboard Overview
        </h1>
        <p className="text-gray-400 mt-2">Welcome to your movie management dashboard</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section: Cards and Top Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SecondaryCard
              pill="Users"
              content={visitors?.length}
              info="Active users"
              gradient="from-purple-600 to-blue-500"
            />
            <SecondaryCard
              pill="Comments"
              content={sumOfCommentsLength}
              info="Total reviews"
              gradient="from-blue-500 to-cyan-400"
            />
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length}
              info="Total movies"
              gradient="from-purple-600 to-pink-500"
            />
          </div>

          {/* Top Content Section */}
          <div className="bg-[#1a1a1a] rounded-xl border border-white/10 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Top Content</h2>
              <span className="text-gray-400">Comments</span>
            </div>
            <div className="space-y-4">
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
        <div className="lg:col-span-4">
          <div className="bg-[#1a1a1a] rounded-xl border border-white/10 p-6 sticky top-6">
            <RealTimeCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
