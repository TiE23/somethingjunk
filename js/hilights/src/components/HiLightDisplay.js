import React from "react";
import PropTypes from "prop-types";
import styleBuilder from "../styleBuilder";

const HiLightDisplay = (props) => {
  const buildResults = styleBuilder(props.textData);
  console.log(buildResults);

  return (
    <div className="flex">
      <div className="display">
        HiLightDisplay
      </div>
    </div>
  );
};

HiLightDisplay.propTypes = {
  textData: PropTypes.shape({
    string: PropTypes.string.isRequired,
    highlights: PropTypes.arrayOf(
      PropTypes.shape({
        startOffset: PropTypes.number.isRequired,
        endOffset: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        priority: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default HiLightDisplay;
