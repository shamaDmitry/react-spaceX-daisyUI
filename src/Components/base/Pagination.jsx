import classNames from 'classnames';
import Button from './Button';
import PropTypes from 'prop-types';

const buttonList = (totalPages, active, onClick) => {
  return Array.from({ length: totalPages }, (_, i) => {
    return (
      <button
        key={i}
        onClick={() => onClick((prevState) => ({
          ...prevState,
          page: i + 1
        }))}
        className={classNames("join-item btn btn-sm capitalize border transition-all flex items-center dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-slate-800 dark:border-gray-500", {
          "btn-active text-white bg-black dark:bg-white dark:text-black": active === i + 1
        })}
      >
        {i + 1}
      </button>
    )
  })
}

const Pagination = ({ page, totalPages, hasPrevPage, hasNextPage, setOptions }) => {
  return (
    <div className="flex items-center md:items-baseline justify-end gap-3 my-6 flex-col md:flex-row">
      <div className="flex gap-2 whitespace-nowrap">
        <span className="capitalize ">page:</span>
        <span className="font-bold">{page}</span>/
        <span className="">{totalPages}</span>
      </div>

      <div className="flex gap-2 flex-wrap justify-center">
        {hasPrevPage &&
          <Button
            text="Prev"
            onClick={() => setOptions((prevState) => {
              return {
                ...prevState,
                page: prevState.page - 1
              }
            })}
          />
        }
        <div className="join flex-wrap rounded-none gap-2">
          {totalPages && buttonList(totalPages, page, setOptions)}
        </div>

        {hasNextPage &&
          <Button
            text="Next"
            onClick={() => setOptions((prevState) => {
              return {
                ...prevState,
                page: prevState.page + 1
              }
            })}
          />
        }
      </div>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  totalPages: PropTypes.number,
  hasPrevPage: PropTypes.bool,
  hasNextPage: PropTypes.bool,
  setOptions: PropTypes.func,
}

export default Pagination;
