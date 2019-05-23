import React from "react";
import PropTypes from "prop-types";

import times from "lodash/times";

const HiLightDemoSelector = (props) => {
  return (
    <div>
      {times(props.choiceCount, index => (
        <button
          key={`button_${index}`}
          onClick={() => props.changeIndex(index)}
          style={{ backgroundColor: props.selectedIndex === index ? "#cbf9db" : null }}
        >
          Text #{index + 1}
        </button>
      ))}
    </div>
  );
};

HiLightDemoSelector.propTypes = {
  choiceCount: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  changeIndex: PropTypes.func.isRequired,
};

export default HiLightDemoSelector;
