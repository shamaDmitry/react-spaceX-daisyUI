import useSWR from 'swr';
import { fetcher } from '../../helpers/fetcher';
import TimelineItem from './TimelineItem';
import { XCircleIcon } from '@heroicons/react/24/solid'

const TimelineList = () => {
  const { data, error, isLoading } = useSWR("/latest/history", fetcher);

  return (
    <>
      {isLoading && <div className="text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>}

      {error && <div className="alert alert-error dark:text-white">
        <XCircleIcon className="h-6 w-6 text-dark" />
        <span>Error! Task failed successfully.</span>
      </div>}

      <div className="relative border-l border-gray-300 dark:border-gray-700 ml-3">
        {data?.map((item) => <TimelineItem key={item.id} data={item} />)}
      </div>
    </>
  );
}

export default TimelineList;