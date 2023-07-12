import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import PropTypes from 'prop-types';

import BackLink from "../Components/base/BackLink";
import ErrorAlert from "../Components/base/ErrorAlert";
import Loader from "../Components/base/Loader";

import { postFetcher } from "../helpers/fetchers";
import { groupBy, isEmpty } from "lodash";
import LaunchesList from "../Components/LaunchpadPage/LaunchesList";

const getSuccessRate = (total, totalSuccess) => {
  return (((totalSuccess / total) * 100) || 0).toFixed(0)
};

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

const Launchpad = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [query,] = useState({
    _id: params.id
  });
  const [options,] = useState({
    populate: "launches"
  });

  const { data, isLoading, error } = useSWR({ url: '/v4/launchpads/query', query: query, options: options }, postFetcher);

  const { data: launches, isLoading: isLoadingLaunches, error: launchesError } = useSWR({
    url: '/v4/launches/query',
    query: {
      launchpad: params.id
    },
    options: {
      pagination: false,
      select: ['name', "date_local"]
    }
  }, postFetcher);

  if (isLoading || isLoadingLaunches) return (
    <Container>
      <Loader />
    </Container>
  )

  if (error || launchesError) return (
    <ErrorAlert
      text="Data fetch is failed"
    />
  )
  const [launchpad] = data.docs;

  const result = groupBy(launches.docs, (item) => new Date(item.date_local).getFullYear())

  return (
    <Container>
      <div className="mb-4">
        <BackLink
          text="Go back"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-10 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <figure className="mb-8 border shadow-xl dark:border-gray-700">
            <img
              className="transition w-full"
              src={launchpad.images.large}
              alt={launchpad.name}
            />
          </figure>

          <div className="border mb-8 stats shadow-xl overflow-auto w-full dark:border-gray-700 dark:text-white">
            <div className="stat place-items-center">
              <div className="stat-title">Launch attempts</div>
              <div className="stat-value">{launchpad.launch_attempts}</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Launch successes</div>
              <div className="stat-value">{launchpad.launch_successes}</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Success rate, %</div>
              <div className="stat-value">
                <div className="radial-progress text-lg"
                  style={{ "--value": getSuccessRate(launchpad.launch_attempts, launchpad.launch_successes), "--size": "3rem" }}
                >
                  {getSuccessRate(launchpad.launch_attempts, launchpad.launch_successes)}
                </div>
              </div>
            </div>
          </div>

          <iframe
            style={{ height: "400px", width: "100%", border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?q=${launchpad.latitude},${launchpad.longitude}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
          />
        </div>

        <div className="order-1 md:order-2">
          <div className="text-xl font-bold mb-2">
            {launchpad.name}
          </div>

          <div className="text-base">
            {launchpad.full_name}
          </div>

          {
            !isEmpty(result) && <div className="my-4">
              <h2 className="text-xl font-bold mb-2">
                Launches
              </h2>

              <LaunchesList result={result} />
            </div>
          }
        </div>
      </div>
    </Container>
  );
}

export default Launchpad;
