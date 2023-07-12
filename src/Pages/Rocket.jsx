import useSWR from "swr";
import { useNavigate, useParams } from "react-router-dom";

import { fetcher } from "../helpers/fetcher";

import BackLink from '../Components/base/BackLink';
import Loader from "../Components/base/Loader";
import ErrorAlert from "../Components/base/ErrorAlert";
import { USDollar, UnitFormatter } from "../helpers/helpers";
import dayjs from "../helpers/dayjs";
import classNames from "classnames";
import { useState } from "react";

const Rocket = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [bgIndex, setBgIndex] = useState(0);

  const { data, error, isLoading } = useSWR(`/v4/rockets/${id}`, fetcher);

  if (isLoading) return <Loader />

  if (error) return <ErrorAlert
    text="Failed to load rocket."
  />

  return (
    <div className="container">
      <BackLink
        text="Go back"
        onClick={() => navigate(-1)}
      />

      <h1 className="font-medium text-xl mt-4 mb-2 flex gap-2 items-center">
        {data.name}

        <span
          className={classNames("badge font-normal", {
            "badge-success": data.active,
            "badge-error": !data.active,
          })}
        >
          <span className="text-xs">
            {data.active ? "Active" : "Not Active"}
          </span>
        </span>
      </h1>

      <p className="leading-7">
        {data.description}
      </p>

      <div className="md:grid md:grid-cols-2 py-5 gap-4">
        <div className="overflow-auto py-2 px-1">
          <div className="stats h-full flex shadow-sm border dark:border-gray-700">
            <div className="stat">
              <div className="stat-title">
                Cost per launch
              </div>

              <div className="stat-value text-3xl">
                {USDollar.format(data.cost_per_launch)}
              </div>

              <div className="stat-desc">
                Country: <span className="font-bold ">{data.country}</span>
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">
                Success rate
              </div>

              <div className="stat-value">
                <div className="text-center py-1">
                  <div
                    className="radial-progress text-lg whitespace-nowrap bg-gray-300 text-red-950 dark:text-gray-300 dark:bg-black"
                    style={{ "--size": "5rem", "--value": data.success_rate_pct }}
                  >
                    {data.success_rate_pct}%
                  </div>
                </div>
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">
                First flight
              </div>

              <div className="stat-value text-3xl">
                {dayjs(data.first_flight).format('L')}
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">Stages</div>
              <div className="stat-value text-3xl">
                {data.stages}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-auto py-2 px-1">
          <div className="stats h-full flex shadow-sm border dark:border-gray-700">
            <div className="stat">
              <div className="stat-title">
                Height
              </div>

              <div className="stat-value">
                {data.height.meters} m
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">
                Mass
              </div>

              <div className="stat-value">
                {UnitFormatter.format(data.mass.kg)}
              </div>
            </div>

            <div className="stat">
              <div className="stat-title">
                Payload weights
              </div>

              <div className="stat-value text-lg">
                {data.payload_weights.map(item => {
                  return (
                    <p key={item.id}>
                      <span className="font-normal">{item.name}</span>: {UnitFormatter.format(item.kg)}
                    </p>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section
        className="flex flex-col justify-end transition-all h-[800px] bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${data.flickr_images[bgIndex]})` }}
      >
        <div className="container max-w-4xl z-10 text-lg">
          <div className="text-center my-4">
            <div className="inline-flex flex-wrap justify-center gap-2 bg-white/50 p-2">
              {data.flickr_images.map((image, index) => {
                return (
                  <button
                    key={index}
                    className={classNames("w-32 border-4 transition-all outline-none hover:border-gray-800 dark:hover:border-gray-700", {
                      'border-transparent': index !== bgIndex,
                      'border-gray-800 dark:border-gray-700': index === bgIndex
                    })}
                    onClick={() => setBgIndex(index)}
                  >
                    <img className="h-full object-cover"  src={image} alt="" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Rocket;
