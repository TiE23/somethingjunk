/* eslint-disable no-console, camelcase */
// To confirm that ES6 import syntax works. https://stackoverflow.com/a/36821986/3120546

// import { findIndex } from "lodash";
import performance from "performance-now";
import https from "https";

//
// const abc = ["A", "B", "C"];
// console.log(findIndex(abc, o => o === "B"));

// let a = ["A", "B", "C"];
// let b = ["D", "E", "F"];
// console.log([...a, ...b]);
// console.log(3 ** 3);

// /////////////////////////////////////////////////////////////////////////////////////////////////
// Chapter 1 - Arrays and Strings
// 1.1 /////////////////////////////////////////////////////////////////////////////////////////////
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


// 1.3 /////////////////////////////////////////////////////////////////////////////////////////////
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


// 1.4 /////////////////////////////////////////////////////////////////////////////////////////////
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


// 1.5 /////////////////////////////////////////////////////////////////////////////////////////////
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


// 1.6 /////////////////////////////////////////////////////////////////////////////////////////////
// Given an image represented by an NxN matrix, where each pixel is the image is 4 bytes, write a
// method to rotate the image by 90 degrees. Can you do it in place?
// Qs: Can I simply use a 2-dimensional array with string characters?
function q1_6(image) {
  const rotatedImage = [];

  // This I just recognize a pattern where I work up from the bottom and write left-to-right.
  for (let row = image.length - 1; row >= 0; --row) {
    for (let col = 0; col < image[row].length; ++col) {
      if (!rotatedImage[col]) {
        rotatedImage[col] = [];
      }
      rotatedImage[col].push(image[row][col]);
    }
  }
  return rotatedImage;
}

// In place solution.
function q1_6b(image) {
  const size = image.length;  // Get the width/height of image
  const halfSize = Math.floor(size / 2);
  for (let layer = 0; layer < halfSize; ++layer) {
    const last = size - 1 - layer;
    for (let x = layer; x < last; ++x) {
      const offset = x - layer;

      // Save top
      const top = image[layer][x];

      // Left to top
      image[layer][x] = image[last - offset][layer];

      // Bottom to left
      image[last - offset][layer] = image[last][last - offset];

      // Right to bottom
      image[last][last - offset] = image[x][last];

      // Top to right
      image[x][last] = top;
    }
  }

  return image;
}

const img1x1 = [
  ["1"],
];
const img2x2 = [
  ["1", "2"],
  ["3", "4"],
];
const img3x3 = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];
const img4x4 = [
  [" 1", " 2", " 3", " 4"],
  [" 5", " 6", " 7", " 8"],
  [" 9", "10", "11", "12"],
  ["13", "14", "15", "16"],
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


// 1.7 /////////////////////////////////////////////////////////////////////////////////////////////
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

// 1.8 /////////////////////////////////////////////////////////////////////////////////////////////
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

// console.log("waterbottle", "erbottlewat", q1_8("waterbottle", "erbottlewat"));


// /////////////////////////////////////////////////////////////////////////////////////////////////
// Chapter 2 - Linked Lists
class SLLNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }

  toString() {
    return String(this.data);
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertAtBeginning(data) {
    const newNode = new SLLNode(data);
    newNode.next = this.head;
    this.head = newNode;

    return this.head;
  }

  insertAtEnd(data) {
    const newNode = new SLLNode(data);

    if (!this.head) {
      this.head = newNode;
      return this.head;
    } else {
      let tail = this.head;

      while (tail.next !== null) {
        tail = tail.next;
      }
      tail.next = newNode;
    }

    return this.head;
  }

  deleteNodeByData(targetData, firstNode = undefined) {
    if (firstNode === null) {
      return true;
    }

    if (!firstNode && this.head.data === targetData) {
      this.head = this.head.next;
      return true;
    }

    let currentNode = firstNode || this.head;

    while (currentNode.next !== null) {
      if (currentNode.next.data === targetData) {
        currentNode.next = currentNode.next.next;
        return true;
      } else {
        currentNode = currentNode.next;
      }
    }

    return false;
  }

  getNthNode(targetIndex) {
    if (targetIndex < 0) return null;

    let currentNode = this.head;
    let currentIndex = 0;

    while (currentIndex !== targetIndex && currentNode.next) {
      currentNode = currentNode.next;
      ++currentIndex;
    }

    if (currentIndex === targetIndex) {
      return currentNode;
    } else {
      return null;
    }
  }

  toString() {
    const data = [];
    let currentNode = this.head;

    while (currentNode !== null) {
      data.push(currentNode.data);
      currentNode = currentNode.next;
    }

    return `[${data.join(", ")}]`;
  }
}

// const list = new LinkedList();
// list.insertAtEnd("Hello");
// list.insertAtEnd("World!");
// list.insertAtBeginning("Why");
// console.log(String(list));
//
// list.deleteNodeByData("World!");
// console.log(String(list));
// list.deleteNodeByData("Why");
// console.log(String(list));
// list.deleteNodeByData("Hello");
// console.log(String(list));

// Example of extending with a new function for one-time use.
class LinkedListExtensionExample extends LinkedList {
  printHeadData() {
    return `Head Data: ${this.head.data}`;
  }
}

// const extendedExampleList = new LinkedListExtensionExample();
// extendedExampleList.insertAtEnd("Hey");
// extendedExampleList.insertAtEnd("there");
// console.log(extendedExampleList.printHeadData());

// 2.1 /////////////////////////////////////////////////////////////////////////////////////////////
// Write code to remove duplicates from an unsorted linked list.
// Follow up: How would you solve this problem if a temporary buffer is not allowed?

// Using a modified delete function
class LinkedList2_1a extends LinkedList {
  removeDupes() {
    if (this.head === null || this.head.next === null) {
      return true; // No dupes possible if empty or length = 1
    }

    let currentNode = this.head;

    while (currentNode.next !== null) {
      let deDuped = false;

      // Delete all duplicates of the currentNode starting with the next.
      do {
        deDuped = !this.deleteNodeByData(currentNode.data, currentNode.next);
      } while (!deDuped);

      // Onto the next node.
      currentNode = currentNode.next;
    }

    return true;
  }
}

// Using a simple runner style (repeats deletion code).
class LinkedList2_1b extends LinkedList {
  removeDupes() {
    if (this.head === null || this.head.next === null) {
      return true; // No dupes possible if empty of length = 1
    }

    let checkedNode = this.head;

    while (checkedNode !== null) {
      let currentNode = checkedNode;

      while (currentNode.next !== null) {
        if (currentNode.next.data === checkedNode.data) {
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
      checkedNode = checkedNode.next;
    }

    return true;
  }
}

// const list2_1 = new LinkedList2_1b();
// list2_1.insertAtEnd("A");
// list2_1.insertAtEnd("B");
// list2_1.insertAtEnd("C");
// list2_1.insertAtEnd("A");
// list2_1.insertAtEnd("B");
// console.log("Before:", String(list2_1)); // Before: A, B, C, A, B
// list2_1.removeDupes();
// console.log("After: ", String(list2_1)); // After:  A, B, C
// list2_1.insertAtEnd("B");
// console.log("Before:", String(list2_1)); // Before: A, B, C, B
// list2_1.removeDupes();
// console.log("After: ", String(list2_1)); // After:  A, B, C
// list2_1.removeDupes();
// console.log("After: ", String(list2_1)); // After:  A, B, C
// list2_1.insertAtEnd("B");
// console.log("Before:", String(list2_1)); // Before: A, B, C, B
// list2_1.removeDupes();
// console.log("After: ", String(list2_1)); // After:  A, B, C
// list2_1.removeDupes();
// console.log("After: ", String(list2_1)); // After:  A, B, C


// 2.2 /////////////////////////////////////////////////////////////////////////////////////////////
// Implement an algorithm to find the kth to last element of a single linked list.
// 0 would be the last element. Don't delete anything if rIndex is too high.
class LinkedList2_2 extends LinkedList {
  deleteFromLast(rIndex) {
    if (rIndex < 0) return false; // Don't allow negative numbers

    const traverse = (currentNode, targetrIndex) => {
      let lastness;

      if (currentNode.next === null) {  // Found the tail
        return 0;
      } else {
        lastness = traverse(currentNode.next, targetrIndex);  // Go deeper
      }

      if (lastness === targetrIndex) {  // Base case
        currentNode.next = currentNode.next.next;
        return true;
      }

      if (lastness !== true) {
        return lastness + 1;
      } else {
        return true;
      }
    };

    const result = traverse(this.head, rIndex);

    // In the case the target is the head we gotta do this check on the final returned value.
    if (result === rIndex) {
      this.head = this.head.next;
      return true;
    } else {
      // Otherwise return the traverse result. True is it was removed.
      return result === true;
    }
  }
}

// const list2_2 = new LinkedList2_2();
// list2_2.insertAtEnd("A");
// list2_2.insertAtEnd("B");
// list2_2.insertAtEnd("C");
// list2_2.insertAtEnd("D");
// list2_2.insertAtEnd("E");
// console.log("Before:", String(list2_2)); // Before: A, B, C, D, E
// list2_2.deleteFromLast(0);
// console.log("After: ", String(list2_2)); // After:  A, B, C, D
// list2_2.deleteFromLast(1);
// console.log("After: ", String(list2_2)); // After:  A, B, D
// list2_2.deleteFromLast(9);
// console.log("After: ", String(list2_2)); // After:  A, B, D
// list2_2.deleteFromLast(-1);
// console.log("After: ", String(list2_2)); // After:  A, B, D
// list2_2.deleteFromLast(2);
// console.log("After: ", String(list2_2)); // After:  B, D
// list2_2.deleteFromLast(0);
// console.log("After: ", String(list2_2)); // After:  B
// list2_2.deleteFromLast(0);
// console.log("After: ", String(list2_2)); // After:  (Blank)


// 2.3 /////////////////////////////////////////////////////////////////////////////////////////////
// Implement an algorithm to delete a node in the middle of a singly-linked list given only access
// to that node.
class LinkedList2_3 extends LinkedList {
  deleteNodeByNumber(index) {
    const targetNode = this.getNthNode(index);
    this.deleteNodeDirectly(targetNode);
  }

  // Looking at the
  deleteNodeDirectly(node) {
    if (!node) return false;

    while (node && node.next) {
      node.data = node.next.data;
      node.next = node.next.next;
      node = node.next;
    }

    return true;
  }
}

// const list2_3 = new LinkedList2_3();
// list2_3.insertAtEnd("A");
// list2_3.insertAtEnd("B");
// list2_3.insertAtEnd("C");
// console.log(String(list2_3.getNthNode(0)));   // A
// console.log(String(list2_3.getNthNode(1)));   // B
// console.log(String(list2_3.getNthNode(2)));   // C
// console.log(String(list2_3.getNthNode(99)));  // null
// console.log(String(list2_3));                 // A, B, C
// list2_3.deleteNodeByNumber(1);
// console.log(String(list2_3));                 // A, C
// list2_3.deleteNodeByNumber(2);
// console.log(String(list2_3));                 // A, C
// list2_3.deleteNodeByNumber(0);  // Deleting the head doesn't work, which I believe is acceptable.
// console.log(String(list2_3));                 // C


// /////////////////////////////////////////////////////////////////////////////////////////////////
// Chapter 3 - Stacks and Queues
class StackQueueNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }

  toString() {
    return String(this.data);
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  push(data) {
    const newNode = new StackQueueNode(data);
    newNode.next = this.top;
    this.top = newNode;
  }

  pop() {
    if (this.top) {
      const poppedNode = this.top;
      this.top = this.top.next;

      return poppedNode;
    }

    return null;
  }

  peek() {
    return this.top;
  }

  toString() {
    const data = [];
    let currentNode = this.top;

    while (currentNode) {
      data.push(currentNode.data);
      currentNode = currentNode.next;
    }

    return `[${data.join(", ")}]`;
  }
}

// const stack = new Stack();
// stack.push("A");
// stack.push("B");
// stack.push("C");
// console.log(String(stack));         // C, B, A
// console.log(String(stack.pop()));   // C
// console.log(String(stack.pop()));   // B
// console.log(String(stack.peek()));  // A
// console.log(String(stack.pop()));   // A
// console.log(String(stack.pop()));   // null


class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    const newNode = new StackQueueNode(data);

    if (!this.first) {  // Starting the line
      this.first = newNode;
      this.last = this.first;
    } else {  // Adding to the end of the line
      this.last.next = newNode;
      this.last = this.last.next;
    }
  }

  dequeue() {
    if (this.first) {
      const node = this.first;
      this.first = this.first.next;
      return node;
    }

    return null;
  }

  toString() {
    const data = [];
    let currentNode = this.first;

    while (currentNode) {
      data.push(currentNode.data);
      currentNode = currentNode.next;
    }

    return `[${data.join(", ")}]`;
  }
}

// const queue = new Queue();
// queue.enqueue("A");
// queue.enqueue("B");
// queue.enqueue("C");
// console.log(String(queue));           // [A, B, C]
// console.log(String(queue.dequeue())); // A
// console.log(String(queue));           // [B, C]
// console.log(String(queue.dequeue())); // B
// console.log(String(queue));           // [C]
// console.log(String(queue.dequeue())); // C
// console.log(String(queue));           // []
// console.log(String(queue.dequeue())); // null


// 3.1 /////////////////////////////////////////////////////////////////////////////////////////////
// Describe how you could use a single array to implement three stacks.
/*
  This is pretty simple. Just place each element at alternating indexes.
  Stack 1 would get index * 3. Stack 2 would get (index * 3) + 1. Stack 3 would get (index * 3) + 2.
  The beginning of the array would be the bottom of the stack.
  To save some time, the index of each stack's bottom could be kept (to save time from having to
  traverse the entire array each time the stack is manipulated).
 */

// 3.2 /////////////////////////////////////////////////////////////////////////////////////////////
// How would you design a stack which, in addition to push and pop, also has a function min which
// returns the minimum element? Push, pop, and min should all operate in O(1) time.
/*
  Well, since I don't see how it would be possible to do O(1) finding the minimum data value I
  assume they mean the bottom of the stack. It's easy, just define a bottom class variable.
  I wrote down an implementation down below. I had to write updates to push and pop
 */
class Stack3_2 extends Stack {
  constructor() {
    super();
    this.bottom = null;
  }

  min() {
    return this.bottom;
  }

  push(data) {
    const newNode = new StackQueueNode(data);

    if (!this.bottom) {
      this.bottom = newNode;
    }

    newNode.next = this.top;
    this.top = newNode;
  }

  pop() {
    if (this.top) {
      const poppedNode = this.top;
      this.top = this.top.next;

      // We popped the top! Bottom is also empty now.
      if (!this.top) {
        this.bottom = null;
      }

      return poppedNode;
    }

    return null;
  }
}

// const stack3_2 = new Stack3_2();
// stack3_2.push("A");
// stack3_2.push("B");
// stack3_2.push("C");
// console.log(String(stack3_2));         // C, B, A
// console.log(String(stack3_2.min()));   // A
// console.log(String(stack3_2.pop()));   // C
// console.log(String(stack3_2.pop()));   // B
// console.log(String(stack3_2.peek()));  // A
// console.log(String(stack3_2.pop()));   // A
// console.log(String(stack3_2.pop()));   // null
// console.log(String(stack3_2.peek()));  // mull
// console.log(String(stack3_2.min()));   // null


