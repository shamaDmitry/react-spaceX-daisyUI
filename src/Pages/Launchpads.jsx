import { Link } from "react-router-dom";
import useSWR from "swr";
import ErrorAlert from "../Components/base/ErrorAlert";
import Loader from "../Components/base/Loader";
import { fetcher } from "../helpers/fetcher";

const Container = ({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  )
}

const Launchpads = () => {
  const { data, error, isLoading } = useSWR(`/v4/launchpads`, fetcher)

  if (isLoading) return (
    <Container>
      <Loader />
    </Container>
  )

  if (error) return (
    <ErrorAlert
      text="Data fetch is failed"
    />
  )

  return (
    <Container>
      <h1 className="text-2xl font-bold dark:text-white mb-6">
        Launchpads:
      </h1>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"

      >
        {data.map(item => {
          return (
            <Link
              key={item.id}
              to={`/launchpads/${item.id}`}
              className="text-accent hover:text-accent-content transition"
            >
              <figure
                className="h-80 flex items-center justify-center mb-3"
              >
                <img
                  src={item.images.large}
                  alt={item.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </figure>

              <div className="font-bold">
                {item.name}
              </div>
            </Link>
          )
        })}
      </div>
    </Container>
  );
}

export default Launchpads;
