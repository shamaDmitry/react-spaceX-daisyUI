import useSWR from "swr";

import dayjs from "../../helpers/dayjs";
import { fetcher } from '../../helpers/fetcher';

import ErrorAlert from "../base/ErrorAlert";
import Loader from "../base/Loader";

const UpcomingLaunches = () => {
  const { data, error, isLoading } = useSWR(`/v4/launches/upcoming`, fetcher)

  if (isLoading) return <Loader />

  if (error) return (
    <ErrorAlert
      text="Next launch failed"
    />
  )

  return (
    <section className="">
      <div className="grid grid-cols-4 gap-4">
        {data.map(item => {
          return (
            <div
              key={item.id}
              className="flex gap-4 mb-4 border p-4 flex-col dark:border-gray-500"
            >
              <span>
                {item.name}
              </span>
              <span>
                {dayjs(item.date_local).format('LLL')}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  );
}

export default UpcomingLaunches;
