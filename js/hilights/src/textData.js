const data = [
  // Demo string
  {
    string: "You will deliver new technology with an adorable puppy. Perfect!",
    /**
     * You will deliver new technology with an adorable puppy. Perfect!
     *     ^            ^ ^          ^      ^  ^      ^      ^ ^      ^
     *     4           17 19        30     37 40     47     54 56    63  <- Zero-start indexes
     * ----000000000000000011111111111------222333333332222222-44444444  <- Styles (- is -1/none)
     *   4         16          11        6   3    8       7   1   8      <- Segment lengths
     *                        ls            rs           ls              <- Stretches
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

  // Testing an un-highlighted string
  {
    string: "You will deliver new technology with an adorable puppy. Perfect!",
    highlights: [],
  },

  // Testing some bad highlights
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
        startOffset: 17,  // Out of range
        endOffset: 31,
        color: "#e8e8e8",
        priority: 1,
      },
      {
        startOffset: -1,
        endOffset: 3,     // Negative range
        color: "#e8e8e8",
        priority: 1,
      },
      {
        startOffset: 3,
        endOffset: 1,     // Backwards range
        color: "#e8e8e8",
        priority: 1,
      },
      {
        startOffset: 1,
        endOffset: 4,
        color: "#e8e8e8",
        priority: -10,    // Negative priority
      },
    ],
  },

  // Testing a heavily nested sentence
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

  // Showing extra space handling (pre-wrap)
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

  // Highlighting the whole string, and nesting further inside
  {
    string: "The whole thing!",
    highlights: [
      {
        startOffset: 0,
        endOffset: 16,
        color: "#d9f593",
        priority: 4,
      },
      {
        startOffset: 0,
        endOffset: 16,
        color: "#f58e56",
        priority: 4,  // Same priority as above means this takes precedent
      },
      {
        startOffset: 1,
        endOffset: 15,
        color: "#50f53c",
        priority: 3,
      },
      {
        startOffset: 2,
        endOffset: 14,
        color: "#f581c2",
        priority: 2,
      },
      {
        startOffset: 3,
        endOffset: 13,
        color: "#93f5b2",
        priority: 1,
      },
      {
        startOffset: 4,
        endOffset: 12,
        color: "#1799f5",
        priority: 0,
      },
    ],
  },

  // Showing trim (keeping padding+margins flush
  {
    string: "Trimming. Not here",
    highlights: [
      {
        startOffset: 0,
        endOffset: 9,
        color: "#6ef5ae",
        priority: 1,
      },
      {
        startOffset: 2,
        endOffset: 5,
        color: "#d9f593",
        priority: 0,
      },
      {
        startOffset: 10,
        endOffset: 13,
        color: "#d9f593",
        priority: 0,
      },
      {
        startOffset: 14,
        endOffset: 18,
        color: "#d9f593",
        priority: 0,
      },
    ],
  },

  // Showing a conflicting priority issue
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

  // Handling a blank string
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
];

export default data;
