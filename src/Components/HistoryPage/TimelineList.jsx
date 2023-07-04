import useSWR from 'swr';
import { fetcher } from '../../helpers/fetcher';
import TimelineItem from './TimelineItem';
import { XCircleIcon } from '@heroicons/react/24/solid'
import Loader from "../base/Loader";

const TimelineList = () => {
  const { data, error, isLoading } = useSWR("/latest/history", fetcher);

  if (isLoading) return <Loader />

  if (error) return (
    <div className="alert alert-error dark:text-white">
      <XCircleIcon className="h-6 w-6 text-dark" />
      <span>Error! History failed.</span>
    </div>
  )

  return (
    <div className="relative border-l border-gray-300 dark:border-gray-700 ml-3">
      {data.map((item) => <TimelineItem key={item.id} data={item} />)}
    </div>
  );
}

export default TimelineList;
