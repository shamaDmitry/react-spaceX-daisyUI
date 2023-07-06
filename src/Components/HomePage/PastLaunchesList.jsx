import { Link } from "react-router-dom";
import dayjs from "../../helpers/dayjs";

const PastLaunchesList = ({ items }) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {
        items?.map(item => {
          return (
            <Link
              to={`/launches/${item.id}`}
              key={item.id}
              className="flex gap-4 flex-col border dark:border-gray-500 p-4 transition  hover:scale-105"
            >
              <div className="flex flex-col">
                <span className="text-lg font-bold">
                  {item.name}
                </span>
                <span>
                  {dayjs(item.date_local).format('LLL')}
                </span>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}

export default PastLaunchesList;