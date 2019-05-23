/**
 * This function takes the combined textData object of the string and the highlight details
 * and returns an array of objects called "segments".
 *
 * The FIRST step involves iterating through the textData's highlights array, creating a
 * "styleArray" by iterating through the offset ranges and recording the desired style
 * that will need to be applied to each character in the string. I suspect there is a better method
 * but this is the style I stuck with.
 *
 * The SECOND step involves constructing the segments. It does this by iterating through the
 * style array and on each occasion it runs into a new style it creates a new segment.
 *   Overlapping highlights are handled with the setting of leftStretch and rightStretch variables
 * that will inform how CSS for the highlight is later handled to give an illusion of layered
 * highlights.
 *   Additionally, there is a "trim" feature that reduces the padding+margin around highlights that
 *   end or start besides non-blank characters, improving readability.
 *
 * @param textData
 * @returns {Array}
 */
const segmentBuilder = (textData) => {
  const { string, highlights } = textData;

  // First build an array the length of the string and fill the array with -1
  const styleArray = new Array(string.length).fill(-1);

  // Loop through the highlight data
  // Fill in the style array character by character of the offset range of the highlight
  highlights.forEach((highlight, index) => {
    // Disallow styles with bad offsets or negative priorities
    if (highlight.startOffset < 0 || highlight.endOffset > string.length ||
      highlight.priority < 0 || highlight.startOffset >= highlight.endOffset
    ) {
      return;
    }
    for (let c = highlight.startOffset; c < highlight.endOffset; ++c) {
      // Check to see if the current highlight should overwrite the existing highlight
      if (styleArray[c] === -1 ||
        highlight.priority <= highlights[styleArray[c]].priority) {
        styleArray[c] = index;
      }
    }
  });

  // Now to build the span segments
  const segments = [];
  let segmentNum = 0;

  let prevStyle;

  for (let s = 0; s < styleArray.length; ++s) {
    if (prevStyle === undefined || prevStyle !== styleArray[s]) {
      segments.push({
        style: styleArray[s],
        start: s,
        end: string.length,
        leftStretch: false,
        rightStretch: false,
        leftTrim: false,
        rightTrim: false,
      });

      // Check the previous segment and see if its highlight priority if higher (lower number)
      if (styleArray[s] !== -1 && segmentNum > 0 && segments[segmentNum - 1].style !== -1 &&
        highlights[segments[segmentNum - 1].style].priority < highlights[styleArray[s]].priority
      ) {
        segments[segmentNum].leftStretch = true;
      }

      // Check the previous character in the string if it's not a space
      if (s > 0 && string[s - 1] !== " ") {
        // We do not want to trim if stretch is set
        segments[segmentNum].leftTrim = !segments[segmentNum].leftStretch;
      }

      // Look back one segment to perform so look-behind adjustments
      if (segmentNum > 0) {
        // Mark the previous segment's end offset
        segments[segmentNum - 1].end = s;

        // If the previous segment's priority was lower (higher number), mark rightStretch
        if (segments[segmentNum - 1].style !== -1 && styleArray[s] !== -1 &&
          highlights[segments[segmentNum - 1].style].priority > highlights[styleArray[s]].priority
        ) {
          segments[segmentNum - 1].rightStretch = true;
        }

        // If the current character in the string is not a space, mark rightTrim on prev segment
        if (string[s] !== " " && s < styleArray.length - 1) {
          // We do not want to trim if stretch is set
          segments[segmentNum - 1].rightTrim = !segments[segmentNum - 1].rightStretch;
        }
      }

      // Onto the next index...
      ++segmentNum;
      prevStyle = styleArray[s];
    }
  }

  return segments;
};


export default segmentBuilder;
