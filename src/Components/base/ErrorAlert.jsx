import PropTypes from 'prop-types';
import { XCircleIcon } from "@heroicons/react/24/solid";

const ErrorAlert = ({ text }) => {
  return (
    <div className="alert alert-error dark:text-white max-w-lg mx-auto">
      <XCircleIcon className="h-6 w-6 text-dark" />
      <span>Error! {text}</span>
    </div>
  );
}

ErrorAlert.propTypes = {
  text: PropTypes.string.isRequired
}

export default ErrorAlert;
