import classNames from 'classnames';
import PropTypes from 'prop-types';

const BackLink = ({ text, onClick, className }) => {
  return (
    <button
      className={classNames(`border transition-all flex items-center font-medium py-1 px-2 text-sm dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-slate-800 ${className}`)}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
      </svg>

      {text}
    </button>
  );
}
BackLink.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default BackLink;
