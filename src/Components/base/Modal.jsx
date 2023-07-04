import PropTypes from 'prop-types';
import classNames from "classnames";

const Modal = ({ id, className, title, children }) => {
  return (
    <dialog id={id} className={classNames(`modal ${className}`)}>
      <form method="dialog" className="modal-box w-full max-w-3xl">
        <button className="btn btn-circle btn-ghost absolute right-2 top-2">✕</button>

        <h3 className="font-bold text-lg mb-3 px-9 text-center">
          {title}
        </h3>

        {children}
      </form>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

Modal.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
}

export default Modal;
