import { useEffect, useState } from "react";

import dayjs from "../../helpers/dayjs";
import { _axios } from '../../helpers/fetcher';
import useQuery from "../../hooks/useQuery";
import BackLink from "../base/BackLink";

import ErrorAlert from "../base/ErrorAlert";
import Loader from "../base/Loader";
import PastLaunchesList from "./PastLaunchesList";



const PastLaunches = () => {
  const { data, error, isLoading, pageIndex, setPageIndex, meta } = useQuery('/v4/launches/query');

  // const { data, error, isLoading } = useSWR(`/v4/launches/query/`, (url) => {
  //   return _axios.post(url, {
  //     "query": {
  //       "$text": {
  //         "$search": "blue"
  //       }
  //     },
  //     "options": {
  //       limit: 10,
  //       page: pageIndex,
  //       "populate": [
  //         {
  //           path: "launchpad",
  //           populate: [
  //             "launches"
  //           ]
  //         },
  //         {
  //           "path": "rocket",
  //           "select": ['name', 'country', 'descripPastLaunchesListtion']
  //         }
  //       ]
  //     },
  //   })
  // })

  // _axios.post('/v4/launches/query', {
  //   "query": {},
  //   "options": {
  //     limit: 10,
  //     "populate": [
  //       {
  //         "path": "rocket",
  //         "select": ['name', 'country', 'description']
  //       }
  //     ]
  //   },
  // })

  if (error) return (
    <ErrorAlert
      text="Latest launches failed"
    />
  )
  console.log(data);

  return (
    <div className="">
      {
        isLoading ?
          <div className="min-h-[300px]">
            <Loader />
          </div> :
          <PastLaunchesList items={data} />
      }

      <div className="flex items-center justify-end gap-10 my-5">
        <div className="flex gap-2">
          <span className="capitalize">page:</span>
          {pageIndex} / {meta?.totalPages}
        </div>

        <div className="flex gap-2">
          {meta?.hasPrevPage &&
            <button
              className="capitalize border transition-all flex items-center font-medium py-1 px-2 text-sm dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-slate-800 dark:border-gray-500"
              onClick={() => setPageIndex((prevState) => prevState - 1)}
            >
              prev
            </button>
          }

          {meta?.hasNextPage &&
            <button
              className="capitalize border transition-all flex items-center font-medium py-1 px-2 text-sm dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-slate-800 dark:border-gray-500"
              onClick={() => setPageIndex((prevState) => prevState + 1)}
            >
              next
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default PastLaunches;
