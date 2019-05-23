const styleBuilder = (textData) => {
  const { string, highlights } = textData;

  // First build an array the length of the string and fill the array with starting data
  const styleArray = new Array(string.length).fill(-1);

  // Loop through the highlight data
  highlights.forEach((highlight, index) => {
    // Fill in the style array character by character of the offset range of the highlight
    if (highlight.startOffset < 0 || highlight.endOffset > string.length) {
      return;
    }
    for (let c = highlight.startOffset; c < highlight.endOffset; ++c) {
      // Check to see if the current highlight should overwrite the existing highlight
      if (styleArray[c] === -1 || // Always overwrite -1
        highlight.priority <= highlights[styleArray[c]].priority) {
        styleArray[c] = index;
      }
    }
  });

  // Now to build the span segments

  return styleArray;
};



export default styleBuilder;
