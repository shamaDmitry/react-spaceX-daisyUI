import useSWR from "swr";

import dayjs from "../../helpers/dayjs";
import { fetcher, _axios } from '../../helpers/fetcher';

import ErrorAlert from "../base/ErrorAlert";
import Loader from "../base/Loader";

const PastLaunches = () => {
  // const { data, error, isLoading } = useSWR(`/v4/launches/past`, fetcher)
  const { data, error, isLoading } = useSWR(`/v4/launches/query`, (url) => {
    return _axios.post(url, {
      "query": {
        // "$text": {
        //   "$search": "blue"
        // }
      },
      "options": {
        limit: 10,
        page: 10,
        "populate": [
          {
            path: "launchpad",
            populate: [
              "launches"
            ]
          },
          {
            "path": "rocket",
            "select": ['name', 'country', 'description']
          }
        ]
      },
    })
  })

  console.log(data);

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

  if (isLoading) return <Loader />

  if (error) return (
    <ErrorAlert
      text="Latest launches failed"
    />
  )

  return (
    <div className="grid grid-cols-4 gap-4">
      {data.data.docs.map(item => {
        return (
          <div
            key={item.id}
            className="flex gap-4 mb-4 flex-col border dark:border-gray-500 p-4 h-40 overflow-auto"
          >
            <div className="flex flex-col gap-4">
              <span>
                {item.name}
              </span>
              <span>
                {dayjs(item.date_local).format('LLL')}
              </span>
            </div>
            <div>
              {item.details}
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default PastLaunches;