// 3.5 /////////////////////////////////////////////////////////////////////////////////////////////
// Implement a queue using two stacks.
// My theory is that when you want to get to the bottom of a stack (the first of a queue) you just
// pop every element of the stack onto another stack, then pop off the top of that second stack,
// and finally return all the elements back onto the first stack.
class Queue3_5 {
  constructor() {
    this.stackA = new Stack();
    this.stackB = new Stack();
  }

  enqueue(data) {
    this.stackA.push(data);
  }

  dequeue() {
    let peel = this.stackA.pop();

    while (peel) {
      this.stackB.push(peel);
      peel = this.stackA.pop();
    }

    const bottom = this.stackB.pop();

    peel = this.stackB.pop();

    while (peel) {
      this.stackA.push(peel);
      peel = this.stackB.pop();
    }

    return bottom;
  }

  toString() {
    const data = [];

    let peel = this.stackA.pop();

    while (peel) {
      data.push(peel.data);
      this.stackB.push(peel);
      peel = this.stackA.pop();
    }

    peel = this.stackB.pop();
    while (peel) {
      this.stackA.push(peel);
      peel = this.stackB.pop();
    }

    return `[${data.join(", ")}]`;
  }
}

// const queue3_5 = new Queue3_5();
// queue3_5.enqueue("A");
// queue3_5.enqueue("B");
// queue3_5.enqueue("C");
// console.log(String(queue3_5));
// queue3_5.dequeue();
// console.log(String(queue3_5));
// queue3_5.dequeue();
// console.log(String(queue3_5));
// queue3_5.dequeue();
// console.log(String(queue3_5));
// queue3_5.dequeue();


// /////////////////////////////////////////////////////////////////////////////////////////////////
// Chapter 4 - Trees and Graphs
// https://code.tutsplus.com/articles/data-structures-with-javascript-tree--cms-23393
class TreeNode {
  constructor(data) {
    this.visited = false;
    this.data = data;
    this.parent = null;
    this.children = [];
  }

  toString() {
    return `[TN - parent: "${this.parent && this.parent.data}" > data: "${this.data}"; children#: ${this.children.length}; visited: "${this.visited}"]`;
  }
}

class Tree {
  constructor(data) {
    this.root = new TreeNode(data);
  }

  /*
    Depth first traversal of a tree. Depth first means that it navigates through the tree
    going left until it reaches the end using recursion. So on a tree it's kinda like a
    left-to-right sweep of the entire tree.
   */
  traverseDF(callback) {
    // This is an IIFE (Immediately Invoked Function Expression) and is a fairly typical way to
    // construct a recursive function.
    (function recurse(currentNode) {
      // Step 2 (self-terminating)
      for (let i = 0, { length } = currentNode.children; i < length; ++i) {
        // Step 3 (self-invoking)
        recurse(currentNode.children[i]);
      }

      // Step 4 (callback - do whatever with the current node)
      callback(currentNode);

      // Step 1 (immediately invoke this function)
    }(this.root));
  }

  /*
    Breadth first traversal of a tree. Instead of using recursion this instead uses a simple
    while loop and a queue. The use of a queue is the key to this style. It does a top-to-bottom
    sweep of the entire tree. It does this by looking at the current node and puts all its kids
    into a queue (FIFO). So while it reads everyone's children
   */
  traverseBF(callback) {
    const queue = new Queue();

    queue.enqueue(this.root);

    let currentNode = queue.dequeue();

    while (currentNode) {
      for (let i = 0, { length } = currentNode.data.children; i < length; ++i) {
        queue.enqueue(currentNode.data.children[i]);
      }

      callback(currentNode.data);
      currentNode = queue.dequeue();
    }
  }

  contains(callback, traversal) {
    // Call traversal function in the scope of this. That's why we use .call()
    traversal.call(this, callback);
  }

  find(targetData, traversal = this.traverseBF) {
    let targetNode = null;

    this.contains((node) => {
      // This sucks as it will stop on the first found node but will continue to traverse all nodes.
      if (targetNode === null && node.data === targetData) {
        targetNode = node;
      }
    }, traversal);

    return targetNode;
  }

  add(newData, targetParentData, traversal = this.traverseBF) {
    const newChild = new TreeNode(newData);
    const parent = this.find(targetParentData, traversal);

    if (parent) {
      newChild.parent = parent;
      parent.children.push(newChild);
    } else {
      throw new Error(`Parent "${targetParentData}" not found!`);
    }
  }

  remove(targetData, traversal = this.traverseBF) {
    const targetChild = this.find(targetData, traversal);
    const { parent } = targetChild;

    let removedChild = null;

    if (parent) {
      let childIndex = null;

      // Find the index of the target node in its children array
      parent.children.forEach((child, index) => {
        if (childIndex === null && child.data === targetData) {
          childIndex = index;
        }
      });

      if (childIndex === null) {
        throw new Error(`Node "${targetData}" does not exist!`);
      } else {
        removedChild = parent.children.splice(childIndex, 1);
      }
    } else {
      throw new Error(`Node "${targetData}" does not have a parent and cannot be removed!`);
    }

    return removedChild;
  }
}

// const tree = new Tree("A");
// tree.root.children.push(new TreeNode("B"));
// tree.root.children[0].parent = tree.root;
// tree.root.children.push(new TreeNode("C"));
// tree.root.children[1].parent = tree.root;
// tree.root.children[0].children.push(new TreeNode("D"));
// tree.root.children[0].children[0].parent = tree.root.children[0];
// console.log(String(tree.find("A")));
// console.log(String(tree.find("D")));
// tree.add("E", "B", tree.traverseBF);
// console.log(String(tree.find("E")));
// console.log(String(tree.find("B")));
// tree.remove("E");
// console.log(String(tree.find("B")));


function sockMerchant(n, ar) {
  const sockPairs = [];

  ar.forEach((sock) => {
    if (!sockPairs[sock]) {
      sockPairs[sock] = 1;
    } else {
      ++sockPairs[sock];
    }
  });

  console.log(sockPairs);
  return sockPairs.reduce((accumulator, pair) => accumulator + (Math.floor(pair / 2) || 0), 0);
}

// console.log(sockMerchant(0, [1, 1, 1, 1, 2, 3, 4, 4]));
const d = [8, 45, 35, 84, 79, 12, 74, 92, 81, 82, 61, 32, 36, 1, 65, 44, 89, 40, 28, 20, 97, 90, 22, 87, 48, 26, 56, 18, 49, 71, 23, 34, 59, 54, 14, 16, 19, 76, 83, 95, 31, 30, 69, 7, 9, 60, 66, 25, 52, 5, 37, 27, 63, 80, 24, 42, 3, 50, 6, 11, 64, 10, 96, 47, 38, 57, 2, 88, 100, 4, 78, 85, 21, 29, 75, 94, 43, 77, 33, 86, 98, 68, 73, 72, 13, 91, 70, 41, 17, 15, 67, 93, 62, 39, 53, 51, 55, 58, 99, 46];

function minimumSwaps(arr) {
  let outOfOrder = 0;
  const swapped = {};

  arr.forEach((item, index) => {
    if (item !== index + 1) {

      if (!swapped[item]) {
        swapped[item] = index + 1;
        swapped[index + 1] = item;
        ++outOfOrder;
      } else if (swapped[index + 1] !== item) {
        ++outOfOrder;
      }
    }
  });

  return outOfOrder - 1;
}

// console.log(minimumSwaps(d));

