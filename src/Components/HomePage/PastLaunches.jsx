import { debounce } from "lodash";

import useQuery from "../../hooks/useQuery";
import { _axios } from '../../helpers/fetcher';

import Loader from "../base/Loader";
import ErrorAlert from "../base/ErrorAlert";
import PastLaunchesList from "./PastLaunchesList";
import Input from "../base/Input";
import Pagination from "../base/Pagination";

const PastLaunches = () => {
  const { data, error, isLoading, setQuery, setOptions, meta } = useQuery('/v4/launches/query');

  const handleSearch = (e) => {
    if (e.target.value) {
      setOptions((prevState) => {
        return {
          ...prevState,
          page: 1,
        }
      });

      setQuery({
        $text: {
          $search: e.target.value,
        }
      })
    } else {
      setQuery(null);
    }
  }

  if (error) return (
    <ErrorAlert
      text="Latest launches failed"
    />
  )

  return (
    <div className="border p-6 shadow-2xl dark:border-gray-900">
      <Input
        placeholder="Search past"
        onChange={debounce(handleSearch, 500)}
      />

      {
        isLoading ?
          <div className="min-h-[188px]">
            <Loader />
          </div>
          :
          <PastLaunchesList items={data} />
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

export default PastLaunches;
