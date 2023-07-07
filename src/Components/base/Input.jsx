import classNames from 'classnames';

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

export default Input;
