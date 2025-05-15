import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainePage";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <Header />

      {/* Movies Section */}
      <section className="mt-10 px-4 sm:px-6 lg:px-20">
        <MoviesContainerPage />
      </section>
    </div>
  );
};

export default Home;

