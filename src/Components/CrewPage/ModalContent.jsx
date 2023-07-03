import PropTypes from 'prop-types';

const ModalContent = ({ data }) => {
  return (
    <div className="flex gap-4 flex-col justify-center items-center">
      <figure className="max-w-[150px] flex-shrink-0 ">
        <img src={data.links.patch.small} alt="" loading="lazy" />
      </figure>

      <div>
        <h1 className="font-medium text-xl mb-1">
          {data.name}
        </h1>

        <p className="text-sm">
          {data.details || "no content"}
        </p>
      </div>
    </div>
  );
}

ModalContent.propTypes = {
  data: PropTypes.object.isRequired
}

export default ModalContent;
