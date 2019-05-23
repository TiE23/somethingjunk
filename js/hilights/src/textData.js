const data = [
  {
    string: "You will deliver new technology with an adorable puppy. Perfect!",
    /**
     * You will deliver new technology with an adorable puppy. Perfect!
     *     ^            ^ ^          ^      ^  ^      ^      ^ ^      ^
     *     4           17 19        30     37 40     47     54 56    63  <- Zero-start indexes
     * ----000000000000000011111111111------222333333332222222-44444444  <- Highlights
     *   4         16          11        6   3    8       7   1   8      <- Segment lengths
     */
    highlights: [
      {
        startOffset: 4, // "will deliver new"
        endOffset: 20,
        color: "#d9f593",
        priority: 0, // lower numbers are higher in priority
      },
      {
        startOffset: 17,  // "new technology"
        endOffset: 31,
        color: "#e8e8e8",
        priority: 1,
      },
      {
        startOffset: 37,  // "an adorable puppy."
        endOffset: 55,
        color: "#bfe6fc",
        priority: 1,
      },
      {
        startOffset: 40,  // "adorable"
        endOffset: 48,
        color: "#bfe6fc",
        priority: 0,
      },
      {
        startOffset: 56,  // "Perfect!"
        endOffset: 64,
        color: "#d9b981",
        priority: 0,
      },
    ],
  },
  {
    string: "You will deliver new technology with an adorable kitty. Awesome!",
    highlights: [
      {
        startOffset: 4,
        endOffset: 20,
        color: "#d9f593",
        priority: 0,
      },
      {
        startOffset: 17,
        endOffset: 31,
        color: "#e8e8e8",
        priority: 1,
      },
    ],
  },
];

export default data;