// Binary Tree (For HackerRank)
class BSTNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

  toString() {
    const { data, left, right } = this;
    return `Data: ${data}; Left: ${left ? left.data : "-"}; Right: ${right ? right.data : "-"}`;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  push(data) {
    // First push to root? Set as root and we're done.
    if (!this.root) {
      this.root = new BSTNode(data);
      return;
    }

    const newNode = new BSTNode(data);

    let currentNode = this.root;

    while (currentNode) {
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          break;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          break;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  inOrderTraversal(callback) {
    (function recurse(node) {
      if (node) {
        recurse(node.left);
        callback(node);
        recurse(node.right);
      }
    }(this.root));
  }

  preOrderTraversal(callback) {
    (function recurse(node) {
      if (node) {
        callback(node);
        recurse(node.left);
        recurse(node.right);
      }
    }(this.root));
  }

  postOrderTraversal(callback) {
    (function recurse(node) {
      if (node) {
        recurse(node.left);
        recurse(node.right);
        callback(node);
      }
    }(this.root));
  }

  printOut(traversal = this.inOrderTraversal) {
    // Using .call() to provide _this_ to the function.
    traversal.call(this, (node) => {
      console.log(node.toString());
    });
  }

  height() {
    // IIFE
    // return (function recurse(node) {
    //   if (!node) return 0;
    //   const leftHeight = recurse(node.left);
    //   const rightHeight = recurse(node.right);
    //
    //   return Math.max(leftHeight, rightHeight) + 1;
    // }(this.root));

    // Normal arrow function
    const recurse = (node) => {
      if (!node) return 0;
      const leftHeight = recurse(node.left);
      const rightHeight = recurse(node.right);

      return Math.max(leftHeight, rightHeight) + 1;
    };

    return recurse(this.root);
  }

  contains(data) {
    const recurse = (node) => {
      if (!node) return false;
      if (data === node.data) return true;
      if (data < node.data) {
        return recurse(node.left);
      } else {
        return recurse(node.right);
      }
    };

    return recurse(this.root);
  }

  lowestCommonAncestor(n1, n2) {
    // Basically this searches around for a node that is between (or equal) to either number.
    const recurse = (num1, num2, node) => {
      if (!node) return null;
      if (num1 < node.data && num2 < node.data) {
        return recurse(num1, num2, node.left);
      }
      if (num1 > node.data && num2 > node.data) {
        return recurse(num1, num2, node.right);
      }

      return node.data;
    };

    const lca = recurse(n1, n2, this.root);

    if (lca === null) {
      return `LCA of ${n1} and ${n2} does not exist!`;
    } else {
      return `LCA of ${n1} and ${n2} is ${lca}`;
    }
  }

  validBST() {
    const recurse = (node, parentData = null, shouldBeGreater = null) => {
      if (!node) return true;

      if (parentData && (
        (shouldBeGreater && parentData < node.data) || (!shouldBeGreater && parentData > node.data)
      )) {
        return false;
      }

      const leftResult = recurse(node.left, node.data, true);
      const rightResult = recurse(node.right, node.data, false);

      return leftResult && rightResult;
    };

    return recurse(this.root);
  }
}

// const bsTree = new BinarySearchTree();
// bsTree.push(3);
// bsTree.push(2);
// bsTree.push(4);
// bsTree.push(1);
// bsTree.push(5);
// bsTree.push(6);
// console.log("inOrder");
// bsTree.printOut();
// console.log("preOrder");
// bsTree.printOut(bsTree.preOrderTraversal);
// console.log("postOrder");
// bsTree.printOut(bsTree.postOrderTraversal);
// console.log("Height:", bsTree.height());
// console.log(bsTree.contains(0));
// console.log(bsTree.contains(5));
// console.log(bsTree.lowestCommonAncestor(1, 5));
// console.log(bsTree.lowestCommonAncestor(1, 2));
// console.log(bsTree.lowestCommonAncestor(3, 5));

// const bsTree2 = new BinarySearchTree();
// bsTree2.push(10);
// bsTree2.push(5);
// bsTree2.push(15);
// bsTree2.push(1);
// bsTree2.push(4);
// bsTree2.push(13);
// bsTree2.push(17);
// console.log("Height:", bsTree2.height());
// console.log(bsTree2.contains(0));
// console.log(bsTree2.lowestCommonAncestor(1, 4));
// console.log(bsTree2.lowestCommonAncestor(4, 13));
// console.log(bsTree2.lowestCommonAncestor(5, 4));
// console.log(bsTree2.lowestCommonAncestor(2, 3));
// console.log(bsTree2.lowestCommonAncestor(1, 9999));
// console.log(bsTree2.lowestCommonAncestor(0, 9999));

// const badBsTree = new BinarySearchTree();
// badBsTree.push(5);
// badBsTree.root.left = new BSTNode(2);
// badBsTree.root.left.left = new BSTNode(3); // Bad
// badBsTree.root.right = new BSTNode(10);
// badBsTree.printOut(badBsTree.inOrderTraversal);
// console.log("badBsTree", badBsTree.validBST() ? "Yes" : "No");
// console.log("bsTree", bsTree.validBST() ? "Yes" : "No");
// console.log("bsTree2", bsTree2.validBST() ? "Yes" : "No");

class HuffmanNode {
  constructor(character, value) {
    this.character = character;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class HuffmanTree {
  constructor() {
    this.root = null;
  }

  decode(code) {
    let decode = "";
    let currentNode = this.root;
    for (let index = 0; index < code.length; ++index) {
      if (code[index] === "0") {
        currentNode = currentNode.left;
      } else if (code[index] === "1") {
        currentNode = currentNode.right;
      }

      if (!currentNode) return "ERROR, possibly malformed tree.";

      if (currentNode.character !== null) {
        decode += currentNode.character;  // We found a character
        currentNode = this.root; // Back to the top
      }
    }

    return decode;
  }
}

// const huff_abracadabra = new HuffmanTree();
// huff_abracadabra.root = new HuffmanNode(null, 11);
// huff_abracadabra.root.left = new HuffmanNode("A", 5);
// huff_abracadabra.root.right = new HuffmanNode(null, 6);
// huff_abracadabra.root.right.left = new HuffmanNode("R", 2);
// huff_abracadabra.root.right.right = new HuffmanNode(null, 4);
// huff_abracadabra.root.right.right.left = new HuffmanNode(null, 2);
// huff_abracadabra.root.right.right.right = new HuffmanNode("B", 2);
// huff_abracadabra.root.right.right.left.left = new HuffmanNode("C", 1);
// huff_abracadabra.root.right.right.left.right = new HuffmanNode("D", 1);

/*
       (-,1)
       /   \
      0     1
     /       \
   (A,5)     (-,6)
             /   \
            0     1
           /       \
         (R,2)     (-,4)
                   /   \
                  0     1
                 /       \
               (-,2)     (B,2)
               /   \
              0     1
             /       \
          (C,1)      (D,1)
 */
// A - 0
// B - 111
// C - 1100
// D - 1101
// R - 10

// console.log(huff_abracadabra.decode("01111001100011010111100"));
// console.log(huff_abracadabra.decode("011000111"));
// console.log(huff_abracadabra.decode("011111001101"));
// console.log(huff_abracadabra.decode("00"));
// console.log(huff_abracadabra.decode(""));


/**
 * Facebook one character away check.
 * Checks two strings against each other and will tell you they would match if:
 * If you added one character anywhere (including at the start and end)
 * If you took away and one character anywhere
 * If you swapped out any one character anywhere.
 * @param target
 * @param candidate
 * @returns {boolean}
 */
const fbChecker = (target, candidate) => {
  // If their lengths are too different or they're identical, then no.
  if (Math.abs(target.length - candidate.length) > 1 || target === candidate) return false;

  if (target.length === candidate.length) {
    // Swap out one character
    for (let x = 0; x < target.length; ++x) {
      const pattern = `${target.slice(0, x)}.${target.slice(x + 1)}`;
      if (candidate.match(new RegExp(pattern))) {
        return true;
      }
    }
    return false;
  } else if (target.length > candidate.length) {
    // Remove one character
    for (let x = 0; x < target.length; ++x) {
      if (target.slice(0, x) + target.slice(x + 1) === candidate) {
        return true;
      }
    }
    return false;
  } else if (target.length < candidate.length) {
    // Add one character (note the <= in for loop)
    for (let x = 0; x <= target.length; ++x) {
      const pattern = `${target.slice(0, x)}.${target.slice(x)}`;
      if (candidate.match(new RegExp(pattern))) {
        return true;
      }
    }
    return false;
  }
  return false;
};
// True
// console.log(fbChecker("bat", "cat"));   // Swap
// console.log(fbChecker("scar", "car"));  // Remove
// console.log(fbChecker("cat", "cats"));  // Add
// console.log(fbChecker("a", ""));        // Remove
// console.log(fbChecker("", "a"));        // Add
// // False
// console.log(fbChecker("", ""));
// console.log(fbChecker("a", "a"));
// console.log(fbChecker("car", "scars"));
// console.log(fbChecker("car", "car"));


/**
 * 5. Longest Palindromic Substring (medium)
 * Score: 328ms (42.77%) and 35.1 MB (96.55%) on LeetCode
 * https://leetcode.com/problems/longest-palindromic-substring
 * @param s
 * @returns {*}
 */
let longestPalindrome = (s) => {
  if (s.length <= 1) return s;

  let palindrome = s[0];

  for (let left = 0; left < s.length; ++left) {
    if (palindrome.length >= s.length - left) {
      break; // Cannot be any more longer palindromes
    }
    for (let right = left + (palindrome.length || 1); right < s.length; ++right) {
      if (isPalindrome(s, left, right)) {
        palindrome = s.slice(left, right + 1);
      }
    }
  }
  return palindrome;
};

/**
 * I thought this would be faster due to only using slice once... but wasn't necessary.
 * @param s
 * @returns {*}
 */
let longestPalindromeAlt = (s) => {
  if (s.length <= 1) return s;

  const palindrome = { start: 0, end: 0 };

  for (let left = 0; left < s.length; ++left) {
    if (palindrome.end - palindrome.start >= s.length - left) {
      break; // Cannot be any more longer palindromes
    }
    for (let right = left + ((palindrome.end - palindrome.start) || 1); right < s.length; ++right) {
      if (isPalindrome(s, left, right)) {
        palindrome.start = left;
        palindrome.end = right;
      }
    }
  }
  return s.slice(palindrome.start, palindrome.end + 1);
};

/**
 * Basic substring palindrome reader. I pass the entire string and use start and end args to
 * save some time.
 * @param s
 * @param start
 * @param end
 * @returns {boolean}
 */
let isPalindrome = (s, start, end) => {
  if (end - start < 1) return false;
  for (let step = 0; step <= Math.floor((end - start) / 2); ++step) {
    if (s[start + step] !== s[end - step]) {
      return false;
    }
  }
  return true;
};

// console.log(isPalindrome("dad", 0, 2));
// console.log(isPalindrome("dd", 0, 1));
// console.log(isPalindrome("racecar", 0, 6));
// console.log(isPalindrome("pacecar", 0, 6));
// console.log(isPalindrome("xracecarz", 1, 7));
// console.log(isPalindrome("xracecarz", 0, 8));
// console.log(isPalindrome("a", 0, 0));
// console.log(isPalindrome("", 0, 0));

// console.log(longestPalindrome("abcpoopacb"));
// console.log(longestPalindrome("a"));
// console.log(longestPalindrome("ac"));
// console.log(longestPalindrome("bb"));

// console.log(longestPalindromeAlt("abcpoopacb"));
// console.log(longestPalindromeAlt("a"));
// console.log(longestPalindromeAlt("ac"));
// console.log(longestPalindromeAlt("bb"));


/**
 * 6. ZigZag question (medium)
 * Score: 104ms (73.22%) and 42.2MB (35.39%)
 * https://leetcode.com/problems/zigzag-conversion
 * There is another solution that does it in-place but the logic seems impossible to come up with
 * in a short amount of time. If this was a big data problem then yeah, do that instead.
 * This one is weird. Make "PAYPALISHIRING", 3 become:
 *  P   A   H   N
 *  A P L S I I G
 *  Y   I   R
 *
 * And then read left to right, top to bottom in order to become:
 * "PAHNAPLSIIGYIR"
 * Or "PAYPALISHIRING", 4 become:
 * P     I     N
 * A   L S  I G
 * Y A   H R
 * P     I
 * Which becomes "PINALSIGYAHRPI"
 *
 * @param s
 * @param numRows
 * @returns {string}
 */
const zigZagConvert = (s, numRows) => {
  const zigZag = putIntoZigZag(s, numRows);
  return zigZagToString(zigZag);
};

const putIntoZigZag = (s, numRows) => {
  const zigZag = [];
  let rowNum = 0;
  let increasing = false;
  for (let index = 0; index < s.length; ++index) {
    if (!zigZag[rowNum]) {
      zigZag[rowNum] = [s[index]];
    } else {
      zigZag[rowNum].push(s[index]);
    }
    if (rowNum === numRows - 1 || rowNum === 0) {
      increasing = !increasing;
    }
    rowNum += increasing ? 1 : -1;
  }
  return zigZag;
};

const zigZagToString = (zigZag) => {
  let result = "";
  zigZag.forEach((row) => {
    row.forEach((character) => {
      result += character;
    });
  });

  return result;
};

// console.log(zigZagConvert("PAYPALISHIRING", 3));
// console.log(zigZagConvert("PAYPALISHIRING", 4));


/**
 * 7. Reverse Integer
 * https://leetcode.com/problems/reverse-integer (easy)
 * Reverse integers. ex: 321 becomes 123, -102 becomes -201, 120 becomes 21
 * Score: 84ms (73.51%) and 36MB (31.68%)
 * @param x
 * @returns {number}
 */
const reverse = (x) => {
  const isNegative = x < 0;
  const number = Math.abs(x);
  const digits = [];

  for (let power = 0; 10 ** power <= number; ++power) {
    digits.push(Math.floor(number / (10 ** power)) % 10);
  }

  let answer = 0;
  for (let index = 0; index < digits.length; ++index) {
    answer += digits[index] * (10 ** (digits.length - 1 - index));
  }

  // return isNegative ? answer * -1 : answer;

  // JavaScript integers are 64 bit. This is done to pass the challenge.
  if (isNegative) answer *= -1;
  if (answer > -2147483648 && answer < 2147483647) {
    return answer;
  } else {
    return 0;
  }
};

// console.log(123, reverse(123));
// console.log(-123, reverse(-123));
// console.log(1, reverse(1));
// console.log(2, reverse(2));
// console.log(0, reverse(0));
// console.log(10, reverse(10));
// console.log(1000, reverse(1000));
// console.log(1020, reverse(1020));
// console.log(1534236469, reverse(1534236469));


/**
 * 8. String to Integer (atoi) (medium)
 * Score: 92ms (62.40%) and 37.7MB (8.98%)
 * https://leetcode.com/problems/string-to-integer-atoi/
 * I tried doing this a "cheap" way using trim() and regex but I realized that their specifics were
 * too specific and I needed to do it by hand with extractLeadingNumberString().
 * Also MIN_INT and MAX_INT are in effect.
 *
 * I still just use parseInt() when I've got the string settled. I could do it by hand but unless
 * I'm asked to I won't.
 *
 * @param {string} str
 * @return {number}
 */
const myAtoi = (str) => {
  const value = parseInt(extractLeadingNumberString(str), 10);
  if (Number.isNaN(value)) {
    return 0;
  }
  return Math.min(Math.max(value, -2147483648), 2147483647);
};

/**
 * This allows starting spaces, but not starting letters.
 * When a number has been detected (starting with a -, +, or digit) then all spaces and other
 * letters no longer have effect.
 * Accepted, all equal +/-123: " 123", "-123", "   +123 ", "123 abc", "123abc"
 * Rejected: " - 123", "-abc123"
 *
 * Also decimal points are ignored, "3.14" becomes "3".
 * @param str
 * @returns {string}
 */
const extractLeadingNumberString = (str) => {
  let numberString = "";
  let symbolAllowed = true;
  let spaceAllowed = true;

  // I track symbol and spaced allowed. Symbol is allowed only at first non-space character. And
  // space is only allowed before first -, +, or digit.
  for (let index = 0; index < str.length; ++index) {
    if (!spaceAllowed || str[index] !== " ") {
      spaceAllowed = false;
      if (str[index].match(/\d/) || (symbolAllowed && (str[index] === "+" || str[index] === "-"))) {
        numberString += str[index];
        symbolAllowed = false;
      } else {
        return numberString;
      }
    }
  }
  return numberString;
};

// console.log("42", myAtoi("42"));
// console.log(" -42", myAtoi(" -42"));
// console.log("3.1124", myAtoi("3.1124"));
// console.log("123", myAtoi("123"));
// console.log("+123", myAtoi("+123"));
// console.log("1 2 3", myAtoi("1 2 3"));
// console.log("-1 2 3", myAtoi("-1 2 3"));
// console.log("  123", myAtoi("  123"));
// console.log("  -123", myAtoi("  -123"));
// console.log("  -w", myAtoi("  -w"));
// console.log("  w 123", myAtoi("  w 123"));
// console.log("  w -123", myAtoi("  w -123"));
// console.log("+ 123", myAtoi("+ 123"));


/**
 * 9. Palindrome Number (easy)
 * Score: 244ms (81.53%) and 45.5MB (53.93%)
 * https://leetcode.com/problems/palindrome-number
 * Pretty basic stuff
 * @param x
 * @returns {boolean}
 */
const isNumberPalindrome = (x) => {
  if (x < 0) return false; // A minus symbol is a no-go
  if (x < 10) return true; // A single digit is a palindrome

  const numberString = String(x);

  for (let index = 0; index < Math.floor(numberString.length / 2); ++index) {
    if (numberString[index] !== numberString[numberString.length - index - 1]) {
      return false;
    }
  }
  return true;
};

// console.log(121, isNumberPalindrome(121));
// console.log(-121, isNumberPalindrome(-121));
// console.log(1, isNumberPalindrome(1));
// console.log(12, isNumberPalindrome(12));
// console.log(-0, isNumberPalindrome(-0));


/**
 * 10. Regular Expression Matching (hard)
 * https://leetcode.com/problems/regular-expression-matching/
 * This one was a little beyond me. This one failed a case of "aaa", "a*a"
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = (s, p) => {
  const expressions = expressionBreaker(p);

  let sIndex = 0;
  let eIndex = 0;
  while (sIndex < s.length && eIndex < expressions.length) {
    // Character
    if (expressions[eIndex].char !== ".") {
      // Match
      if (expressions[eIndex].char === s[sIndex]) {
        if (!expressions[eIndex].kleene) {
          ++eIndex; // Match, not a kleene, so we increment both sIndex and eIndex
          ++sIndex;
        } else {
          ++sIndex; // Match, is a kleene, so we only increment sIndex
        }
      // No match, but it's kleene, so we can continue.
      } else if (expressions[eIndex].kleene) {
        ++eIndex;
        // No ++sIndex, we stay on it
      // No match when we required it. So we break.
      } else {
        return false;
      }
    // Wildcard, check to see if we should skip this (the next char matches or is wildcard)
    } else if (eIndex < expressions.length - 1 && expressions[eIndex].kleene &&
      (expressions[eIndex + 1].char === s[sIndex] || expressions[eIndex + 1].char === ".")
    ) {
      ++eIndex;
    // Wildcard with kleene means we can match this char, increment sIndex only
    } else if (expressions[eIndex].kleene) {
      ++sIndex;
    // Wildcard without kleene means we can match this char, increment sIndex AND eIndex
    } else {
      ++eIndex;
      ++sIndex;
    }
  }
  // Should end with sIndex one over the end (=== length).
  // and eIndex should be length - 1 when it ends in a kleene or else one over (=== length)
  return sIndex === s.length && (
    eIndex === expressions.length - 1 ? expressions[eIndex].kleene : eIndex === expressions.length
  );
};

const expressionBreaker = (p) => {
  if (p.length === 0) return [];
  if (p.length === 1 && p !== "*") return [{ char: p, kleene: false }];

  const fragments = [];
  for (let index = 0; index < p.length; ++index) {
    if (p[index] !== "*") {
      if (index < p.length - 1 && p[index + 1] === "*") {
        fragments.push({ char: p[index], kleene: true});
        ++index; // Increment another step
      } else {
        fragments.push({ char: p[index], kleene: false });
      }
    } else {
      return [];  // This means we found a * without a character
    }
  }
  return fragments;
};


// console.log(isMatch("aa", "a"));
// console.log(isMatch("aa", "a*"));
// console.log(isMatch("ab", ".*"));
// console.log(isMatch("aab", "c*a*b"));
// console.log(isMatch("mississippi", "mis*is*p*"));
// console.log(isMatch("aaa", "aaaa"));
// console.log(isMatch("aaa", "a*a"));

/**
 * Their provided solution with my comments.
 * @param text
 * @param pattern
 * @returns {*}
 */
const isMatchSolution = (text, pattern) => {
  // If there is no pattern return true if there is no text ("" === "")
  if (!pattern) {
    return !text;
  }

  // Match is there is a string and the pattern matches or is a wildcard
  // I made the mistake of removing !! meaning things got screwy.
  const firstMatch = !!text && (pattern[0] === text[0] || pattern[0] === ".");

  // If there is a Kleene star...
  if (pattern.length >= 2 && pattern[1] === "*") {
    // Return if the next expression after the current one fits...
    return isMatchSolution(text, pattern.slice(2)) ||
      // OR, if firstMatch, that the next text item matches the current pattern.
      (firstMatch && isMatchSolution(text.slice(1), pattern));

  // There is no Kleene star...
  } else {
    // Return if this was a firstMatch and the next character of the text and pattern
    return firstMatch && isMatchSolution(text.slice(1), pattern.slice(1));
  }
};

// console.log("aa", "a", isMatchSolution("aa", "a"));
// console.log("aa", "a*", isMatchSolution("aa", "a*"));
// console.log("ab", ".*", isMatchSolution("ab", ".*"));
// console.log("aab", "c*a*b", isMatchSolution("aab", "c*a*b"));
// console.log("mississippi", "mis*is*p*", isMatchSolution("mississippi", "mis*is*p*"));
// console.log("aaa", "aaaa", isMatchSolution("aaa", "aaaa"));
// console.log("aaa", "a*a", isMatchSolution("aaa", "a*a"));
// console.log("(blank)", "(blank)", isMatchSolution("", ""));

/**
 * Merge Sort
 * https://hackernoon.com/programming-with-js-merge-sort-deb677b777c0
 * Using JavaScript-y style. It's not as fast. You could speed it up with using array pointers
 * instead of slices.
 * @param array
 * @returns {*}
 */
const mergeSort = (array) => {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const leftHalf = array.slice(0, middle);
  const rightHalf = array.slice(middle);

  return mergeHalves(
    mergeSort(leftHalf),
    mergeSort(rightHalf),
  );
};

const mergeHalves = (leftHalf, rightHalf) => {
  let leftIndex = 0;
  let rightIndex = 0;
  const mergedArray = [];

  while (leftIndex < leftHalf.length && rightIndex < rightHalf.length) {
    if (leftHalf[leftIndex] <= rightHalf[rightIndex]) {
      mergedArray.push(leftHalf[leftIndex]);
      ++leftIndex;
    } else {
      mergedArray.push(rightHalf[rightIndex]);
      ++rightIndex;
    }
  }

  // Combine any remaining array items that weren't sorted.
  return mergedArray.concat(leftHalf.slice(leftIndex)).concat(rightHalf.slice(rightIndex));
};

// console.log([], mergeSort([]));
// console.log([1], mergeSort([1]));
// console.log([1, 3, 2], mergeSort([1, 3, 2]));
// console.log([4, 3, 2, 1], mergeSort([4, 3, 2, 1]));

/**
 * 20. Valid Parentheses
 * https://leetcode.com/problems/valid-parentheses/
 * Score: 60ms (71.16%) and 35MB (21.28%)
 * @param {string} s
 * @return {boolean}
 */
const pairs = {
  ")": "(",
  "}": "{",
  "]": "[",
};
const validParens = (s) => {
  const stack = [];

  for (let i = 0; i < s.length; ++i) {
    if (s[i] === "(" || s[i] === "{" || s[i] === "[") {
      stack.push(s[i]);
    } else if (pairs[s[i]]) {
      if (stack.pop() !== pairs[s[i]]) {
        return false;
      }
    }
  }

  return stack.length === 0;
};

// console.log("()", validParens("()"));
// console.log("()[]{}", validParens("()[]{}"));
// console.log("(]", validParens("(]"));
// console.log("([)]", validParens("([)]"));
// console.log("{[]}", validParens("{[]}"));


/**
 * 11. Container With Most Water
 * https://leetcode.com/problems/container-with-most-water/
 * Score: 912ms (14.15%) and 35.6MB (48.44%)
 * Total brute force.
 * @param {number[]} height
 * @return {number}
 */
const maxAreaSlow = (height) => {
  const largest = {
    x: -1,
    y: -1,
    volume: -1,
  };

  for (let x = 0; x < height.length - 1; ++x) {
    for (let y = x + 1; y < height.length; ++y) {
      if (x !== y) {
        const volume = Math.min(height[x], height[y]) * Math.abs(x - y);
        if (volume > largest.volume) {
          largest.volume = volume;
          largest.x = x;
          largest.y = y;
        }
      }
    }
  }

  return largest.volume;
};

// console.log(maxAreaSlow([1,8,6,2,5,4,8,3,7])); // 49

/**
 * Score: 620ms (36.54%) and 35.5MB (63.54%)
 * Brute force with super basic optimzation.
 * @param height
 * @returns {number}
 */
const maxAreaFaster = (height) => {
  const largest = {
    x: -1,
    y: -1,
    volume: -1,
  };

  for (let x = 0; x < height.length - 1; ++x) {
    for (let y = x + 1; y < height.length; ++y) {
      // Some very basic optimization
      if (x !== y && height[y] * Math.max(y, height.length - y) > largest.volume) {
        const volume = Math.min(height[x], height[y]) * Math.abs(x - y);
        if (volume > largest.volume) {
          largest.volume = volume;
          largest.x = x;
          largest.y = y;
        }
      }
    }
  }

  return largest.volume;
};

// console.log(maxAreaFaster([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49


/**
 * I took this from the solutions guide. My god it makes so much more sense.
 * Attack from both sides solution.
 * Score: 72ms (74.33%) and 35.6MB (48.44%)
 * @param height
 * @returns {number}
 */
const maxArea = (height) => {
  let maxVolume = 0;

  let leftIndex = 0;
  let rightIndex = height.length - 1;

  while (leftIndex < rightIndex) {
    maxVolume = Math.max(
      maxVolume,
      Math.min(height[leftIndex], height[rightIndex]) * (rightIndex - leftIndex),
    );

    if (height[leftIndex] > height[rightIndex]) {
      --rightIndex;
    } else {
      ++leftIndex;
    }
  }

  return maxVolume;
};

// console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49


/**
 * 12. Integer to Roman (medium)
 * https://leetcode.com/problems/integer-to-roman
 * Score: 164ms (66.44%) and 39.5MB (92.13%)
 * I stole this answer but I swear I had started out thinking that I could mod 10 and take away
 * numbers. I just didn't realize the relationship that I had to V and X, X had to L an C, and C
 * had to D and M (basically x5 and x10). I might've tried something similar.
 * It works on 1994 like so:
 * It grabs 4 and sees that it is numerals[unit] (I) numerals[unit+1] (V) "IV"
 * Dividing by 10 and flooring we have 199.
 * It grabs 9 (aka 90) and sees that it is numerals[unit] (X) numerals[unit+2] (C) "XC"
 * Dividing by 10 and flooring we have 19.
 * It grabs 9 (aka 900) and sees that it is numerals[unit] (C) numerals[unit+2) (M) "CM"
 * Dividing by 10 and flooring we have 1.
 * It grabs 1 (aka 1000) and sees that it is numerals[unit] (M) "M".
 *    M    CM   XC  IV
 * 1000 + 900 + 90 + 4
 * @param {number} num
 * @return {string}
 */
const intToRoman = (num) => {
  const numerals = "IVXLCDM";
  let unit = 0;
  let output = "";
  let workingNum = num;

  while (workingNum) {
    const digit = workingNum % 10;

    if (digit < 4) { // I, II, III
      output = numerals[unit].repeat(digit) + output; // Add to beginning of string
    } else if (digit === 4) { // IV
      output = numerals[unit] + numerals[unit + 1] + output;
    } else if (digit < 9) { // V, VI, VII, VIII
      output = numerals[unit + 1] + numerals[unit].repeat(digit - 5) + output;
    } else {  // IX
      output = numerals[unit] + numerals[unit + 2] + output;
    }

    workingNum = Math.floor(workingNum / 10);
    unit += 2;
  }
  return output;
};

// console.log(1, intToRoman(1));
// console.log(2, intToRoman(2));
// console.log(3, intToRoman(3));
// console.log(4, intToRoman(4));
// console.log(5, intToRoman(5));
// console.log(6, intToRoman(6));
// console.log(7, intToRoman(7));
// console.log(8, intToRoman(8));
// console.log(9, intToRoman(9));
// console.log(10, intToRoman(10));
// console.log(1994, intToRoman(1994));

/**
 * 14. Longest Common Prefix (easy)
 * https://leetcode.com/problems/longest-common-prefix
 * Score: 64ms (72.71%) and 35.1MB (44.09%)
 * Super easy but my god did I feel like a moron for the first minute or two before realizing I
 * just needed to put a for loop inside an infinite while loop.
 * @param {string[]} strs
 * @return {string}
 */
const longestCommonPrefix = (strs) => {
  let prefix = "";
  let candidate;
  let index = 0;

  while (true) {
    candidate = strs[0] ? strs[0][index] : false;
    if (!candidate) return prefix;  // Reached the end of a string

    for (let x = 1; x < strs.length; ++x) {
      if (strs[x][index] !== candidate) return prefix;    // Found a non-matching character
    }

    prefix += candidate;
    ++index;
  }
};

// console.log(["flower", "flow", "flight"], longestCommonPrefix(["flower", "flow", "flight"]));
// console.log(["flow", "flow", "flow"], longestCommonPrefix(["flow", "flow", "flow"]));
// console.log(["dog", "cat", "mouse"], longestCommonPrefix(["dog", "cat", "mouse"]));
// console.log(["", ""], longestCommonPrefix(["", ""]));
// console.log([" ", " "], longestCommonPrefix([" ", " "]));
// console.log(["", "  "], longestCommonPrefix(["", "  "]));
// console.log([], longestCommonPrefix([]));


/**
 * 15. 3Sum (medium)
 * https://leetcode.com/problems/3sum/
 * Score: None
 * I think this question is bullshit in saying that given [-1, 0, 1, 2, -1, -4]
 * That an answer of [ [ -1, 0, 1 ], [ -1, 2, -1 ], [ 0, 1, -1 ] ]
 * is not valid because [-1, 0, 1] and [0, 1, -1] and "duplicates". Bullshit, they're not duplicates
 * because they represent different numbers. So if you were using this in a real-world scenario
 * that combination would be a valid alternative. If you needed to make purple paint and you had
 * three paint cans, #1 blue, #2 red, and #3 red then a unique combination would be 1 & 2 and 1 & 3.
 * So, I cannot turn this in to leet code but I'd argue with my interviewer that the question itself
 * is flawed.
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = (nums) => {
  if (nums.length < 3) return [];

  const uniques = {};
  const solutions = [];

  const recursion = (a, b) => {
    for (let index = b >= 0 ? b + 1 : a >= 0 ? a + 1 : 0; index < nums.length; ++index) {
      // We found a working third value that is unique
      if (
        b >= 0 &&
        !uniques[a][b][index] &&
        uniques[a][b].sum + nums[index] === 0
      ) {
        // Third and final check.
        uniques[a][b][index] = true;
        solutions.push([nums[a], nums[b], nums[index]]);
      } else if (
        a >= 0 &&
        !uniques[a][index]
      ) {
        // Second check
        uniques[a][index] = { sum: uniques[a].sum + nums[index] };
        recursion(a, index);
      } else if (
        !uniques[index]
      ) {
        // First check
        uniques[index] = { sum: nums[index] };
        recursion(index, -1);
      }
    }
  };

  recursion(-1, -1);
  return solutions;
};

// console.log([-1, 0, 1, 2, -1, -4], threeSum([-1, 0, 1, 2, -1, -4]));


/**
 * I give up on this one.
 * @param nums
 * @returns {Array}
 */
const threeSum2 = (nums) => {
  if (nums.length < 3) return [];
  const numsSorted = nums.sort((a, b) => a - b);

  const checked = {};
  const solutions = [];

  const recursion = (a, b) => {
    for (let index = 0; index < numsSorted.length; ++index) {
      const cur = String(numsSorted[index]);
      const aS = a >= 0 ? String(numsSorted[a]) : null;
      const bS = b >= 0 ? String(numsSorted[b]) : null;

      if (
        b >= 0 &&
        !checked[aS][bS][cur] &&
        checked[aS][bS].sum + numsSorted[index] === 0
      ) {
        checked[aS][bS][cur] = true;
        solutions.push([numsSorted[a], numsSorted[b], numsSorted[index]]);
      } else if (
        a >= 0 &&
        !checked[aS][cur]
      ) {
        checked[aS][cur] = { sum: checked[aS].sum + numsSorted[index] };
        recursion(a, index);
      } else if (
        !checked[cur]
      ) {
        checked[cur] = { sum: numsSorted[index] };
        recursion(index, -1);
      }
    }
  };

  recursion(-1, -1);
  return solutions;
};
// console.log([-1, 0, 1, 2, -1, -4], threeSum2([-1, 0, 1, 2, -1, -4]));


/**
 * The key was to sort the solution that was found before recording it in the checked table.
 * @param nums
 * @returns {Array}
 */
const threeSum3 = (nums) => {
  if (nums.length < 3) return [];

  const checked = {};
  const solutions = [];

  let aIndex = 0;
  let bIndex = 1;
  let cIndex = 2;

  while (aIndex < nums.length) {
    // Solution found
    if (nums[aIndex] + nums[bIndex] + nums[cIndex] === 0) {
      const solution = [nums[aIndex], nums[bIndex], nums[cIndex]];
      solution.sort((a, b) => a - b);

      // Build and then record the checked solution.
      if (!checked[solution[0]]) {
        checked[solution[0]] = {};
      }

      if (!checked[solution[0]][solution[1]]) {
        checked[solution[0]][solution[1]] = {};
      }

      if (!checked[solution[0]][solution[1]][solution[2]]) {
        checked[solution[0]][solution[1]][solution[2]] = true;
        // If this is the first time we've gotten this solution we record it.
        solutions.push(solution);
      }
    }

    if (bIndex > nums.length) {
      aIndex++;
      bIndex = aIndex + 1;
      cIndex = bIndex + 1;
    } else if (cIndex > nums.length) {
      bIndex++;
      cIndex = bIndex + 1;
    } else {
      cIndex++;
    }
  }

  return solutions;
};
// console.log([-1, 0, 1, 2, -1, -4], threeSum3([-1, 0, 1, 2, -1, -4]));


/**
 * 17. Letter Combinations of a Phone Number (medium)
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number/
 * Score: 56ms (79.28%) and 33.7MB (91.24%)
 * This one was pretty easy for me. Surprised I had such a good score. This is ripe for recursion
 * where you can imagine the spidering-out call-stack as every combination is attempted with each
 * digit.
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = (digits) => {
  const digitsString = String(digits);
  if (!digitsString) return [];

  const keys = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const output = [];

  const recursion = (str, digitsIndex) => {
    if (digitsIndex >= digitsString.length) {
      output.push(str);
    } else {
      // Object props that are numbers are handled just fine when referencing with strings.
      const digit = digitsString[digitsIndex];

      for (let letterIndex = 0; letterIndex < keys[digit].length; ++letterIndex) {
        recursion(str + keys[digit][letterIndex], digitsIndex + 1);
      }
    }
  };

  recursion("", 0);
  return output;
};

// console.log("23", letterCombinations("23"));
// console.log("234", letterCombinations("234"));


/**
 * 19. Remove Nth Node From End of List (medium)
 * https://leetcode.com/problems/remove-nth-node-from-end-of-list
 * Score: 80ms (27.88%) and 34.2MB (8.50%)
 * Pretty piss-poor performance. A two-pointer solution is faster. I was just attracted to the idea
 * of using recursion.
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = (head, n) => {
  const recursion = (node, n) => {
    if (node.next) {
      const { nth, next } = recursion(node.next, n);

      // We found it, the next link was the one we wanted gone.
      if (nth === n) {
        node.next = next;
      }

      return {
        nth: nth + 1, // Pass it on
        next: node.next,
      };
    } else {
      // We've reached the end.
      return {
        nth: 1,
        next: node.next,
      };
    }
  };

  // This step was the last thing that hung me up. I didn't know how to remove the first node.
  const { nth } = recursion(head, n);
  if (n === nth) {
    return head.next;
  } else {
    return head;
  }
};

// No testing, sorry.


/**
 * 21. Merge Two Sorted Lists (easy)
 * https://leetcode.com/problems/merge-two-sorted-lists
 * Score: 68ms (81.70%) and 35MB (100.00%)
 * This one honestly pissed me off especially considering it was labelled as easy. I didn't read
 * the question at all and wrote a solution in 90 seconds for merging two arrays before realizing
 * we were dealing with linked lists. I ended up stealing this solution in reality after being
 * totally unable to identify my own algorithm's flaws. So I'm just taking it in as a learning
 * experience here. The key was to skip the first ListNode and instead work exclusively with .next
 * references. That made it a lot cleaner in the end. Also the current.next = left || right is very
 * nasty but for this question is acceptable. In real-world applications this would no be ideal
 * because it creates no new ListNodes and instead hijacks existing ListNodes.
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  let sortedHead = { next: null };    // Faux ListNode
  let current = sortedHead;

  let left = l1;
  let right = l2;

  while (left && right) {
    if (left.val <= right.val) {
      current.next = left;
      left = left.next;
    } else {
      current.next = right;
      right = right.next;
    }
    current = current.next;
  }

  current.next = left || right;

  return sortedHead.next;
};

// No testing, sorry.


/**
 * 22. Generate Parentheses (medium)
 * https://leetcode.com/problems/generate-parentheses/
 * Score: 60ms (82.64%) and 34.5MB (97.80%)
 * I like my score. Basically an improvement on the validate parens function. Instead of using a
 * stack I simply use an "opens" variable to count up as the number of open parens are added
 * and decrement the counter as they are "closed".
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = (n) => {
  if (n < 1) {
    return [];
  }

  const output = [];

  // Recursion is the key to explore every option.
  const recursion = (opens, str) => {
    if (str.length === n * 2 && opens === 0) {
      output.push(str);
      return;
    }

    // If there is room to add more open parens...
    if (opens < n && str.length < (n * 2) - opens) {
      // The biggest key was to add the length check otherwise we'd risk going infinite between
      // 0 and 1 opens.
      recursion(opens + 1, str + "(");
    }

    // Else try closing them.
    if (opens > 0) {
      recursion(opens - 1, str + ")");
    }
  };

  recursion(0, "");
  return output;
};

// console.log(1, generateParenthesis(1));
// console.log(2, generateParenthesis(2));
// console.log(3, generateParenthesis(3));
// console.log(4, generateParenthesis(4));


/**
 * 23. Merge k Sorted Lists (hard)
 * https://leetcode.com/problems/merge-k-sorted-lists/
 * Score: 560ms (20.05%) and 37.6MB (98.46%)
 * My solution is somewhat simple. "One step above brute force". The number of approaches are quite
 * varied. I'm happy with my results in any case. Time complexity is O(kN) where k is the number
 * of lists and N is the length of the final list because we'll be running the for-loop for every
 * item in the list. The space complexity is O(1) because I don't create any new nodes, I just
 * steal the ones that are already present.
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  let merged = { next: null };
  let current = merged;

  let done = false;
  while (!done) {
    done = true;

    // Find the lowest value of the list's head nodes
    let lowestK = null;

    for (let k = 0; k < lists.length; ++k) {
      if (lists[k]) {
        done = false;   // There are still more
        if (lowestK === null || lists[k].val <= lists[lowestK].val) {
          lowestK = k;
        }
      }
    }

    if (!done) {
      current.next = lists[lowestK];
      lists[lowestK] = lists[lowestK].next;
      current = current.next;
    }
  }

  return merged.next;
};

// No testing, sorry.


/**
 * Practice interview question I saw on Glassdoor for Facebook. After seeing the inane answers
 * other people gave I just had to write my own. Tried it out starting on paper.
 * Add two binary numbers together when they're plain text.
 * @param s1
 * @param s2
 * @returns {number}
 */
const binaryAdd = (s1, s2) => {
  const longer = Math.max(s1.length, s2.length);
  let finalSum = 0;
  let carry = 0;

  for (let index = 0; index < longer; ++index) {
    let sum = (s1[s1.length - index - 1] === "1" ? 1 : 0) +
              (s2[s2.length - index - 1] === "1" ? 1 : 0) +
              carry;

    // Deal with the carry. Add it or remove it.
    // My biggest mistake was erroneously leaving this as sum > 2.
    if (sum >= 2) {
      carry = 1;
    } else {
      carry = 0;
    }
    finalSum += sum % 2 ? 2 ** index : 0;
  }
  if (carry) {
    finalSum += 2 ** longer;
  }
  return finalSum;
};

// console.log("101", "111", binaryAdd("101", "111"));
// console.log("101", "0111", binaryAdd("101", "0111"));
// console.log("1", "0", binaryAdd("1", "0"));
// console.log("1", "", binaryAdd("1", ""));
// console.log("", "", binaryAdd("", ""));


/**
 * 91. Decode Ways (medium)
 * https://leetcode.com/problems/decode-ways
 * Score: 160ms (23.75%) and 37.5MB (11.94%)
 * This is a question I saw on a YouTube video about Facebook interview questions.
 * https://www.youtube.com/watch?v=qli-JCrSwuk
 * Given a string of digits (0-9), how many ways can the string be decoded by
 * 1 = a, 2 = b, ... 26 = z?
 * Ex: 127 could be abg (1, 2, 7) or lg (12, 7). (1, 27) is not possible.
 * A key takeaway here is to always have memoization on the table whenever you see a step
 * where two recursive calls are made to determine a number. The execution time on LeetCode was
 * 46 times LONGER without memoization.
 * @param input
 */
const numDecodings = (input) => {
  const memo = new Array(input.length);

  const recurse = (index) => {
    // If we've already done the work just return the old answer.
    if (memo[index]) {
      return memo[index];
    }

    // No string is possible with blank input.
    if (input.length === 0) return 0;
    // Zero is not allowed
    if (input[index] === "0") return 0;
    // Base case, we created a possible string.
    if (index >= input.length) return 1;

    if (index < input.length - 1 && input.slice(index, index + 2) <= 26) {
      memo[index] = recurse(index + 1) + recurse(index + 2);
      return memo[index];
    } else {
      memo[index] = recurse(index + 1);
      return memo[index];
    }
  };

  return recurse(0);
};

// console.log("1", numDecodings("1")); // 1: a
// console.log("10", numDecodings("10")); // 1: j
// console.log("11", numDecodings("11")); // 2: aa, k
// console.log("127", numDecodings("127")); // 2: abg, lg
// console.log("111", numDecodings("111")); // 3: aaa, ak, ka
// console.log("2626", numDecodings("2626")); // 4: bfbf, bfz, zbf, zz
// console.log("123412", numDecodings("123412")); // 6: abcdab, lcdab, awdab, abcl, lcdl, awdl
// console.log("01", numDecodings("01")); // 0: (no zero character)
// console.log("", numDecodings("")); // 0: (zero length input)


function minSum(num, k) {
  if (num.length === 0) return 0;

  const numSorted = num.sort((a, b) => b - a);

  let targetNumber = null;
  let targetIndex = 0;

  for (let round = 0; round < k; ++round) {
    if (targetIndex < numSorted.length - 1 && numSorted[targetIndex + 1] < targetNumber) {
      targetIndex += 1;
    } else {
      targetIndex = 0;
    }

    for (let index = targetIndex; index < numSorted.length; ++index) {
      if (targetNumber === null || numSorted[index] > targetNumber) {
        targetNumber = numSorted[index];
        targetIndex = index;
      }
    }

    targetNumber = Math.ceil(numSorted[targetIndex] / 2);
    numSorted[targetIndex] = targetNumber;
  }

  let sum = 0;
  for (let index = 0; index < numSorted.length; ++index) {
    sum += numSorted[index];
  }

  return sum;
}

// console.log([10,20,7], minSum([10,20,7], 4));


function minSumold(num, k) {
  for (let round = 0; round < k; ++round) {
    let largestNumber = null;
    let largestIndex = null;
    for (let index = 0; index < num.length; ++index) {
      if (largestNumber === null || num[index] > largestNumber) {
        largestNumber = num[index];
        largestIndex = index;
      }
    }

    num[largestIndex] = Math.ceil(num[largestIndex] / 2);
  }

  let sum = 0;
  for (let index = 0; index < num.length; ++index) {
    sum += num[index];
  }

  return sum;
}


const getMovieTitles = (substr) => {
  const url = `https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}`;

  // We grab the first page, which comes with a page count
  getPageTotalAndTitles([url], [], (err, pageCount, titles) => {
    if (err) {
      console.log("getPageTotalAndTitles Error!", err);

    // We have more than one page, then we gotta do it again
    } else if (pageCount > 1) {
      // Construct the page urls starting with page 2.
      const urls = [];
      for (let page = 2; page <= pageCount; ++page) {
        urls.push(`${url}&page=${page}`);
      }

      // With the urls set, we now go collecting the titles from each page
      getPageTotalAndTitles(urls, titles, (err, pageCount, moreTitles) => {
        if (err) {
          console.log("getPageTotalAndTitles Error!", err);
        } else {
          moreTitles.sort().forEach((title, index) => console.log(`${index + 1}. ${title}`));
        }
      });
    } else {
      // Just return the first page's worth of titles
      titles.sort().forEach((title, index) => console.log(`${index + 1}. ${title}`));
    }
  });
};


const getPageTotalAndTitles = (urls, titles, callback) => {
  let counter = 1;

  urls.forEach((url) => {
    https.get(url, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const parsed = JSON.parse(data);
        parsed.data.forEach((movie) => {
          titles.push(movie.Title);
        });

        // We've reached the end. We can use the callback now.
        if (counter === urls.length) {
          callback(null, parsed.total_pages, titles);
        }

        // Else increment the counter.
        ++counter;
      });
    }).on("error", (err) => {
      callback(err, null, null);
    });
  });
};


// getMovieTitles("spiderman");
// getMovieTitles("batman");

// https://www.facebook.com/careers/life/sample_interview_questions/
const spiral = (size) => {
  if (size <= 0) {
    return "";
  }

  // Right, down, left, up (in the order we travel)
  const dirRow = [0, 1, 0, -1]; // Travelling between rows go +1 down, -1 up
  const dirCol = [1, 0, -1, 0]; // Travelling between columns go +1 right, -1 left

  // Make the 2D array
  const matrix = new Array(size).fill(0);
  for (let row = 0; row < size; ++row) matrix[row] = new Array(size).fill(0);

  const limit = size * size;
  let value = 0;
  let row = 0;
  let col = 0;
  let direction = 0;

  while (value++ < limit) {
    matrix[row][col] = value;
    row += dirRow[direction];
    col += dirCol[direction];

    // Next step is invalid
    if (row < 0 || col < 0 || row >= size || col >= size || matrix[row][col] !== 0) {
      row -= dirRow[direction];
      col -= dirCol[direction];
      direction = (direction + 1) % 4;  // Switch direction
      row += dirRow[direction];
      col += dirCol[direction];
    }
  }

  let output = "";
  matrix.forEach((rowArray) => {
    rowArray.forEach((number) => {
      output += `${String(number).padStart(Math.ceil(Math.log10(limit + 1)), "0")} `;
    });
    output += "\n";
  });

  return output;
};

// console.log(spiral(0));
// console.log(spiral(1));
// console.log(spiral(2));
// console.log(spiral(3));
// console.log(spiral(4));
// console.log(spiral(5));
// console.log(spiral(10));


/**
 * 28. Implement strStr() (easy)
 * https://leetcode.com/problems/implement-strstr
 * Score: 60ms (73.83%) and 35MB (36.28%)
 * I think I literally slept walked myself into this solution, haha. Didn't think very hard about
 * it and just wrote it out.
 * @param haystack
 * @param needle
 * @returns {number}
 */
let strStr = (haystack, needle) => {
  if (!needle) return 0;
  if (haystack.length < needle.length) return -1;

  let matching = false;

  for (let hIndex = 0; hIndex < haystack.length; ++hIndex) {
    if (haystack.length - hIndex < needle.length) return -1;
    for (let nIndex = 0; nIndex < needle.length; ++nIndex) {
      if (haystack[hIndex + nIndex] === needle[nIndex]) {
        matching = true;
      } else {
        matching = false;
        break;
      }
    }
    if (matching) {
      return hIndex;
    }
  }
  return -1;
};

// console.log("(hello, ll)", strStr("hello", "ll"));


/**
 * 24. Swap Nodes in Pairs (medium)
 * https://leetcode.com/problems/swap-nodes-in-pairs
 * Score: 56ms (90.42%) and 33.8MB (21.09%)
 * Not my answer. I really flubbed this in my original answer thinking that recursive wasn't the
 * right answer.
 * @param node
 * @returns {*}
 */
const swapPairs = (node) => {
  if (!node) return null;
  if (!node.next) return node;

  const n1 = node.next;
  const n2 = node.next.next;

  n1.next = node;
  node.next = swapPairs(n2);
  return n1;
};

const ll1 = new LinkedList();
ll1.insertAtEnd(1);
ll1.insertAtEnd(2);
ll1.insertAtEnd(3);
ll1.insertAtEnd(4);
ll1.insertAtEnd(5);
ll1.insertAtEnd(6);

// console.log("before", ll1.toString());
// const newHead = swapPairs(ll1.head);
// console.log("after", ((node) => {
//   const output = [];
//   while (node) {
//     output.push(node.data);
//     node = node.next;
//   }
//   return `[${output.join(", ")}]`;
// })(newHead)); // IIFE to print out the contents, yo.


/**
 * 26. Remove Duplicates from Sorted Array (easy)
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array
 * Score: 72ms (95.96%) and 36.8MB (93.24%)
 * Does it in place and modifies the array by reference.
 * @param nums
 * @returns {*}
 */
const removeDuplicates = (nums) => {
  if (nums.length < 2) return nums.length;
  let lastIndex = 0;

  for (let index = 1; index < nums.length; ++index) {
    if (nums[index] !== nums[lastIndex]) {
      nums[++lastIndex] = nums[index];
    }
  }

  return lastIndex + 1;
};

// const test1 = [1, 2, 2, 3, 3, 4, 4, 5];
// console.log(test1, test1.slice(0, removeDuplicates(test1)));


/**
 * 33. Search in Rotated Sorted Array (medium)
 * https://leetcode.com/problems/search-in-rotated-sorted-array
 * Score: 60ms (86.14%) and 33.7MB (97.30%)
 * Not my answer.
 * @param nums
 * @param target
 * @returns {*}
 */
const search = (nums, target) => {
  if (nums.length < 1) return -1;
  if (nums.length === 1) return nums[0] === target ? 0 : -1;

  const recurse = (left, right) => {
    if (left === right) {
      return nums[left] === target ? left : -1;
    }

    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // Pivot point is to the right of the mid
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target <= nums[mid]) {
        return recurse(left, mid - 1);  // Target is to the left of mid
      } else {
        return recurse(mid + 1, right); // Target is to the right of mid
      }
    } else {
      if (nums[mid] <= target && target <= nums[right]) {
        return recurse(mid + 1, right); // Target is to the right of mid
      } else {
        return recurse(left, mid - 1);  // Target is to the left of mid
      }
    }
  };

  return recurse(0, nums.length - 1);
};

