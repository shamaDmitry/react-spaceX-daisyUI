import classNames from 'classnames';
import PropTypes from 'prop-types';

const Input = ({ className, placeholder, onChange }) => {
  return (
    <input
      className={classNames(`border mb-6 py-2 px-4 w-full ${className} dark:border-gray-500 dark:text-white dark:bg-transparent`)}
      type="text"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
}

export default Input;
