import React from "react";
import PropTypes from "prop-types";

/**
 * This is the segment component. It is a styled span element that is used to represent highlighted
 * sections of a string. Using a combination of style and className attributes the appearance
 * of each segment is defined.
 * @param props
 * @returns {*}
 * @constructor
 */
const HighlightSegment = (props) => {
  // If the segment is a highlight
  if (props.style) {
    // Set the style information
    const highlightStyle = {
      backgroundColor: props.style.color,
      zIndex: props.style.priority * -1,  //
    };

    // Naive classes management.
    const classes = ["basicSegment"];
    if (props.leftStretch) classes.push("leftStretchSegment");
    if (props.rightStretch) classes.push("rightStretchSegment");
    if (props.leftTrim) classes.push("leftTrimSegment");
    if (props.rightTrim) classes.push("rightTrimSegment");

    return (
      <span
        style={highlightStyle}
        className={classes.join(" ")}
      >
        {props.string}
      </span>
    );

  // The segment is not a highlight
  } else {
    return <span>{props.string}</span>;
  }
};

HighlightSegment.propTypes = {
  string: PropTypes.string.isRequired,
  style: PropTypes.shape({
    color: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
  }),
  leftStretch: PropTypes.bool.isRequired,
  rightStretch: PropTypes.bool.isRequired,
  leftTrim: PropTypes.bool.isRequired,
  rightTrim: PropTypes.bool.isRequired,
};

HighlightSegment.defaultProps = {
  style: null,
};

export default HighlightSegment;