const searchTest1 = [4, 5, 6, 7, 8, 9, 0, 1, 2, 3];
// console.log(searchTest1, "find 0", search(searchTest1, 0));


/**
 * 27. Remove Element
 * https://leetcode.com/problems/remove-element
 * Score: 60ms (87.13%) and 34MB (11.87%)
 * Removes a specific element from an array, shifting the results to the left, and modifying
 * in-place and by reference.
 * @param nums
 * @param val
 * @returns {number}
 */
const removeElement = (nums, val) => {
  let i = 0;
  for (let j = 0; j < nums.length; ++j) {
    if (nums[j] !== val) {
      nums[i] = nums[j];
      ++i;
    }
  }

  return i;
};

// let arrTest = [2, 3, 3, 2];
// let result = removeElement(arrTest, 3);
// console.log(arrTest, "->", arrTest.slice(0, result));


/**
 * 31. Next Permutation (medium)
 * https://leetcode.com/problems/next-permutation
 * Score: 68ms (94.56%) and 34.7MB (100.00%)
 * This is not my answer. This was a really weird question to be honest, but it was interesting
 * to learn from it. Main takeaway is to do the question on paper/whiteboard and try and give
 * yourself interesting test cases.
 * Basically it finds the next permutation of a number given an array of integers.
 * 1, 2, 3 -> 1, 3, 2
 * 3, 2, 1 -> 1, 2, 3 (wrap-around)
 * 1, 1, 5 -> 1, 5, 1
 * The example that I should've paid more attention to was:
 * 1, 3, 2 -> 2, 1, 3
 * @param nums
 */
