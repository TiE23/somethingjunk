/* eslint-disable no-console, camelcase */

// 1.1 ////////////////////////////////////////////////////////////////////////////////////////////
// Implement an algorithm to determine if a string has all unique characters. What if you cannot use
// additional data structures?
const q1_1 = (input) => {
  const foundCharacters = {};

  for (let x = 0; x < input.length; ++x) {
    if (foundCharacters[input[x]]) {
      return false;
    } else {
      foundCharacters[input[x]] = true;
    }
  }
  return true;

  // Notes:
  // Should ask if it's ASCII or unicode just to seem like a boring moron.
};

// console.log("help!", q1_1("help!"));
// console.log("help me!", q1_1("help me!"));
// console.log("", q1_1(""));
// console.log("a", q1_1("a"));
// console.log("aa", q1_1("aa"));


// 1.3 ////////////////////////////////////////////////////////////////////////////////////////////
// Given two strings, write a method to decide if one is a permutation of the other.
function q1_3(left, right) {
  if (left.length !== right.length) return false;

  const leftLetters = {};

  // Get the present letters for left
  for (let x = 0; x < left.length; ++x) {
    if (leftLetters[left[x]]) {
      leftLetters[left[x]] += 1;
    } else {
      leftLetters[left[x]] = 1;
    }
  }

  // Check all the letters
  for (let x = 0; x < right.length; ++x) {
    if (leftLetters[right[x]] && leftLetters[right[x]] > 0) {
      leftLetters[right[x]] -= 1;
    } else {
      return false;
    }
  }

  return true;

  // Notes:
  // Should ask if the function should be case sensitive (I assumed yes).
  // Another neat solution is to split the strings into an array and then sort the two arrays. If
  // the arrays are identical, then yeah, they're anagrams.
}

// console.log("", "", q1_3("", ""));
// console.log("a", "a", q1_3("a", "a"));
// console.log("a", "b", q1_3("a", "b"));
// console.log("a", "bc", q1_3("a", "bc"));
// console.log("hello, world", q1_3("hello", "world"));
// console.log("listen, silent", q1_3("listen", "silent"));
// console.log("listen please, silent please", q1_3("listen please", "silent please"));


// 1.4 ////////////////////////////////////////////////////////////////////////////////////////////
// Write a method to replace ALL spaces with "%20. Ex: "Hello Mr    Doe     " -> "Hello%20Mr%20Doe"
function q1_4(input) {
  // return input.trim().replace(/ +/g, "%20");

  // Notes:
  // Above I'm doing it the "realistic way" using regex here. I'd argue that I'm going to write code
  // the way I would write it in real life and not write some gross for loop like some first
  // semester coding school assignment.

  // Below is how I'd do it without trim() and replace(). But I still use join() because that's
  // intensely easy to write myself if needed.
  const output = [];
  let currWord = "";

  for (let x = 0; x < input.length; ++x) {
    if (input[x] !== " ") {
      currWord += input[x];
    } else if (currWord) {
      output.push(currWord);
      currWord = "";
    }
  }

  if (currWord) output.push(currWord);

  return output.join("%20");
}

// console.log("", "->", q1_4(""));
// console.log("    ", "->", q1_4("    "));
// console.log("Hello", "->", q1_4("Hello"));
// console.log("Hello Mr    Doe     ", "->", q1_4("Hello Mr    Doe     "));
// console.log("Hello world", "->", q1_4("Hello world"));


// 1.5 ////////////////////////////////////////////////////////////////////////////////////////////
// Write a simple algorithm to "compress" a string. For example, "aabbbcddd" would become "a2b3c1d3"
// If the "compressed" string is longer, just return the original.
function q1_5(input) {
  let output = "";

  let count = 0;
  let prevLetter = "";

  for (let x = 0; x < input.length; ++x) {
    if (prevLetter !== "" && prevLetter !== input[x]) {
      output += `${prevLetter}${count}`;
      count = 0;
    }

    prevLetter = input[x];
    ++count;
  }

  if (prevLetter) {
    output += `${prevLetter}${count}`;
  }

  if (output.length > input.length) {
    return input;
  }

  return output;
}

// console.log("a", q1_5("a"));
// console.log("aa", q1_5("aa"));
// console.log("aab", q1_5("aab"));
// console.log("aabb", q1_5("aabb"));


