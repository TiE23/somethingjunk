import React from "react";
import PropTypes from "prop-types";

import segmentBuilder from "../segmentBuilder";
import HiLightSegment from "./HiLightSegment";

const HiLightDisplay = (props) => {
  const segmentData = segmentBuilder(props.textData);

  const segments = segmentData.map((segment, index) => {
    return (
      <HiLightSegment
        key={index}
        string={props.textData.string.slice(segment.start, segment.end)}
        style={segment.style === -1 ? null : {
          color: props.textData.highlights[segment.style].color,
          priority: props.textData.highlights[segment.style].priority,
        }}
        leftStretch={segment.leftStretch}
        rightStretch={segment.rightStretch}
        leftTrim={segment.leftTrim}
        rightTrim={segment.rightTrim}
      />
    )
  });

  return (
    <div className="flex">
      <div className="display">
        {segments}
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
