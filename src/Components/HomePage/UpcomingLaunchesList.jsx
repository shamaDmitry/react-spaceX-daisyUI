import { Link } from 'react-router-dom';
import dayjs from "../../helpers/dayjs";
import Logo from '../shared/Logo';
import PropTypes from 'prop-types';

const UpcomingLaunchesList = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {items.length ? items?.map(item => {
        return (
          <Link
            to={`/launches/${item.id}`}
            key={item.id}
            className="flex gap-4 flex-col border dark:border-gray-500 p-4 transition  hover:scale-105"
          >
            <div className="flex flex-col items-center">
              {
                item.links.patch.small ?
                  <img
                    className="w-24 mb-3"
                    src={item.links.patch.small}
                    alt={item.name}
                    loading="lazy"
                  />
                  :
                  <div className="flex mx-auto items-center justify-center w-32 h-32 border rounded-full p-3 dark:bg-gray-500 dark:border-gray-500 dark:text-white mb-3">
                    <Logo className="w-full" />
                  </div>
              }

              <span className="text-lg font-bold">
                {item.name}
              </span>
              <span>
                {dayjs(item.date_local).format('LLL')}
              </span>
            </div>
          </Link>
        )
      }) : "Nothing is here"}
    </div>
  );
}

UpcomingLaunchesList.propTypes = {
  items: PropTypes.array.isRequired,
}

export default UpcomingLaunchesList;
