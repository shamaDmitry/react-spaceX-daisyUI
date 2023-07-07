import dayjs from "../../helpers/dayjs";
import useSWR from "swr";
import { fetcher } from '../../helpers/fetcher';
import ErrorAlert from "../base/ErrorAlert";
import Loader from "../base/Loader";
import Logo from "../shared/Logo";

import Counter from './Counter';

const NextLaunch = () => {
  const { data, error, isLoading } = useSWR(`/v4/launches/next`, fetcher)

  if (isLoading) return <Loader />

  if (error) return (
    <ErrorAlert
      text="Next launch failed"
    />
  )

  return (
    <div className="text-center min-h-16 mb-6">
      <div className="border inline-flex flex-col p-4 w-full max-w-lg dark:border-gray-900 shadow-2xl">
        <figure className="mb-4">
          {
            data.links.patch.small ?
              <img
                className="flex mx-auto w-52 h-52 object-contain"
                src={data.links.patch.small}
                alt={data.name}
              />
              :
              <div className="flex mx-auto items-center justify-center w-32 h-32 border rounded-full p-3 dark:bg-gray-500 dark:border-gray-500 dark:text-white">
                <Logo className="w-full" />
              </div>
          }
        </figure>

        <p>
          {dayjs(data.date_utc).format("LLL")}
        </p>

        <Counter
          isClosed={false}
          title={`Next launch: ${data.name}`}
          titleExpired={`Next launch ${data.name} expired`}
          targetTime={new Date(data.date_unix)}
        />
      </div>
    </div>
  );
}

export default NextLaunch;
