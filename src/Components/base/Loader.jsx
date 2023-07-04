import classNames from 'classnames';
import PropTypes from 'prop-types';

// type = spinner, dots, ring, ball, bars, infinity
// size = xs, sm, md, lg

const Loader = ({ type = "spinner", size = "md" }) => {
  return (
    <div className="text-center">
      <span className={classNames("loading", {
        "loading-spinner": type === "spinner",
        "loading-dots": type === "dots",
        "loading-ring": type === "ring",
        "loading-ball": type === "ball",
        "loading-bars": type === "bars",
        "loading-infinity": type === "infinity",
        "loading-xs": size === "xs",
        "loading-sm": size === "sm",
        "loading-md": size === "md",
        "loading-lg": size === "lg",
      })} />
    </div>
  );
}

Loader.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
}

export default Loader;
