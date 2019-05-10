import React from "react";
import PropTypes from "prop-types";

const GitCheckerInput = (props) => {
  return (
    <input
      className="userinput"
      type="text"
      id={props.id}
      placeholder={`userName${props.id}`}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

GitCheckerInput.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GitCheckerInput;
