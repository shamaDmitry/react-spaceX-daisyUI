import useSWR from "swr";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { fetcher } from '../../helpers/fetcher';

import Modal from '../base/Modal';
import ModalContent from './ModalContent';
import Loader from "../base/Loader";
import { Link } from "react-router-dom";

const CrewCard = ({ user }) => {
  const { data: launches, error, isLoading } = useSWR(`/v4/launches/${user.launches[0]}`, fetcher)

  const handleModalShow = (id) => {
    return window[`modal${id}`]?.showModal();
  }

  if (isLoading) return <div className="border card bg-base-100 shadow-xl dark:border-gray-700">
    <div className="card-body items-center">
      <Loader type="dots" />
    </div>
  </div>;

  if (error) return "An error has occurred.";

  return (
    <div className="border rounded-none card bg-base-100 shadow-xl dark:border-gray-700">
      <Link to={user.id}>
        <figure className={classNames("h-96 relative")}>
          <img className="absolute w-full object-cover left-0 top-0 " src={user.image} alt={user.name} loading="lazy" />
        </figure>
      </Link>

      <div className="card-body p-4">
        <Link
          to={user.id}
          className="card-title text-accent hover:text-accent-content pt-1"
        >
          {user.name}

          <span
            className={classNames("badge font-normal ", {
              "badge-success": user.status === "active",
              "badge-error": user.status !== "active",
            })}
          >
            {user.status}
          </span>
        </Link>

        <div className="flex gap-3 items-center">
          <span className="capitalize">agency:</span>
          <div className="badge badge-neutral">{user.agency}</div>
        </div>

        <div className="flex gap-3 items-center justify-starts flex-wrap">
          <span className="capitalize">Missions:</span>

          <div
            className="badge badge-neutral whitespace-nowrap cursor-pointer max-w-full overflow-hidden text-ellipsis"
            onClick={() => handleModalShow(user.id)}
          >
            {launches.name}
          </div>

          <Modal
            id={`modal${user.id}`}
            title="Mission"
            className="modal-bottom sm:modal-middle"
          >
            <ModalContent data={launches} />
          </Modal>
        </div>
      </div>
    </div >
  );
}

CrewCard.propTypes = {
  user: PropTypes.object.isRequired
}

export default CrewCard;
