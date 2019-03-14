import React from "react";
import PropTypes from "prop-types";
import SingleShot from "./SingleShot";

const ShotsList = (props) => {
  return (
    <div>
      <h1>ShotsList</h1>
      {props.shots.map(({ name, payload }, index) => (
        <SingleShot
          key={`${name}_${index}`}
          name={name}
          payload={payload}
        />
      ))}
    </div>
  );
};

ShotsList.propTypes = {
  shots: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    payload: PropTypes.arrayOf(PropTypes.object).isRequired,
  })).isRequired, // Shots array is required but can be empty
};

export default ShotsList;
