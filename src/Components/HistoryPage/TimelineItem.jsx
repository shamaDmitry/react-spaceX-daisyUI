import PropTypes from 'prop-types';
import dayjs from "../../helpers/dayjs";

const TimelineItem = ({ data }) => {
  const {
    title,
    event_date_utc,
    details,
    links,
  } = data;

  return (
    <div className="mb-10 ml-8">
      <span
        className="p-1 absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-800 dark:text-blue-300">
          <path fillRule="evenodd" d="M9.75 6.75h-3a3 3 0 00-3 3v7.5a3 3 0 003 3h7.5a3 3 0 003-3v-7.5a3 3 0 00-3-3h-3V1.5a.75.75 0 00-1.5 0v5.25zm0 0h1.5v5.69l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.72 1.72V6.75z" clipRule="evenodd" />
          <path d="M7.151 21.75a2.999 2.999 0 002.599 1.5h7.5a3 3 0 003-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 01-4.5 4.5H7.151z" />
        </svg>
      </span>

      <h1 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
        {title}

        {/* {
          index === 0 &&
          <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
            Latest
          </span>
        } */}
      </h1>

      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {dayjs(event_date_utc).format('LLL')}
      </time>

      <p className="mb-2 text-base font-normal text-gray-800 dark:text-gray-400">
        {details}
      </p>

      {
        links.article &&
        <a
          href={links?.article}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
        >
          Details: {links?.article}
        </a>
      }
    </div>
  );
}

TimelineItem.propTypes = {
  data: PropTypes.object.isRequired
}

export default TimelineItem;
