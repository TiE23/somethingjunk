/* eslint-disable no-console, camelcase */
// To confirm that ES6 import syntax works.
// import { findIndex } from "lodash";
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

// console.log(23, letterCombinations(23));
// console.log(233, letterCombinations(233));


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

console.log(1, generateParenthesis(1));
console.log(2, generateParenthesis(2));
console.log(3, generateParenthesis(3));
// console.log(4, generateParenthesis(4));
