import { useState } from "react";
import { debounce } from "lodash";
import useSWR from "swr";

import Input from "../base/Input";
import ErrorAlert from "../base/ErrorAlert";
import Loader from "../base/Loader";
import Pagination from "../base/Pagination";
import UpcomingLaunchesList from "./UpcomingLaunchesList";

import { postFetcher } from "../../helpers/fetchers";

const UpcomingLaunches = () => {
  const [query, setQuery] = useState({
    upcoming: true,
  })
  const [options, setOptions] = useState({
    page: 1,
  })

  const { data, isLoading, error } = useSWR({ url: '/v4/launches/query', query, options }, postFetcher);

  const handleSearch = (e) => {
    if (e.target.value) {
      setQuery(prevState => ({
        ...prevState,
        $text: {
          $search: e.target.value,
        }
      }))

      setOptions((prevState) => {
        return {
          ...prevState,
          page: 1,
        }
      });
    } else {
      setQuery(() => ({
        upcoming: true,
      }));

      setOptions((prevState) => {
        return {
          ...prevState,
          page: 1,
        }
      });
    }
  }

  if (error) return (
    <ErrorAlert
      text="Upcoming launch failed"
    />
  )

  return (
    <div className="border p-6 shadow-2xl dark:border-gray-900">
      <Input
        placeholder="Search upcoming"
        onChange={debounce(handleSearch, 500)}
      />

      {
        isLoading ?
          <div className="min-h-[188px]">
            <Loader />
          </div>
          :
          <UpcomingLaunchesList items={data.docs} />
      }

      <Pagination
        page={data?.page}
        totalPages={data?.totalPages}
        hasPrevPage={data?.hasPrevPage}
        hasNextPage={data?.hasNextPage}
        setOptions={setOptions}
      />
    </div>
  );
}

export default UpcomingLaunches;
