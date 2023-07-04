import PropTypes from 'prop-types';
import useSWR from "swr";
import { useNavigate } from "react-router-dom";

import { fetcher } from '../helpers/fetcher';

import ErrorAlert from '../Components/base/ErrorAlert';
import Loader from '../Components/base/Loader';
import classNames from 'classnames';

const RocketsContainer = ({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  )
}

RocketsContainer.propTypes = {
  children: PropTypes.any.isRequired
}

const Rockets = () => {
  const navigate = useNavigate();
  const { data: rockets, error, isLoading } = useSWR("/v4/rockets", fetcher);

  if (isLoading) return <Loader />

  if (error) return <ErrorAlert
    text="Failed to load rockets."
  />

  return (
    <RocketsContainer>
      <h1 className="text-2xl mb-8 font-bold dark:text-white">
        Rockets:
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {
          rockets.sort((a, b) => b.active - a.active).map(rocket => {
            return (
              <div
                key={rocket.id}
                onClick={() => {
                  navigate(`/rockets/${rocket.id}`);
                }}
                className="cursor-pointer border transition card bg-base-100 shadow-xl dark:border-gray-700 dark:text-white hover:text-sky-500 dark:hover:text-sky-300 "
              >
                <figure className="h-72">
                  <img
                    className="h-full object-cover"
                    src={rocket.flickr_images[0]} alt={rocket.name}
                  />
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title text-md  mb-1">
                    {rocket.name}

                    <span
                      className={classNames("badge font-normal", {
                        "badge-success": rocket.active,
                        "badge-error": !rocket.active,
                      })}
                    >
                      <span className="text-xs">
                        {rocket.active ? "Active" : "Not Active"}
                      </span>
                    </span>
                  </h2>
                </div>
              </div>
            )
          })
        }
      </div>
    </RocketsContainer>
  );
}

export default Rockets;
