import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainePage";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <Header />

      {/* Movies Section */}
      <section className="container mx-auto px-4 py-6 max-w-screen-xl">
        <MoviesContainerPage />
      </section>
    </div>
  );
};

export default Home;

