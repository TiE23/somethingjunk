import React from "react";
import PropTypes from "prop-types";

const HiLightSegment = (props) => {
  // If the segment is a highlight
  if (props.style) {
    // Set the style information
    const highlightStyle = {
      backgroundColor: props.style.color,
      zIndex: props.style.priority * -1,  //
    };

    const classes = ["segment"];
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
  } else {  // Plain, un-highlighted span
    return (
      <span>{props.string}</span>
    )
  }
};

HiLightSegment.propTypes = {
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

HiLightSegment.defaultProps = {
  style: null,
};

export default HiLightSegment;
