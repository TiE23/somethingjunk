import React from "react";
import PropTypes from "prop-types";

import HighlightSegment from "./HighlightSegment";

import segmentBuilder from "../utils/segmentBuilder";

/**
 * Takes in the textData prop and has segmentData built for itself, creating an array of
 * HighlightSegment components to display in its display div.
 * @param props
 * @returns {*}
 * @constructor
 */
const HighlightDemoDisplay = (props) => {
  const segmentData = segmentBuilder(props.textData);

  const segments = segmentData.map((segment, index) => {
    return (
      <HighlightSegment
        key={index} // Not kosher, sorry!
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

HighlightDemoDisplay.propTypes = {
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

export default HighlightDemoDisplay;
