import React from "react";

const Sample = () => {
  const baseStyle = {
    boxSizing: "border-box",
    position: "relative", // Required to get zIndex to work
    borderRadius: "0.4em",
    padding: "0 0.1em",
    // border: "solid white 0.1em", // If I can't define overlay, just use this
  };
  const rightUnder = {  // For highlights that are beneath other highlights' right side
    paddingLeft: "1ch",
    marginLeft: "-1ch",
  };
  const leftUnder = { // For highlights that are beneath other highlights' left
    paddingRight: "1ch",
    marginRight: "-1ch",
  };
  const interWord = { // Narrower padding for highlights with characters on each side (stretch goal)
    paddingLeft: "0",
    paddingRight: "0",
  };
  const overlay = {
    border: "solid white 0.1em",
  };

  const style01 = {
    backgroundColor: "#d9f593",
    zIndex: 0,  // Highest priority
  };
  const style02 = {
    backgroundColor: "#e8e8e8",
    zIndex: -1,
  };
  const style03 = {
    backgroundColor: "#bfe6fc",
    zIndex: -2,
  };
  const style04 = {
    backgroundColor: "#f1ce90",
    zIndex: -3,
  };

  return (
    <div>
      You <span style={{...baseStyle, ...style01, ...overlay}}>will deliver new</span> <span style={{...baseStyle, ...style02, ...rightUnder}}>technology</span> with <span style={{...baseStyle, ...style03, ...leftUnder}}>an</span> <span style={{...baseStyle, ...style01, ...overlay}}>adorable</span> <span style={{...baseStyle, ...style03, ...rightUnder}}>puppy.</span> <span style={{...baseStyle, ...style04}}>Perfect!</span> <span style={{...baseStyle, ...style01, ...interWord}}>Word</span>! In<span style={{...baseStyle, ...style01, ...interWord}}>ter</span>word. Single ch<span style={{...baseStyle, ...style01, ...interWord}}>a</span>r.
    </div>
  );
};

export default Sample;
