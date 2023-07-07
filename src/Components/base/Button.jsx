import classNames from "classnames";

const Button = ({ className, text, onClick }) => {
  return (
    <button
      className={classNames(`capitalize border transition-all flex items-center font-medium py-1 px-2 text-sm dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-slate-800 dark:border-gray-500 ${className}`)}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