const nextPermutation = (nums) => {
  let i = nums.length - 2;  // Start at second-to-last element
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    --i;  // Search leftwards for first element that is smaller than its right neighbor
  }

  if (i >= 0) {
    let j = nums.length - 1;  // Start at end
    while (j >= 0 && nums[j] <= nums[i]) {
      --j;  // Search leftwards for first element that is larger than i (ex: [i]=2, [j]=3)
    }   // It'll leave the loop on the first element that is larger
    swap(nums, i, j); // Swap those two numbers (ex: 1,2,3 becomes 1,3,2)
  }
  reverseArray(nums, i + 1);
};

const swap = (nums, left, right) => {
  const temp = nums[left];
  nums[left] = nums[right];
  nums[right] = temp;
};

const reverseArray = (nums, start) => {
  let left = start;
  let right = nums.length - 1;
  while (left < right) {
    swap(nums, left, right);
    ++left;
    --right;
  }
};


/**
 * 34. Find First and Last Position of Element in Sorted Array (medium)
 * https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array
 * Score: 60ms (88.99%) and 34.9MB (85.19%)
 * This is also not my answer, but it slightly adjusted to follow a style that I'd write it in
 * to begin.
 * @param nums
 * @param target
 * @returns {number[]}
 */
const searchRange = (nums, target) => {
  const results = [-1, -1];

  const find = (left) => {
    let low = 0;
    let high = nums.length;

    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (left) { // Going left
        if (nums[mid] >= target) {
          high = mid; // We go left
        } else {
          low = mid + 1;  // We go right
        }
      } else { // Going right
        if (nums[mid] <= target) {
          low = mid + 1; // We go right
        } else {
          high = mid; // We go left
        }
      }
    }

    return low;
  };

  const leftIndex = find(true);

  if (nums[leftIndex] !== target) {
    return results;
  }

  return [leftIndex, find(false) - 1];
};


