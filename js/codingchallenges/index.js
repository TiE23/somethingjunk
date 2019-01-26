/* eslint-disable no-console, camelcase */

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

const tree = new Tree("A");
tree.root.children.push(new TreeNode("B"));
tree.root.children[0].parent = tree.root;
tree.root.children.push(new TreeNode("C"));
tree.root.children[1].parent = tree.root;
tree.root.children[0].children.push(new TreeNode("D"));
tree.root.children[0].children[0].parent = tree.root.children[0];
console.log(String(tree.find("A")));
console.log(String(tree.find("D")));
tree.add("E", "B", tree.traverseBF);
console.log(String(tree.find("E")));
console.log(String(tree.find("B")));
tree.remove("E");
console.log(String(tree.find("B")));
