import { Link } from "react-router-dom";
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
      <div className="grid grid-cols-5 gap-4">
        {data.map(item => {
          return (
            <Link
              to={`/launches/${item.id}`}
              key={item.id}
              className="flex gap-4 flex-col border dark:border-gray-500 p-4 transition  hover:scale-105"
            >
              <span className="text-lg font-bold">
                {item.name}
              </span>
              <span>
                {dayjs(item.date_local).format('LLL')}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  );
}

export default UpcomingLaunches;