/**
 * 35. Search Insert Position (easy)
 * https://leetcode.com/problems/search-insert-position
 * Score: 56ms (93.13%) and 33.7MB (86.77%)
 * The brute-force was super basic and I only realized how dumb it was when I saw the score.
 * Binary search was the answer. But I have to admit I got a little mixed-up with off-by-one errors.
 * I originally had right = nums.length and while(left < right) but that left holes and made for
 * odd -1 or +1 returns depending on case.
 * @param nums
 * @param target
 * @returns {number}
 */
const searchInsert = (nums, target) => {
  // This is brute force.
  // for (let x = 0; x < nums.length; ++x) {
  //     if (nums[x] >= target) return x;
  // }
  // return nums.length; // At the end

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;     // Go right
    } else {
      right = mid - 1;    // Go left
    }
  }

  return left;
};


/**
 * 36. Valid Sudoku (medium)
 * https://leetcode.com/problems/valid-sudoku/
 * Score with row, col, subBox check order: 108ms (20.61%) and 37.5MB (92.50%)
 * Score with subBox, row, col check order: 96ms (54.85%) and 37.4MB (96.25%)
 * Score with subBox, col, row check order: 92ms (62.38%) and 37.4MB (96.25%)
 * I think I could make this a little faster by moving check9 logic directly into the check
 * loops to save time on creating new arrays and instead just checking values directly.
 * It was really interesting discovering how changing the order of my check loops sped things
 * up. Checking row is clearly the fastest process as we just directly give the row to check9.
 * @param board
 * @returns {boolean}
 */
const isValidSudoku = (board) => {
  // Check sub-boxes.
  for (let subCol = 0; subCol < 3; ++subCol) {
    for (let subRow = 0; subRow < 3; ++subRow) {
      const subBox = [];  // This will be a little slower using .push().
      for (let col = subCol * 3; col < (subCol * 3) + 3; ++col) {
        for (let row = subRow * 3; row < (subRow * 3) + 3; ++row) {
          subBox.push(board[row][col]);
        }
      }
      if (!check9(subBox)) {
        console.log(`Bad subBox (row: ${subRow} col: ${subCol}): ${subBox}`);
        return false;
      }
    }
  }

  // Check columns.
  for (let col = 0; col < 9; ++col) {
    const column = new Array(9);  // Saving a tiny bit of time by declaring size of array to start.
    for (let row = 0; row < 9; ++row) {
      column[row] = board[row][col];
    }
    if (!check9(column)) {
      console.log(`Bad col ${col}: ${column}`);
      return false;
    }
  }

  // Check rows.
  for (let row = 0; row < 9; ++row) {
    if (!check9(board[row])) {
      console.log(`Bad row ${row}: ${board[row]}`);
      return false;
    }
  }

  console.log("Good!");
  return true;
};


/**
 * Check for repetition of a series of 9 sudoku entries. If there is a repeat of a number, returns
 * false. It uses bit manipulation as a cheap way to check for repeated values.
 * Value 256 128  64  32  16   8   4   2   1
 * Bit     0   0   0   0   0   0   0   0   0
 * Number  9   8   7   6   5   4   3   2   1
 * Each number is recorded as a bit (1 << (number - 1)).
 * Update: Using bitshift instead of (2 ** (number - 1)).
 * If the bit is already set that means we have a repeat and it must be rejected.
 * @param nine
 * @returns {boolean}
 */
const check9 = (nine) => {
  if (nine.length !== 9) {
    return false;
  }

  let check = 0;
  for (let i = 0; i < 9; ++i) {
    if (nine[i] !== ".") {
      const number = parseInt(nine[i], 10);
      if (number < 1 || number > 9 || (check & (1 << (number - 1)))) {
        return false;
      } else {
        check |= (1 << (number - 1));
      }
    }
  }

  return true;
};

/**
 * This is a pretty ballsy answer that someone left in my own submission thread. Using bit
 * manipulation pretty hard core. I made some adjustments for style and for clarity but it is
 * otherwise Joshua33's work.
 * The cool thing is using an array and a single digit for rows, columns, and boxes.
 * Using bit-shifting 1 and the checked number (he doesn't bother with 0, so #9 is 10th bit).
 * And using a simple bit of math to determine the box array index.
 * https://leetcode.com/problems/valid-sudoku/discuss/262509/JavaScript-using-bit-manipulation/254396
 * @param board
 * @returns {boolean}
 */
const isValidSudokuJoshua33 = (board) => {
  const rowCounts = new Array(9).fill(0); // 9 rows
  const colCounts = new Array(9).fill(0); // 9 cols
  const boxCounts = new Array(9).fill(0); // 9 boxes

  for (let row = 0; row < 9; ++row) {
    for (let col = 0; col < 9; ++col) {
      const x = board[row][col];

      if (x !== ".") {
        if (rowCounts[row] & (1 << x)) {
          return false; // If already set we have a duplicate.
        }

        if (colCounts[col] & (1 << x)) {
          return false; // If already set we have a duplicate.
        }

        // The box index is determined by the row, col position.
        //         Col Col Col
        //         0-2 3-5 6-8
        // Row 0-2  0,  1,  2,
        // Row 3-5  3,  4,  5,
        // Row 6-8  6,  7,  8,
        const box = (Math.floor(row / 3) * 3) + Math.floor(col / 3);
        if (boxCounts[box] & (1 << x)) {
          return false; // If already set we have a duplicate.
        }

        // Record the number for the row, column, and box.
        rowCounts[row] |= 1 << x;
        colCounts[col] |= 1 << x;
        boxCounts[box] |= 1 << x;
      }
    }
  }

  return true;
};

const sudokuGood = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"],
];

const sudokuBad1 = [
  ["8","3",".",".","7",".",".",".","."],  // Top left 8 is bad. Will trip column check.
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"],
];

const sudokuBad2 = [
  ["5","3",".",".","7",".",".",".","7"],  // Top right 7 is bad. Will trip row check.
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"],
];

const sudokuBad3 = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","5","8","."],  // 5 on this row is bad. Will trip sub-box check.
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"],
];

// console.log(check9(["1", "2", "3", ".", ".", ".", "7", "8", "9"]));
// console.log(check9(["1", "2", "3", ".", ".", ".", "7", "8", "1"])); // False, repeat 1
// console.log(check9(["1", "2", "3", ".", ".", ".", "7", "8"]));      // False, too few
// console.log(check9(["1", "2", "3", ".", ".", ".", "7", "8", "9", "4"]));  // False, too many
// console.log(check9(["1", "2", "3", ".", ".", ".", "7", "8", "10"]));  // False, 10 is too great
// console.log(check9(["1", "2", "3", ".", ".", ".", "7", "8", "-1"]));  // False, -1 is too low
//
// isValidSudoku(sudokuGood);
// isValidSudoku(sudokuBad1);
// isValidSudoku(sudokuBad2);
// isValidSudoku(sudokuBad3);
// console.log(isValidSudokuJoshua33(sudokuGood));
// console.log(isValidSudokuJoshua33(sudokuBad1));
// console.log(isValidSudokuJoshua33(sudokuBad2));
// console.log(isValidSudokuJoshua33(sudokuBad3));


/**
 * 38. Count and Say (easy)
 * https://leetcode.com/problems/count-and-say/
 * Score: N/A
 * People hate this question. It's freaking weird. The first time I saw it I was at a loss to what
 * the algorithm even meant. But I copied down a solution because it was given as an example on a
 * Facebook interview prep guide.
 * Answer taken from https://leetcode.com/problems/count-and-say/discuss/16123/Concise-JavaScript-using-regex
 * The regex used here is very interesting. Using \1 and lookbehind, I've never seen this before,
 * but it works.
 * What it does it it'll split up integers that may repeat. As in, 111222333 becomes 111|222|333|.
 * When you can do that, it's simply a matter of counting the length of a section and getting the
 * first element.
 * So, the hypothetical 111222333 becomes 313233 "three ones, three twos, three threes".
 * @param n
 * @returns {string}
 */
const countAndSay = (n) => {
  let res = "1";
  for (let i = 1; i < n; i++) {
    res = res
      .replace(/(\d)(?!\1)/g, "$1|")
      .split("|")
      .reduce((newRes, s) => newRes + (s ? s.length + s[0] : ""), "");  // Because we have a trailing | we gotta check !!s.
  }

  return res;
};

// console.log(countAndSay(1));
// console.log(countAndSay(2));
// console.log(countAndSay(3));
// console.log(countAndSay(4));
// console.log(countAndSay(5));
// console.log(countAndSay(6));
// console.log(countAndSay(7));


/**
 * 39. Combination Sum (medium)
 * https://leetcode.com/problems/combination-sum
 * Score: 80ms (75.30%) and 37.4MB (31.34%)
 * This was actually a pretty good one. By sorting first and trusting that there were no duplicates
 * I could forgo any sort of mapping system with memoization, though I did consider it at first.
 * The key aspect at the end was the need to use the startIndex variable, otherwise the algorithm
 * would produce multiple configurations of the same answers.
 * Another key take-away is intelligent use of sorting to create unique combinations (see
 * the above function threeSum3() for an example of this being key to an answer).
 * @param candidates
 * @param target
 * @returns {Array}
 */
const combinationSum = (candidates, target) => {
  const sorted = candidates.sort((a, b) => a - b);
  const combos = [];

  const recurse = (remain, combo, startIndex) => {
    for (let x = startIndex; x < sorted.length; ++x) {
      if (sorted[x] <= 0) {
        break;
      }  // Avoid infinite loop

      if (remain - sorted[x] === 0) {     // We found our base-case
        combos.push(combo.concat(sorted[x]));
        break;
      } else if (remain < sorted[x]) {    // Too large
        break;
      } else {                            // Too small, need to go again
        recurse(remain - sorted[x], combo.concat(sorted[x]), x);
      }
    }
  };

  recurse(target, [], 0);
  return combos;
};

// console.log(combinationSum([2, 3, 6, 7], 7));
// console.log(combinationSum([2, 3, 5], 8));


/**
 * 40. Combination Sum II (medium)
 * https://leetcode.com/problems/combination-sum-ii
 * Score: 104ms (28.34%) and 37.8MB (29.63%)
 * An evolution of the previous question. This time the numbers cannot be re-used multiple times
 * and therefore with repeats in the input list we need to track our unique combinations to prevent
 * repeating the same answers.
 * I do this by updating the startIndex to now be x + 1 so that the next loop cannot re-use the last
 * number. And by using a unique object, a basic tree. I write a new function isUnique() that
 * both determines if the combination is unique and also adds it to the tree if it is.
 * This isn't that fast. But whatever.
 * @param candidates
 * @param target
 * @returns {Array}
 */
const combinationSum2 = (candidates, target) => {
  const sorted = candidates.sort((a, b) => a - b);
  const combos = [];
  const unique = {};

  const recurse = (remain, combo, startIndex) => {
    for (let x = startIndex; x < sorted.length; ++x) {
      if (sorted[x] <= 0) {
        break;
      }  // Avoid infinite loop

      if (remain - sorted[x] === 0) {     // We found our base-case
        combo.push(sorted[x]);
        if (isUnique(combo)) {
          combos.push(combo);
        }
        break;
      } else if (remain < sorted[x]) {    // Too large
        break;
      } else {                            // Too small, need to go again
        recurse(remain - sorted[x], combo.concat(sorted[x]), x + 1);
      }
    }
  };

  const isUnique = (combo) => {
    let pointer = unique;
    for (let x = 0; x < combo.length; ++x) {
      if (!pointer[combo[x]]) {
        // On a leaf set to true, otherwise set to an empty object
        if (x === combo.length - 1) {
          pointer[combo[x]] = true;             // Last iteration of the loop = new leaf: set true
        } else {
          pointer[combo[x]] = {};               // Not the leave, set to an empty object
          pointer = pointer[combo[x]];          // Navigate furthwe
        }
      } else if (pointer[combo[x]] === true) {  // Finding a === true means we found a repeat
        return false;
      } else {                                  // Navigate further
        pointer = pointer[combo[x]];
      }
    }
    return true;
  };

  recurse(target, [], 0);
  return combos;
};

// console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));
// console.log(combinationSum2([2, 5, 2, 1, 2], 5));


/**
 * 32. Longest Valid Parentheses (hard)
 * https://leetcode.com/problems/longest-valid-parentheses/
 * Score: 68ms (88.41%) and 36.3MB (37.93%)
 * Not my answer. The specifics were a little too wild for me. I threw myself off by thinking I
 * could just use a openings counter instead of a stack and just count streaks of good values.
 * So,        ( ( ) )
 * would be   1 2 1 0           // Count that streak of 4
 * While      ( ) ) ( ( ) ) )
 * would be   1 0 x 1 2 1 0 x   // Count that streak of 4
 * But my idea immediately broke with their very first example:
 * So,        ( ( )
 * would be   1 2 1             // I'd count 3
 * I thought that maybe taking the longest streak and subtracting remaining openings (1) would work
 * but that would break very easily, for example:
 * So,         ( ) ( ( (
 * would be    1 0 1 2 3        // It's count 3 streak, subtract 3, and get zero, when it's 0.
 * Flawed idea from the outset.
 * The solution they provided that I liked, using a stack, was a little magical (it didn't make
 * intuitive sense to me) starting with [-1] and adding the current index to the stack when empty.
 * That was all a little weird to me. But -1 made sense as it would allow for () to work (1 - (-1)).
 * The current index on empty stack, though, was a little odd. But it was an off-by-one quirk. It
 * mades sense when you immediately start with say, )(). So that the first index (0) would be
 * immediately added to it, allowing the rest of the algorithm to work.
 * @param s
 * @returns {number}
 */
const longestValidParentheses = (s) => {
  let longest = 0;
  const stack = [-1];

  for (let i = 0; i < s.length; ++i) {
    if (s[i] === "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        stack.push(i);  // Restarting count
      } else {
        longest = Math.max(longest, i - stack[stack.length - 1]);
      }
    }
  }

  return longest;
};

