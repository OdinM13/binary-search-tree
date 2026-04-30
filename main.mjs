import { mergeSort, prettyPrint } from './utils.mjs';

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
  // takes an array of numbers and turns it into a balanced binary tree
  // return level-0 root node
  const sortedArray = mergeSort(array);
  console.log(mergeSort(array));
  return this.sortedArrayToBSTRecur(sortedArray, 0, sortedArray.length - 1);
  }

  sortedArrayToBSTRecur(arr, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);

    // Divide from middle element
    root.left = this.sortedArrayToBSTRecur(arr, start, mid - 1);
    root.right = this.sortedArrayToBSTRecur(arr, mid + 1, end);

    return root;
  }

  includes(value) {
  // accepts a value and returns true if the given value is in the tree. Else false
  }

  insert(value) {
  // accepts a value and inserts a new node with that value into the tree
  // if the function is called with a value that already exists in the tree, the function should do nothing
    // So I need to call function includes(value) first to check for the value and only then continue
  }

  deleteItem(value) {
  // accepts a value and removes it from the tree
  // if the given value doesn't exist in the tree, the function should do nothing
    // So I need to call function includes(value) first to check for the value and only then continue
  }

  levelOrderForEach(callback) {
  // accepts a callback function as its parameter. levelOrderForEach() should traverse the tree in breadth-first level order and call the callback on each value
  // as it traverses, passing each value (not the nodes) as an argument
  // If no callback function is provided, throw an Error reporting that a callback is required
  }

  inOrderForEach(callback) {

  } 

  preOrderForEach(callback) {

  }

  postOrderForEach(callback) {

  }

  height(value) {
  // returns the height of the node containing the given value
  // Height is defined as the number of edges in the longest path from that node to a leaf node
  // If the value is not found in the tree, the function should return undefined.
  }

  depth(value) {
  // returns the depth of the node containing the given value
  // Depth is defined as the number of edges in the path from that node to the root node
  // If the value is not found in the tree, the function should return undefined.
  }

  isBalanced() {
  // checks if the tree is balanced
  // A binary tree is considered balanced if, for every node in the tree, 
  // the height difference between its left and right subtrees is no more than 1, and both the left and right subtrees are also balanced.
  }

  rebalance() {
  // rebalances an unbalanced tree
  // You’ll want to use a traversal method to provide a new array to the buildTree() function.
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log(prettyPrint(test.root));
