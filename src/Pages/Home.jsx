import PastLaunches from "../Components/HomePage/PastLaunches";
import NextLaunch from "../Components/HomePage/NextLaunch";
import UpcomingLaunches from "../Components/HomePage/UpcomingLaunches";

const Home = () => {
  return (
    <div className="container">
      <NextLaunch />

      <section className="mb-10">
        <h1 className="text-2xl mb-4 font-bold dark:text-white">
          Past launches:
        </h1>

        <PastLaunches />
      </section>

      <section>
        <h1 className="text-2xl mb-8 font-bold dark:text-white">
          Upcoming launches:
        </h1>

        <UpcomingLaunches />
      </section>
    </div>
  );
}

export default Home;
