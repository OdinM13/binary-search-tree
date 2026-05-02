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
    let queue = [];
    let tmpPointer = this.root;
    queue.push(tmpPointer);
    while (queue.length !== 0) {
      const element = queue.shift();
      if (element.data === value) {
        return true;
      }
      if (element.left !== null) {
        queue.push(element.left);
      }
      if (element.right !== null) {
        queue.push(element.right);
      }
    }
    return false;
  }

  insert(value) {
    // accepts a value and inserts a new node with that value into the tree
    // if the function is called with a value that already exists in the tree, the function should do nothing
    if (this.includes(value)) {
      return;
    }
    let tmpPointer = this.root;
    while (true) {
      if (value < tmpPointer.data) {
        if (tmpPointer.left === null) {
          const newNode = new Node(value);
          tmpPointer.left = newNode;
          return;
        }
        tmpPointer = tmpPointer.left;
      } else if (value > tmpPointer.data) {
        if (tmpPointer.right === null) {
          const newNode = new Node(value);
          tmpPointer.right = newNode;
          return;
        }
        tmpPointer = tmpPointer.right;
      }
    }
  }

  deleteItem(value) {
    // accepts a value and removes it from the tree
    // if the given value doesn't exist in the tree, the function should do nothing
    if (!this.includes(value)) {
      return;
    }
    this.root = this.delete(this.root, value);
  }

  delete(node, value) {
    if (node === null) { // Breaking condition
      return null;
    }
    if (value < node.data) {
      node.left = this.delete(node.left, value);
    }
    if (value > node.data) {
      node.right = this.delete(node.right, value);
    }
    if (value === node.data) {
      if (node.left === null && node.right !== null) {
        return node.right;
      }
      if (node.left !== null && node.right === null) {
        return node.left;
      }
      if (node.left === null && node.right === null) {
        return null;
      }
      if (node.left !== null && node.right !== null) {
        node.data = this.findMin(node);
        node.right = this.delete(node.right, node.data);
      }
    }
    return node;
  }

  findMin(node) {
    let stepRight = node.right;
    while (stepRight.left !== null) {
      stepRight = stepRight.left;
    }   
    return stepRight.data;
  }

  levelOrderForEach(callback) {
    // accepts a callback function as its parameter. levelOrderForEach() should traverse the tree in breadth-first level order and call the callback on each value
    // as it traverses, passing each value (not the nodes) as an argument
    // If no callback function is provided, throw an Error reporting that a callback is required
    if (typeof callback !== 'function') {
      throw new Error("Provide a callback function!");
    }
    let queue = [];
    let tmpPointer = this.root;
    queue.push(tmpPointer);
    while (queue.length !== 0) {
      const element = queue.shift();
      callback(element.data); 
      if (element.left !== null) {
        queue.push(element.left);
      }
      if (element.right !== null) {
        queue.push(element.right);
      }
    }
  }

  inOrderForEach(callback) {

  } 

  preOrderForEach(callback) {
    // STILL OPEN.
    let queue = [];
    let tmpPointer = this.root;
    let counter = 0;
    queue.push(tmpPointer);
    while (queue.length !== 0) {
      const element = queue.shift();
      if (element.data === value) {
        return counter;
      }
      if (element.right !== null) {
        queue.unshift(element.right);
      }
      if (element.left !== null) {
        queue.unshift(element.left);
      }
      counter++;
    }
  }

  postOrderForEach(callback) {

  }

  height(value) {
    // returns the height of the node containing the given value
    // Height is defined as the number of edges in the longest path from that node to a leaf node
    // If the value is not found in the tree, the function should return undefined.
    if (!this.includes(value)) {
      return undefined;
    }
    let queue = [];
    let tmpPointer = this.root;
    let level = 0;
    let height = -1;
    let depth = -1;
    queue.push(tmpPointer);

    while (queue.length !== 0) {
      let n = queue.length;
      for (let i = 0; i < n; i++) {
        const element = queue.shift();
        if (element.data === value) {
          depth = level;
          queue = [];
        }
        if (element.left !== null) {
          queue.push(element.left);
        }
        if (element.right !== null) {
          queue.push(element.right);
        }
        if (element.data === value) {
          break;
        }
      }
      level++;
    }
    return height = level - depth - 1;
  }

  depth(value) {
    // returns the depth of the node containing the given value
    // Depth is defined as the number of edges in the path from that node to the root node
    // If the value is not found in the tree, the function should return undefined.
    if (!this.includes(value)) {
      return undefined;
    }
    let queue = [];
    let tmpPointer = this.root;
    let level = 0;
    let depth = -1;
    queue.push(tmpPointer);

    while (queue.length !== 0) {
      let n = queue.length;
      for (let i = 0; i < n; i++) {
        const element = queue.shift();
        if (element.data === value) {
          depth = level;
          queue = [];
        }
        if (element.left !== null) {
          queue.push(element.left);
        }
        if (element.right !== null) {
          queue.push(element.right);
        }
        if (element.data === value) {
          break;
        }
      }
      level++;
    }
    return depth;
  }

  isBalanced() {
    // checks if the tree is balanced
    // A binary tree is considered balanced if, for every node in the tree, 
    // the height difference between its left and right subtrees is no more than 1, and both the left and right subtrees are also balanced.
    return this.checkNode(this.root);
  }

  checkNode(node) {
    if (node === null) {
      return true;
    }
    const lHeight = this.nodeHeight(node.left);
    const rHeight = this.nodeHeight(node.right);
    
    if (Math.abs(lHeight - rHeight) > 1) {
      return false;
    }

    return this.checkNode(node.left) && this.checkNode(node.right);
  }

  nodeHeight(node) {
    if (node === null) return 0;
    return 1 + Math.max(this.nodeHeight(node.left), this.nodeHeight(node.right));
  }

  rebalance() {
    // rebalances an unbalanced tree
    // You’ll want to use a traversal method to provide a new array to the buildTree() function.
    let queue = [];
    let newTree = [];
    let tmpPointer = this.root;
    queue.push(tmpPointer);
    newTree.push(tmpPointer.data);
    while (queue.length !== 0) {
      const element = queue.shift();
      if (element.left !== null) {
        queue.push(element.left);
        newTree.push(element.left.data);
      }
      if (element.right !== null) {
        queue.push(element.right);
        newTree.push(element.right.data);
      }
    }
    this.root = this.buildTree(newTree);
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
console.log('Tree includes 8: ', test.includes(8));
console.log('Tree includes 10: ', test.includes(10));
console.log(test.insert(10));
console.log('Tree includes 10: ', test.includes(10));
console.log('Depth for value 10: ', test.depth(10));
console.log(test.insert(11));
console.log(test.insert(11));
console.log(prettyPrint(test.root));
console.log('Is tree balanced? ', test.isBalanced());

console.log('Rebalanced tree: ', test.rebalance());
console.log(prettyPrint(test.root));
console.log('Is tree balanced? ', test.isBalanced());

console.log('Height of tree at 11: ', test.height(11));
console.log('Height of tree at 10: ', test.height(10));

console.log('Depth of tree at 11: ', test.depth(11));
console.log('Depth of tree at 10: ', test.depth(10));

// console.log('Delete Item 3: ', test.deleteItem(3));
console.log('Delete Item 4: ', test.deleteItem(4));
// console.log('Delete Item 1: ', test.deleteItem(1));
console.log(prettyPrint(test.root));
