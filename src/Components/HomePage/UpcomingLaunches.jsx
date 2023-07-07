import { useEffect } from "react";
import { debounce } from "lodash";

import useQuery from "../../hooks/useQuery";

import Input from "../base/Input";
import ErrorAlert from "../base/ErrorAlert";
import Loader from "../base/Loader";
import Pagination from "../base/Pagination";
import UpcomingLaunchesList from "./UpcomingLaunchesList";

const UpcomingLaunches = () => {
  const { data, error, isLoading, setQuery, setOptions, meta } = useQuery('/v4/launches/query');

  useEffect(() => {
    setQuery({ upcoming: true })
    return () => { };
  }, []);

  const handleSearch = (e) => {
    if (e.target.value) {
      setOptions((prevState) => {
        return {
          ...prevState,
          page: 1,
        }
      });

      setQuery(prevState => ({
        ...prevState,
        $text: {
          $search: e.target.value,
        }
      }))
    } else {
      // setQuery(null);
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
          <UpcomingLaunchesList items={data} />
      }

      <Pagination
        page={meta?.page}
        totalPages={meta?.totalPages}
        hasPrevPage={meta?.hasPrevPage}
        hasNextPage={meta?.hasNextPage}
        setOptions={setOptions}
      />
    </div>
  );
}

export default UpcomingLaunches;