// console.log("())(()()", longestValidParentheses("())(()()"));
// console.log(")()", longestValidParentheses(")()"));
// console.log("()))(())", longestValidParentheses("()))(())"));


/**
 * 42. Trapping Rain Water (hard)
 * https://leetcode.com/problems/trapping-rain-water/
 * Score: Not accepted, times out.
 * I spent around an hour on this guy and needed to do debugging to figure things out.
 * Turns out that using a two pointer solution, that I had mildly suspected, was the best answer.
 * I think my answer is still kinda fun, though pretty confusing to follow.
 * @param height
 * @returns {number}
 */
const trap = (height) => {
  let leftWall = 0;
  let min = 0;
  const puddle = [];
  let total = 0;

  for (let x = 0; x < height.length; ++x) {
    min = Math.min(min, height[x]);

    const wall = height[x]; // For debugging ease

    // Rain trap, record puddle
    if (leftWall > 0) {
      for (let h = leftWall - 1; h >= wall; --h) {
        if (!puddle[h]) {
          puddle[h] = 1;
        } else {
          ++puddle[h];
        }
      }
    }

    // Wall found
    if (wall > 0 && wall > min) {
      total += recordPuddleVolume(puddle, wall);
      leftWall = Math.max(wall, leftWall);  // Left wall only replaced by larger walls
      min = wall;
    }
  }

  return total;
};

const recordPuddleVolume = (puddle, max) => {
  let total = 0;
  for (let x = 0; x < max; ++x) {
    if (puddle[x] !== undefined) {
      total += puddle[x];
      puddle[x] = 0;  // Drain, we recorded it.
    }
  }
  return total;
};

// console.log([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
// console.log([4, 2, 3], trap([4, 2, 3]));  // 1
// console.log([5, 2, 1, 2, 1, 5], trap([5, 2, 1, 2, 1, 5]));  // 14
// console.log([5, 2, 1, 2, 1, 5, 0, 1], trap([5, 2, 1, 2, 1, 5, 0, 1]));  // 15


/**
 * Taken from their solutions. Two pointer solution attacking from both sides.
 * The key bit is moving on the lesser pointer. If left is shorter than right, then move left.
 * And whenever the pointer is lower than it's current max, record a puddle. By only concentrating
 * on the lowest of the pointers you'll only track the lowest viable valleys.
 * @param height
 * @returns {number}
 */
const trap2 = (height) => {
  let total = 0;
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        total += (leftMax - height[left]);
      }
      ++left;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        total += (rightMax - height[right]);
      }
      --right;
    }
  }

  return total;
};


// console.log([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], trap2([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
// console.log([4, 2, 3], trap2([4, 2, 3]));  // 1
// console.log([5, 2, 1, 2, 1, 5], trap2([5, 2, 1, 2, 1, 5]));  // 14
// console.log([5, 2, 1, 2, 1, 5, 0, 1], trap2([5, 2, 1, 2, 1, 5, 0, 1]));  // 15


const defaultComparator = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};


/**
 * Implementation of QuickSort (because it helps to write it out)
 * https://medium.com/@Charles_Stover/implementing-quicksort-in-javascript-8044a8e2bf39
 * @param unsorted
 * @param comparator
 * @returns {[]}
 */
const quickSort = (unsorted, comparator = defaultComparator) => {
  // Make a safe, deep copy.
  const sorted = [...unsorted];

  const recursiveSort = (start, end) => {
    // If the range is 1 or fewer in length it's sorted.
    if (end - start < 1) {
      return;
    }

    // Here we're using the last value as the pivot. Very simple decision.
    const pivotValue = sorted[end];
    let splitIndex = start;

    for (let i = start; i < end; ++i) {
      const sort = comparator(sorted[i], pivotValue);

      // [i] is less than the pivot value
      if (sort === -1) {
        if (i !== splitIndex) {
          // Swap them
          [sorted[splitIndex], sorted[i]] = [sorted[i], sorted[splitIndex]];
        }

        // Move the split index to the right, denoting an increase in the less-than sub-array size
        ++splitIndex;
      }
      // Leave the values that are greater than or equal to the pivot value where they are
    }

    // Move the pivot value to between the split since we know it is located BETWEEN all less-than
    // and greater-than-or-equal-to values;
    [sorted[end], sorted[splitIndex]] = [sorted[splitIndex], pivotValue];

    // Recursively sort the less-than and greater-than arrays.
    recursiveSort(start, splitIndex - 1);
    recursiveSort(splitIndex + 1, end);
  };

  recursiveSort(0, unsorted.length - 1);
  return sorted;
};

// console.log(quickSort([4, 2, 5, 3, 7, 2]));


const findKthLargest = (nums, k) => {
  const sorted = [...nums];

  const recurse = (k, low, high) => {
    const pivot = sorted[high];
    let insertI = low;
    for (let i = low; i < high; i += 1) {
      if (sorted[i] < pivot) {
        [sorted[i], sorted[insertI]] = [sorted[insertI], sorted[i]];
        ++insertI;
      }
    }
    // Pivot swap
    [sorted[insertI], sorted[high]] = [sorted[high], sorted[insertI]];

    if (high - k > insertI) {
      // Number is on the right side
      return recurse(sorted, k, insertI + 1, high);
    } else if (high - k === insertI) {
      // Pivot is the number
      return pivot;
    } else {
      // Number is on the left side
      return recurse(k - (high - insertI) - 1, low, insertI - 1);
    }
  };

  return recurse(k - 1, 0, nums.length - 1);
};

// console.log([4, 2, 5, 3, 7, 9], findKthLargest([4, 2, 5, 3, 7, 9], 2));


/**
 * 43. Multiply Strings (medium)
 * https://leetcode.com/problems/multiply-strings/
 * Score: 108ms (24.71%) and 41.9MB (15.00%)
 * Not very fast as this is essentially emulating the human steps to long multiplication by
 * calculating each product
 * @param num1
 * @param num2
 * @returns {string}
 */
const multiply = (num1, num2) => {
  // We're assuming no negatives and no non digit numbers.
  if (num1 === "0" || num2 === "0") {
    return "0";
  }

  // Do the multiplication
  const products = [];

  for (let a = num1.length - 1; a >= 0; --a) {
    let carry = 0;
    for (let b = num2.length - 1; b >= 0; --b) {
      const aNum = parseInt(num1[a], 10);
      const bNum = parseInt(num2[b], 10);
      const product = (aNum * bNum) + carry;

      // Track the carry for the next round
      carry = Math.floor(product / 10);

      const digit = product % 10;

      // Write down the digit
      if (!products[a]) {
        products[a] = `${digit}${"".padEnd(num1.length - 1 - a, "0")}`;
      } else {
        products[a] = `${digit}${products[a]}`;
      }
    }

    if (carry > 0) {
      products[a] = `${carry}${products[a]}`;
    }
  }

  // Do the addition of all the products.
  let finalProduct = "";
  let done = false;
  let counter = 0;
  let carry = 0;
  while (!done) {
    const numbers = [];
    for (let p = 0; p < products.length; ++p) {
      const len = products[p].length;
      if (products[p][len - 1 - counter]) {
        numbers.push(products[p][len - 1 - counter]);
      }
    }

    if (numbers.length === 0) {
      done = true;
      break;
    }

    const sum = carry + numbers.reduce((total, val) => total + parseInt(val, 10), 0);
    carry = Math.floor(sum / 10);
    finalProduct = `${(sum % 10)}${finalProduct}`;

    ++counter;
  }

  // If there is a carry, add it.
  if (carry > 0) {
    finalProduct = `${carry}${finalProduct}`;
  }

  return finalProduct;
};

// console.log(multiply("123", "456"));  // 56088
// console.log(multiply("123", "0"));    // 0


/**
 * Different approach is much cleaner and smarter. It totally skips the long addition step I went
 * through the trouble of writing.
 * @param num1
 * @param num2
 * @returns {string}
 */
const multiply2 = (num1, num2) => {
  if (num1 === "0" || num2 === "0") {
    return "0";
  }

  // Create an array of zeroes that is the sum of the length of the two numbers.
  const product = new Array(num1.length + num2.length);
  product.fill(0);

  let pos = product.length - 1;
  for (let a = num1.length - 1; a >= 0; --a) {
    let tempPos = pos;
    for (let b = num2.length - 1; b >= 0; --b) {
      product[tempPos] += (parseInt(num1[a], 10) * parseInt(num2[b], 10));
      product[tempPos - 1] += Math.floor(product[tempPos] / 10); // Carry
      product[tempPos] %= 10; // Make a single digit
      --tempPos;  // Shift over one digit to get to next power of 10
    }
    --pos;
  }

  // Join the numbers array and trim off the leading zeroes.
  return product.join("").replace(/^0+/, "");
};

// console.log(multiply2("123", "456"));  // 56088
// console.log(multiply2("123", "0"));    // 0


/**
 * 46. Permutations (medium)
 * https://leetcode.com/problems/permutations
 * Score: 72ms (86.90%) and 37MB (46.46%)
 * I had to seek out a solution to solve my issue. One problem was that I wanted to use splice()
 * but didn't want to affect the original array. I also needed to create new arrays for every
 * recursive call. If I didn't I'd be passing the same reference between all stacks, causing
 * chaos. So the solution I found had liberal use of concat(). By using concat() and splice() twice
 * on the same array you can perform a kind of splice() but one that leaves the original array
 * alone and returns a new array object.
 * @param nums
 * @returns {Array}
 */
const permute = (nums) => {
  const results = [];

  const recurse = (input, output) => {
    if (input.length === 0) {
      results.push(output);
    } else {
      for (let x = 0; x < input.length; ++x) {
        // Key point is to use concat to create new arrays
        recurse(
          input.slice(0, x).concat(input.slice(x + 1)),
          output.concat(input[x]),
        );
      }
    }
  };

  recurse(nums, []);
  return results;
};

// console.log([1, 2, 3], permute([1, 2, 3]));


/**
 * 47. Permutations II (medium)
 * https://leetcode.com/problems/permutations-ii
 * Score: 408ms (5.07%) and 43.3MB (14.29%)
 * Really bad score. I just did what seemed obvious, using a tree that would determine if the
 * output is unique or not. Some improvements I saw was people using sort at the beginning to sort
 * nums and using a count or visited system.
 * @param nums
 * @returns {Array}
 */
const permuteUnique = (nums) => {
  const results = [];
  const uniques = {};

  const recurse = (input, output) => {
    if (input.length === 0) {
      // Only push to results if the result is unique
      if (isUnique(output, uniques)) {
        results.push(output);
      }
    } else {
      for (let x = 0; x < input.length; ++x) {
        recurse(
          input.slice(0, x).concat(input.slice(x + 1)),
          output.concat(input[x]),
        );
      }
    }
  };

  recurse(nums, []);
  return results;
};

const isUnique = (nums, uniques) => {
  let ptr = uniques;

  for (let x = 0; x < nums.length; ++x) {
    // New combo found
    if (!ptr[nums[x]]) {
      // Is a leaf, set as true and return true
      if (x === nums.length - 1) {
        ptr[nums[x]] = true;
        return true;
      } else {    // Not a leaf, new object and move pointer
        ptr[nums[x]] = {};
        ptr = ptr[nums[x]];
      }
    } else if (ptr[nums[x]] === true) {
      // We found a leaf that already exists
      return false;
      // Navigate to the next node
    } else {
      ptr = ptr[nums[x]];
    }
  }

  return false; // Should never reach this.
};

// console.log([1, 2, 1], permuteUnique([1, 2, 1]));


/**
 * 48. Rotate Image (medium)
 * https://leetcode.com/problems/rotate-image/
 * Score: 56ms (94.68%) and 33.7MB (81.54%)
 * I went back and looked up the previous solution but ended up putting my own spin on it.
 * I accidentally discovered a funny little quirk where if you have four corners and swap
 * between one corner and the other three corners once each, you'll end up rotating the corners.
 * Ex: (TR = top right, BR = bottom right, BL = bottom left)
 *   Swap TR    Swap BR    Swap BL
 * |  1 - 2   |  2   1   |  4   1  |   3   1  |
 * |         -|>   \    -|> |     -|>         |
 * |  3   4   |  3   4   |  3   2  |   4   2  |
 *    You end up rotated!
 * @param matrix
 * @returns {*}
 */
const rotate = (matrix) => {
  const size = matrix.length;
  const halfSize = Math.floor(size / 2);

  const swapCells = (matrix, l1, l2, r1, r2) => {
    const temp = matrix[l1][l2];
    matrix[l1][l2] = matrix[r1][r2];
    matrix[r1][r2] = temp;
  };

  for (let layer = 0; layer < halfSize; ++layer) {
    const swapRange = size - 1 - (layer * 2);
    const end = size - 1 - layer;

    for (let i = 0; i < swapRange; ++i) {
      // These swaps are slow and take up extra memory. Score: 60ms (67.96%) and 34.2MB (15.38%)
      // Top right swap
      // [matrix[layer][layer + i], matrix[layer + i][end]] =
      //   [matrix[layer + i][end], matrix[layer][layer + i]];
      //
      // // Bottom right swap
      // [matrix[layer][layer + i], matrix[end][end - i]] =
      //   [matrix[end][end - i], matrix[layer][layer + i]];
      //
      // // Bottom left swap
      // [matrix[layer][layer + i], matrix[end - i][layer]] =
      //   [matrix[end - i][layer], matrix[layer][layer + i]];

      // Top right swap
      swapCells(matrix, layer, layer + i, layer + i, end);

      // Bottom right swap
      swapCells(matrix, layer, layer + i, end, end - i);

      // Bottom left swap
      swapCells(matrix, layer, layer + i, end - i, layer);
    }
  }

  return matrix;
};

// console.log(rotate(img1x1));  // [ [ '1' ] ]
// console.log(rotate(img2x2));  // [ [ '3', '1' ], [ '4', '2' ] ]
// console.log(rotate(img3x3));  // [ [ '7', '4', '1' ], [ '8', '5', '2' ], [ '9', '6', '3' ] ]
// console.log(rotate(img4x4));
/*
[ [ '13', ' 9', ' 5', ' 1' ],
  [ '14', '10', ' 6', ' 2' ],
  [ '15', '11', ' 7', ' 3' ],
  [ '16', '12', ' 8', ' 4' ] ]
 */


