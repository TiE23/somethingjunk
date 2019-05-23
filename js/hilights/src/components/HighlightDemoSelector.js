import React from "react";
import PropTypes from "prop-types";

import times from "lodash/times";

/**
 * Very basic set of buttons. Nothing fancy at all. Just generates a button for the number of
 * choices we want and shows which button is selected.
 * @param props
 * @returns {*}
 * @constructor
 */
const HighlightDemoSelector = (props) => {
  return (
    <div>
      {times(props.choiceCount, index => (
        <button
          key={`button_${index}`}
          onClick={() => props.changeIndex(index)}
          style={{
            backgroundColor: props.selectedIndex === index ? "#cbf9db" : null,
            margin: "0 3px",
          }}
        >
          Text #{index + 1}
        </button>
      ))}
    </div>
  );
};

HighlightDemoSelector.propTypes = {
  choiceCount: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  changeIndex: PropTypes.func.isRequired,
};

export default HighlightDemoSelector;