// 1.6 ////////////////////////////////////////////////////////////////////////////////////////////
// Given an image represented by an NxN matrix, where each pixel is the image is 4 bytes, write a
// method to rotate the image by 90 degrees. Can you do it in place?
// Qs: Can I simply use a 2-dimensional array with string characters?
function q1_6(image) {
  const rotatedImage = [];

  // This I just recognize a pattern where I work up from the bottom and write left-to-right.
  for (let inY = image.length - 1; inY >= 0; --inY) {
    for (let inX = 0; inX < image[inY].length; ++inX) {
      if (!rotatedImage[inX]) {
        rotatedImage[inX] = [];
      }
      rotatedImage[inX].push(image[inY][inX]);
    }
  }
  return rotatedImage;
}

function q1_6b(image) {
  const n = image.length;  // Get the width/height of image

  for (let layer = 0; layer < n; ++layer) {
    const first = layer;
    const last = n - 1 - layer;
    for (let x = first; x < last; ++x) {
      const offset = x - first;

      // Save top
      const top = image[first][x];

      // Left to top
      image[first][x] = image[last - offset][first];

      // Bottom to left
      image[last - offset][first] = image[last][last - offset];

      // Right to bottom
      image[last][last - offset] = image[x][last];

      // Top to right
      image[x][last] = top;
    }
  }

  return image;
}

const img1x1 = [
  ["a"],
];
const img2x2 = [
  ["a", "b"],
  ["c", "d"],
];
const img3x3 = [
  ["a", "b", "c"],
  ["d", "e", "f"],
  ["g", "h", "i"],
];
const img4x4 = [
  ["a", "b", "c", "d"],
  ["e", "f", "g", "h"],
  ["i", "j", "k", "l"],
  ["m", "n", "o", "p"],
];

// console.log(img1x1, q1_6(img1x1));
// console.log(img2x2, q1_6(img2x2));
// console.log(img3x3, q1_6(img3x3));
// console.log(img4x4, q1_6(img4x4));
// console.log("---");
// console.log(img1x1, q1_6b(img1x1));
// console.log(img2x2, q1_6b(img2x2));
// console.log(img3x3, q1_6b(img3x3));
// console.log(img4x4, q1_6b(img4x4));


// 1.7 ////////////////////////////////////////////////////////////////////////////////////////////
// Write an algorithm such that if in an element in an MxN matrix is 0, its entire row and column
// are set to 0.
function q1_7(input) {
  const matrix = [];
  const zeroes = [];

  for (let y = 0; y < input.length; ++y) {
    matrix[y] = [];
    for (let x = 0; x < input[y].length; ++x) {
      matrix[y][x] = input[y][x];
      if (input[y][x] === 0) {
        zeroes.push({ x, y });
      }
    }
  }

  zeroes.forEach((zero) => {
    for (let y = 0; y < matrix.length; ++y) {
      const allY = y === zero.y;
      for (let x = 0; x < matrix[y].length; ++x) {
        if (allY || x === zero.x) {
          matrix[y][x] = 0;
        }
      }
    }
  });

  return matrix;

  // Notes:
  // Looks like another option would be to simply keep an array of columns and rows to zero-out
  // as an alternative to my zeroes number pair objects.
}

const matrixA = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

const matrixB = [
  [1, 1, 1, 1],
  [1, 0, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 0],
  [1, 1, 1, 1],
];

// console.log(matrixA, q1_7(matrixA));
// console.log(matrixB, q1_7(matrixB));

// 1.8 ////////////////////////////////////////////////////////////////////////////////////////////
// Assume you have a method isSubstring which checks if one word is a substring of another. Given
// two strings, s1 and s2, write code to check if s2 is a rotation of s1 using only one call to
// isSubstring (e.g., "waterbottle is a rotation of "erbottlewat")
function q1_8(needle, haystack) {
  // I'm going to use the standard string function includes().
  return (haystack + haystack).includes(needle);

  // Notes:
  // This is really simple. Just concat the rotated string twice and run includes() against it.
  // Okay, this is a good point to make: even when the solution is real simple it counts to write
  // some base cases to save time. Check if either string is empty, and check that both strings
  // are the same length before doing the rest of the function.
}

console.log("waterbottle", "erbottlewat", q1_8("waterbottle", "erbottlewat"));
