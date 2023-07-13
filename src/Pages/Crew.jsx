import PropTypes from 'prop-types';
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import useSWR from "swr";
import CrewCard from "../Components/CrewPage/CrewCard";
import Loader from "../Components/base/Loader"
import { postFetcher } from '../helpers/fetchers';
import Pagination from '../Components/base/Pagination';

const CrewContainer = ({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  )
}

CrewContainer.propTypes = {
  children: PropTypes.any.isRequired,
}

const Crew = () => {
  // const { data, error, isLoading } = useSWR("/v4/crew", fetcher);
  const [query, setQuery] = useState({});
  const [options, setOptions] = useState({
    limit: 8,
    populate: ['launches'],
  });

  const { data, error, isLoading } = useSWR({ url: "/v4/crew/query", query, options }, postFetcher);
  const [filter, setFilter] = useState("all");

  const getFilteredUser = (data) => {
    return filter === "all" ? data : filter === data.agency;
  }

  if (isLoading) return (
    <CrewContainer>
      <Loader />
    </CrewContainer>
  )

  if (error) return (
    <CrewContainer>
      <div className="alert alert-error dark:text-white">
        <XCircleIcon className="h-6 w-6 text-dark" />
        <span>Error! Crew failed.</span>
      </div>
    </CrewContainer>
  )

  return (
    <CrewContainer>
      <div className="flex mb-7 flex-col gap-4 md:flex-row md:justify-between">
        <h1 className="text-2xl font-bold dark:text-white">
          Crew:
        </h1>

        <div className="flex">
          <select
            className="border bg-white w-full py-2 px-3 cursor-pointer dark:bg-gray-700 dark:border-gray-700 dark:bg-transparent"
            defaultValue={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setOptions((prevState) => prevState);

              e.target.value !== 'all' ? setQuery({ agency: e.target.value }) : setQuery({})
            }}
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
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {
          data.docs.filter((item) => getFilteredUser(item)).map(item => {
            return <CrewCard
              user={item}
              key={item.id}
            />
          })
        }
      </section>

      <Pagination
        page={data?.page}
        totalPages={data?.totalPages}
        hasPrevPage={data?.hasPrevPage}
        hasNextPage={data?.hasNextPage}
        setOptions={setOptions}
      />
    </CrewContainer>
  );
}

export default Crew;
