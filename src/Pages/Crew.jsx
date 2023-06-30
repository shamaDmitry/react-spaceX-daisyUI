import { XCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../helpers/fetcher";

const Crew = () => {
  const { data, error, isLoading } = useSWR("/latest/crew", fetcher);
  const [filter, setFilter] = useState("all");

  const getFilteredUser = (data) => {
    return filter === "all" ? data : filter === data.agency;
  }

  return (
    <div className="container">
      <h1 className="text-2xl mb-8 font-bold dark:text-white">
        Crew:
      </h1>

      <div className="flex justify-end mb-7">
        <select
          className="border bg-white w-full max-w-xs py-2 px-3 cursor-pointer dark:bg-gray-700 dark:border-gray-700"
          defaultValue="all"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="NASA">NASA</option>
          <option value="JAXA">JAXA</option>
          <option value="ESA">ESA</option>
          <option value="SpaceX">SpaceX</option>
          <option value="Axiom Space">Axiom Space</option>
          <option value="Roscosmos">Roscosmos</option>
        </select>
      </div>

      {isLoading && <div className="text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>}

      {error && <div className="alert alert-error dark:text-white">
        <XCircleIcon className="h-6 w-6 text-dark" />
        <span>Error! Task failed successfully.</span>
      </div>}

      <section className="grid grid-cols-4 gap-5">
        {
          data?.filter((item) => getFilteredUser(item)).map(item => {
            return (
              <div
                className="border card bg-base-100 shadow-xl dark:border-gray-700"
                key={item.id}
              >
                <figure className="h-96">
                  <img className="h-full w-full object-cover" src={item.image} alt={item.name} />
                </figure>

                <div className="card-body">
                  <h2 className="card-title dark:text-white">
                    {item.name}
                  </h2>

                  <div className="flex gap-3 items-center">
                    <span className="capitalize">agency:</span>
                    <div className="badge badge-neutral">{item.agency}</div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>
    </div>
  );
}

export default Crew;