/**
 * 49. Group Anagrams (medium)
 * https://leetcode.com/problems/group-anagrams
 * Score: 124ms (93.55%) and 44.6MB (91.82%)
 * Heh, made a couple of silly mistakes. The sort algorithm cannot be simply made to be "a - b" when
 * doing strings. I had a helper function but realized I could just make it a one-line solution.
 * I use a map to save some time as an alternative would be to place the groups into the map
 * directly and then return the contents of the map in an array, which I feel is slightly dirty
 * as it often will mix up the output.
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = (strs) => {
  const groups = [];
  const map = {};

  strs.forEach((str) => {
    const sorted = str.split("").sort().join("");

    if (map[sorted] === undefined) {  // Need to check undefined as the first entry will be 0
      // This is a new anagram
      map[sorted] = groups.push([str]) - 1; // Get the new tail's index with length - 1
    } else {
      // It's a recognized anagram
      groups[map[sorted]].push(str);  // Add to the group
    }
  });

  return groups;
};

// console.log(["eat", "tea", "tan", "ate", "nat", "bat"], groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));

const person = {
  firstName: "John",
  lastName: "Doe",
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

const greet = function (language = "en", ending = "!") {
  if (language === "en") {
    console.log(`Hello, ${this.getFullName()}${ending}`);
  } else if (language === "es") {
    console.log(`Hola, ${this.getFullName()}${ending}`);
  }
};

// Bind example. Give it its "this" context in the form of person
const boundGreet = greet.bind(person);
// boundGreet();                    // Hello, John Doe!

// Call example. Immediately call it with "this" context. Following args are function args.
// greet.call(person);                 // Hello, John Doe!
// greet.call(person, "es");           // Hola, John Doe!
// greet.call(person, "es", "...");    // Hola, John Doe...

// Apply example. Just like .call() but the arguments are passed in an array.
// greet.apply(person, ["es"]);        // Hola, John Doe!
// greet.apply(person, ["es", "..."]); // Hola, John Doe...

// Function borrowing example.
const person2 = {
  firstName: "Jane",
  lastName: "Doe",  // This will be undefined if not set here.
};

// Call person's getFullName function but with person2 object.
// console.log(person.getFullName.apply(person2)); // Jane Doe

// Function currying example.
function myMultiply(a, b) {
  return a * b;
}

// Function currying = Creating a copy of a function but with some
// preset parameters
const multipleByTwo = myMultiply.bind(this, 2);   // "a" becomes 2
const multipleByThree = myMultiply.bind(this, 3); // "a" becomes 3
// console.log(multipleByTwo(5));    // 10
// console.log(multipleByThree(5));  // 15


// Callback Hell Example Question
function mockHttpRequest(url, callback) {
  setTimeout(callback, 100 + (Math.random() * 200));
}

// Rewrite this function, to avoid "callback hell"
function mockSomething(user, pass) {
  mockHttpRequest("/user/login", function(loginRes) {
    // Do something to login
    mockHttpRequest("/user/profile/get", function(profileRes) {
      // Do something to profile
      mockHttpRequest("/user/preferences/set", function() {
        // Do something to preferences
        console.log(`All calls complete! ${user}, ${pass}`);
      });
    });
  });
}

// mockSomething("user1", "password");
// console.log("Doing #1 now!");


// Strategy #1 - Just moving some functions out.
// We don't do anything with data, by the way. It just looked weird without it.
function getLogin(data, cb) {
  mockHttpRequest("/user/login", cb);
  // Do something to login
}
function getProfile(data, cb) {
  mockHttpRequest("/user/profile/get", cb);
  // Do something to profile
}
function setPreferences(data, cb) {
  mockHttpRequest("/user/preferences/set", cb);
  // Do something to preferences
}

function mockSomething2(user, pass) {
  getLogin([user, pass], (loginRes) => {
    getProfile(loginRes, (profileRes) => {
      setPreferences(profileRes, () => {
        console.log(`All calls complete! ${user}, ${pass}`);
      });
    });
  });
}

// mockSomething2("user2", "password");
// console.log("Doing #2 now!");


// Strategy #2 - Using promises
// Need to promisify everything including mockHttpRequest().
function mockHttpRequestP(url) {
  return new Promise((resolve, reject) => {
    const waitTime = Math.floor(100 + (Math.random() * 200));
    if (waitTime % 10 === 0) {  // One in ten will fail.
      reject(new Error(`Bad response from ${url}`));
    }
    setTimeout(() => resolve(`${Math.floor(waitTime)}ms`), waitTime); // Returning timing info.
  });
}
function getLoginP(user, pass) {
  return new Promise((resolve, reject) => {
    mockHttpRequestP("/user/login")
      .then(waitTime => resolve(`${user}, ${pass}: Got Login in ${waitTime}!`))
      .catch(err => reject(err));
  });
}
function getProfileP(data) {
  return new Promise((resolve, reject) => {
    mockHttpRequestP("/user/profile/get")
      .then(waitTime => resolve(`${data} Got Profile in ${waitTime}!`))
      .catch(err => reject(err));
  });
}
function getPreferencesP(data) {
  return new Promise((resolve, reject) => {
    mockHttpRequestP("/user/preferences/set")
      .then(waitTime => resolve(`${data} Set Preferences in ${waitTime}!`))
      .catch(err => reject(err));
  });
}

function mockSomething3(user, pass) {
  getLoginP(user, pass)
    .then(loginData => getProfileP(loginData))
    .then(profileData => getPreferencesP(profileData))
    .then(preferencesData => console.log(`All calls complete! ${preferencesData}`))
    .catch(err => console.log(`Error! "${err.message}"`));
}

// mockSomething3("user3", "password");
// console.log("Doing #3 now!");


// Strategy #3 - Use Async and Await
// Need to promisify setTimeout() to work. https://stackoverflow.com/a/33292942/3120546
const sleep = waitTime => new Promise(resolve => setTimeout(resolve, waitTime));

async function mockHttpRequestA(url) {
  const waitTime = Math.floor(100 + (Math.random() * 200));

  // Just awaiting the promise.
  await sleep(waitTime);

  // Simulate a 1-in-10 chance of a bad response.
  if (waitTime % 10 === 0) {
    throw new Error(`Bad response from ${url}`);
  }

  return waitTime;
}

async function getLoginA(user, pass) {
  return `${user}, ${pass}: Got Login in ${await mockHttpRequestA("/user/login")}ms!`;
}

async function getProfileA() {
  return ` Got Profile in ${await mockHttpRequestA("/user/profile/get")}ms!`;
}

async function getPreferencesA() {
  return ` Set Preferences in ${await mockHttpRequestA("/user/preferences/set")}ms!`;
}

async function mockSomething4(user, pass) {
  try {
    let results = "";
    results += await getLoginA(user, pass);
    results += await getProfileA();
    results += await getPreferencesA();

    console.log(`All calls complete! ${results}`);
  } catch (err) {
    console.log(`Error! "${err.message}"`);
  }
}

// mockSomething4("user4", "password");
// console.log("Doing #4 now!");


// Promisify a function from memory
function sleepPromise(time) {
  return new Promise((resolve, reject) => {
    if (time < 0) {
      reject();
    } else {
      setTimeout(resolve, time);
    }
  });
}

// Use a promise from memory
// sleepPromise(300)
//   .then(() => console.log("SleepA promise complete!"))
//   .catch(() => console.log("SleepA failed..."));
// console.log("SleepA called sleepPromise(300)");
//
// sleepPromise(-300)
//   .then(() => console.log("SleepB promise complete!"))
//   .catch(() => console.log("SleepB failed..."));
// console.log("SleepB called sleepPromise(-300)");


// Use await from memory
async function doSleep(title, time) {
  console.log(`${title} should take ${time}ms...`);
  try {
    // Note here that sleepPromise is not an async function, rather it returns a promise
    await sleepPromise(time);
    console.log(`${title} doSleep ${time}ms done!`);
  } catch (err) {
    console.log(`${title} doSleep ${time}ms failed!`);
  }
  return [title, time];
}

// doSleep("SleepC", 2000);
// doSleep("SleepD", -2000);


// Example of Promise.all()
// This starts all sleep functions at the same time.
async function multiSleep(sleeps) {
  if (!sleeps || sleeps.length === 0) {
    return;
  }

  const sleepFunctions = sleeps.map(config => doSleep(config.title, config.time));
  const totalTime = sleeps.reduce((sum, { time }) => sum + time, 0);

  const start = performance();
  const results = await Promise.all(sleepFunctions);
  console.log("Promise.all() results:", results);
  const end = performance();

  console.log(
    `${sleeps.length} sleeps completed in ${Math.floor(end - start)}ms, not ${totalTime}ms`,
  );
}

// Proof in point, if we used await for each one of the following 4 sleeps it'd take 19 seconds
// to complete the following sleeps:
// multiSleep([
//   { title: "SleepE", time: 5000 },
//   { title: "SleepF", time: 6000 },
//   { title: "SleepG", time: 5000 },
//   { title: "SleepH", time: 3000 },
// ]);

// https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/pig-latin/
function translatePigLatin(str) {
  const clusterFind = str.match(/^[^aeiou]+/);

  if (clusterFind) {
    str = str.slice(clusterFind[0].length);
    str += clusterFind[0] + "ay";
  } else {
    str += "way";
  }
  return str;
}

// console.log(translatePigLatin("consonant"));
// console.log(translatePigLatin("california"));
// console.log(translatePigLatin("paragraphs"));
// console.log(translatePigLatin("glove"));
// console.log(translatePigLatin("algorithm"));
// console.log(translatePigLatin("eight"));
// console.log(translatePigLatin("sky"));
// console.log(translatePigLatin("skrrrt"));


// https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/sum-all-odd-fibonacci-numbers
function sumOddFibs(num) {
  let oddSum = 0;
  let a = 1;
  let b = 0;
  let temp;

  while (a <= num) {
    if (a % 2 === 1) {
      oddSum += a;
    }

    temp = a;
    a = a + b;
    b = temp;
  }

  return oddSum;
}

// console.log(sumOddFibs(4));
// console.log(sumOddFibs(75024));
// console.log(sumOddFibs(75025));

// https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/intermediate-algorithm-scripting/sum-all-primes
function sumPrimes(num) {
  let sum = 0;

  for (let x = 2; x <= num; ++x) {
    if (isPrime(x)) {
      sum += x;
    }
  }

  return sum;
}

function isPrime(num) {
  num = Math.abs(num);  // Just dealing with positive numbers
  if (num < 2) return false;  // 0 and 1 are not primes
  if (num === 2) return true; // 2 is a prime
  if (num % 2 === 0) return false;  // Even numbers other than 2 are not prime
  let divisor = 3;
  while (divisor < num / 2) {
    if ((num / divisor) % 1 === 0) {
      return false;
    }
    ++divisor;
  }
  return true;
}

// console.log(sumPrimes(2));    // 2
// console.log(sumPrimes(3));    // 5
// console.log(sumPrimes(5));    // 10
// console.log(sumPrimes(10));   // 17
// console.log(sumPrimes(977));  // 73156


// Dynamic programming solution to the classic change making algorithm
// https://www.geeksforgeeks.org/find-minimum-number-of-coins-that-make-a-change/
const makeChangeDynamic = (coins, value, printout = false) => {
  // Create a table to hold minimum coin numbers.
  const table = new Array(value + 1).fill(Number.MAX_SAFE_INTEGER);
  table[0] = 0;

  // Compute minimum coins required for all values between 1 and value
  for (let count = 1; count <= value; ++count) {
    // Go through all coins
    for (let coin = 0; coin < coins.length; ++coin) {
      // Only try a coin that is smaller than what we need (don't try to use a quarter for 24 cents)
      if (coins[coin] <= count) {
        // Grab the previously calculated value.
        const subResult = table[count - coins[coin]];
        // If this solution is one coin better, save it.
        if (subResult !== Number.MAX_SAFE_INTEGER && subResult + 1 < table[count]) {
          table[count] = subResult + 1; // Add one new coin.
        }
      } // If coin values incremented in value we could break to save some time.
    }
  }

  if (printout) {
    console.log(table.map((coinCount, sumValue) => `${sumValue} cents needs ${coinCount} coins`));
  }
  return table[value];  // This will have the minimum number of coins.
};

// console.log("makeChangeDynamic()", makeChangeDynamic([1, 5, 10, 25], 99, true));  // 3x25, 2x10, 4x1 = 9 coins


/**
 * 54. Spiral Matrix (medium)
 * https://leetcode.com/problems/spiral-matrix
 * Score: 56ms (94.80%) and 31.4MB (7.06%)
 * I lifted an idea from an example question I did for Facebook (see function spiral() above)
 * where the directions were controlled with pre-set incrementer.
 * I made a dumb mistake of setting the dirs values incorrectly, forgetting that the rows were
 * opposite what you expected (to move DOWN you INCREMENT the row value).
 * I didn't know a good way of using a single iteration tracking value to control the borders, so I
 * ended up using rowStart/rowEnd/colStart/colEnd values. Finally, I copped-out and used a set
 * length for the array (rows * cols) to end the function early, otherwise the algorithm would
 * always append one extra value at the end as the start/end values weren't checked until the next
 * round of the loop.
 * This one took me at least 30 minutes of work. I didn't have a whiteboard or paper, I imagine
 * using them would've really helped.
 * @param {number[][]} matrix
 * @return {number[]}
 */
const spiralOrder = (matrix) => {
  if (!matrix.length || !matrix[0].length) return [];

  // Going to use a trick I saw for another question I saw some weeks ago.
  const dirs = [
    [0, 1],  // Move right (0 rows, 1 cols)
    [1, 0], // Move down (1 rows, 0 cols)
    [0, -1], // Move left (0 rows, -1 cols)
    [-1, 0],  // Move up (-1 rows, 0 cols)
  ];
  let dir = 0;
  const rows = matrix.length;
  const cols = matrix[0].length;

  let iteration = 0;
  const results = new Array(rows * cols);

  let rowStart = 0;
  let rowEnd = rows;
  let colStart = 0;
  let colEnd = cols;
  let row = 0;
  let col = 0;   // Start -1 so the first one is 0

  // Limiting the iteration cound to rows * cols is a cop-out
  // Just didn't want to deal...
  while (iteration < rows * cols) {
    results[iteration] = (matrix[row][col]);

    if (row + dirs[dir][0] >= rowEnd || row + dirs[dir][0] < rowStart ||
        col + dirs[dir][1] >= colEnd || col + dirs[dir][1] < colStart
    ) {
      if (dir === 0) ++rowStart;  // Moved as far right as we could
      if (dir === 1) --colEnd;    // Moved as far down as we could
      if (dir === 2) --rowEnd;    // Moved as far left as we could
      if (dir === 3) ++colStart;  // Moved as far up as we could
      dir = (dir + 1) % 4;
    }

    row += dirs[dir][0];
    col += dirs[dir][1];

    ++iteration;
  }

  return results;
};
// 1 2 3
// 4 5 6
// 7 8 9
const spiralOrder01 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
// -> 1 2 3 6 9 8 7 4 5
console.log(spiralOrder(spiralOrder01));

// 1  2  3  4
// 5  6  7  8
// 9 10 11 12
const spiralOrder02 = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]];
// -> 1 2 3 4 8 12 11 10 9 5 6 7
// console.log(spiralOrder(spiralOrder02));

// Edge-y cases
const spiralOrder03 = [[1]];
// console.log(spiralOrder(spiralOrder03));
const spiralOrder04 = [[1, 2]];
// console.log(spiralOrder(spiralOrder04));
const spiralOrder05 = [[1], [2]];
// console.log(spiralOrder(spiralOrder05));
const spiralOrder06 = [[1, 2], [3, 4]];
// console.log(spiralOrder(spiralOrder06));
const spiralOrder07 = [[1], [2], [3]];
// console.log(spiralOrder(spiralOrder07));
const spiralOrder08 = [];
// console.log(spiralOrder(spiralOrder08));
const spiralOrder09 = [[]];
// console.log(spiralOrder(spiralOrder09));

import fetch from "node-fetch";

const testFetch = () => {
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then(response => response.json())
    .then(json => console.log(json));

};

// testFetch();

const testFetchP = () => {
  return new Promise((res, err) => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(response => response.json())
      .then(json => res(json));
  });
};

async function fetchAsync() {
  const results = await testFetchP();
  console.log("awaiting", results);
}

fetchAsync().then(res => console.log("done"));
