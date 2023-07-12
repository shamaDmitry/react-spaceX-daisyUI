import { Link } from "react-router-dom";
import useSWR from "swr";
import ErrorAlert from "../Components/base/ErrorAlert";
import Loader from "../Components/base/Loader";
import { fetcher } from "../helpers/fetcher";
import PropTypes from 'prop-types';

const Container = ({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        {data.map(item => {
          return (
            <div
              key={item.id}
              className="text-accent transition"
            >
              <Link
                className="flex mb-3"
                to={`/launchpads/${item.id}`}
              >
                <figure
                  className="border shadow-xl h-80 flex flex-1 items-center justify-center dark:border-gray-600"
                >
                  <img
                    src={item.images.large}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </figure>
              </Link>

              <Link
                to={`/launchpads/${item.id}`}
                className="font-bold hover:text-accent-content"
              >
                {item.name}
              </Link>

              <Link
                to={`https://www.google.com/maps/search/?api=1&query=${item.latitude}%2C${item.longitude}`}
                target="_blank"
                className="flex my-2 gap-1 text-gray-500 font-medium dark:text-accent-content"
                title={item.locality}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 text-accent w-5 h-5">
                  <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                </svg>

                <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.locality}
                </span>
              </Link>
            </div>
          )
        })}
      </div>
    </Container>
  );
}

export default Launchpads;
