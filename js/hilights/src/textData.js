const data = [
  {
    string: "You will deliver new technology with an adorable puppy. Perfect!",
    /**
     * You will deliver new technology with an adorable puppy. Perfect!
     *     ^            ^ ^          ^      ^  ^      ^      ^ ^      ^
     *     4           17 19        30     37 40     47     54 56    63  <- Zero-start indexes
     * ----000000000000000011111111111------222333333332222222-44444444  <- Highlights
     *   4         16          11        6   3    8       7   1   8      <- Segment lengths
     *                        ls            rs           ls
     *
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
        color: "#d9f593",
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
    string: "You will deliver new technology with an adorable puppy. Perfect!",
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
  {
    string: "You will deliver new technology with an adorable puppy. Perfect!",
    highlights: [],
  },
  {
    string: "Short sentence.",
    highlights: [
      {
        startOffset: 4,
        endOffset: 5,
        color: "#d9f593",
        priority: 0,
      },
      // Invalid highlights
      {
        startOffset: 17,
        endOffset: 31,
        color: "#e8e8e8",
        priority: 1,
      },
      {
        startOffset: -1,
        endOffset: 3,
        color: "#e8e8e8",
        priority: 1,
      },
      {
        startOffset: 1,
        endOffset: 4,
        color: "#e8e8e8",
        priority: -10,
      },
    ],
  },
  {
    string: "Heavily nested sentence.",
    highlights: [
      {
        startOffset: 8,
        endOffset: 24,
        color: "#d9f593",
        priority: 3,
      },
      {
        startOffset: 10,
        endOffset: 20,
        color: "#7eedf5",
        priority: 2,
      },
      {
        startOffset: 12,
        endOffset: 15,
        color: "#7ef55c",
        priority: 1,
      },
      {
        startOffset: 16,
        endOffset: 18,
        color: "#e3f574",
        priority: 1,
      },
      {
        startOffset: 4,
        endOffset: 9,
        color: "#f566dc",
        priority: 1,
      },
    ],
  },
  {
    string: "More   spaces  than necessary.",
    highlights: [
      {
        startOffset: 4,
        endOffset: 7,
        color: "#d9f593",
        priority: 0,
      },
      {
        startOffset: 12,
        endOffset: 16,
        color: "#f5c431",
        priority: 0,
      },
    ],
  },
  {
    string: "The whole thing!",
    highlights: [
      {
        startOffset: 0,
        endOffset: 16,
        color: "#d9f593",
        priority: 3,
      },
      {
        startOffset: 0,
        endOffset: 16,
        color: "#f58e56",
        priority: 3,  // Same priority as above means this takes precedent
      },
      {
        startOffset: 1,
        endOffset: 15,
        color: "#c0f568",
        priority: 2,
      },
      {
        startOffset: 2,
        endOffset: 14,
        color: "#f581c2",
        priority: 1,
      },
      {
        startOffset: 3,
        endOffset: 13,
        color: "#93f5b2",
        priority: 0,
      },
    ],
  },
  {
    string: "",
    highlights: [
      {
        startOffset: 0,
        endOffset: 16,
        color: "#d9f593",
        priority: 3,
      },
    ],
  },
  {
    string: "Z-fighting issue.",
    highlights: [
      {
        startOffset: 1,
        endOffset: 16,
        color: "#d9f593",
        priority: 3,
      },
      {
        startOffset: 3,
        endOffset: 14,
        color: "#8ac8f5",
        priority: 3,
      },
    ],
  },
  {
    string: "Trimming",
    highlights: [
      {
        startOffset: 2,
        endOffset: 5,
        color: "#d9f593",
        priority: 0,
      },
    ],
  },
];

export default data;
