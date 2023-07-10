import { debounce } from "lodash";

import Loader from "../base/Loader";
import ErrorAlert from "../base/ErrorAlert";
import PastLaunchesList from "./PastLaunchesList";
import Input from "../base/Input";
import Pagination from "../base/Pagination";
import useSWR from  'swr';
import { _axios } from '../../helpers/fetcher'
import { useState } from 'react';
import { postFetcher } from "../../helpers/fetchers";


const PastLaunches = () => {
  const [query, setQuery] = useState({})
  const [options, setOptions] = useState({
    page: 1,
  })

  const { data, isLoading, error } = useSWR({ url: '/v4/launches/query', query: query, options: options}, postFetcher);
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
          <PastLaunchesList items={data.docs} />
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

export default PastLaunches;
