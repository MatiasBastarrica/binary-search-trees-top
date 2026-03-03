import { Node } from "./node.js";

export class Tree {
  constructor(arr) {
    this.root = this.#buildTree(arr);
  }

  #buildTree(arr) {
    const balancedArr = this.#sortAndBalance(arr);
    const root = this.#sortedArrayToBSTRecur(
      balancedArr,
      0,
      balancedArr.length - 1,
    );
    return root;
  }

  #sortAndBalance(arr) {
    const sorted = arr.sort((a, b) => a - b);
    let balanced = [];

    for (let prev = -1, curr = 0; curr < sorted.length; prev++, curr++) {
      if (prev < 0) {
        balanced.push(sorted[curr]);
      } else if (sorted[prev] !== sorted[curr]) {
        balanced.push(sorted[curr]);
      }
    }

    return balanced;
  }

  #sortedArrayToBSTRecur(arr, start, end) {
    if (start > end) {
      return null;
    }

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);

    root.leftNode = this.#sortedArrayToBSTRecur(arr, start, mid - 1);
    root.rightNode = this.#sortedArrayToBSTRecur(arr, mid + 1, end);

    return root;
  }

  includes(value) {
    return this.#includesRec(value, this.root);
  }

  #includesRec(value, node) {
    let left;
    let right;
    if (node !== null && node.data === value) {
      return true;
    }

    if (node.leftNode !== null) {
      left = this.#includesRec(value, node.leftNode);
      if (left) {
        return true;
      }
    }
    if (node.rightNode !== null) {
      right = this.#includesRec(value, node.rightNode);
      if (right) {
        return true;
      }
    }

    if (!left && !right) {
      return false;
    } else {
      return true;
    }
  }

  insert(value) {
    // continue
    if (this.includes(value)) {
      return;
    }
    this.#insertRec(value, this.root);
  }

  #insertRec(value, node) {
    if (node.data > value) {
      if (node.leftNode === null) {
        node.leftNode = new Node(value, null, null);
      }
      this.#insertRec(value, node.leftNode);
    }
    if (node.data < value) {
      if (node.rightNode === null) {
        this.rightNode = new Node(value, null, null);
      }
      this.#insertRec(value, node.rightNode);
    }
  }

  deleteItem(value) {
    if (!this.includes(value)) {
      return;
    }
    // PSEUDOCODE
    // Deleting a node in a BST means removing the target node while ensuring that the tree remains a valid BST. Depending on the structure of the node to be deleted, there are three possible scenarios:
    // Case 1: Node has No Children (Leaf Node)
    // If the target node is a leaf node, it can be directly removed from the tree since it has no child to maintain.
    // Case 2: Node has One Child(Left or Right Child)
    // If the target node has only one child, we remove the node and connect its parent directly to its only child. This way, the tree remains valid after deletion of target node.
    // Case 3: Node has Two Children
    // If the target node has two children, deletion is slightly more complex.
    // To maintain the BST property, we need to find a replacement node for the target. The replacement can be either:
    // The inorder successor — the smallest value in the right subtree, which is the next greater value than the target node.
    // The inorder predecessor — the largest value in the left subtree, which is the next smaller value than the target node.
    // Once the replacement node is chosen, we replace the target node’s value with that node’s value, and then delete the replacement node, which will now fall under Case 1 (no children) or Case 2 (one child).

    this.#deleteRec(value, this.root);
  }

  #deleteRec(value, node) {
    let leftChild = node.leftNode;
    let rightChild = node.rightNode;

    if (leftChild !== null) {
      if (leftChild.data === value) {
        if (!leftChild.leftNode && !leftChild.rightNode) {
          node.leftNode = null;
          return true;
        }
      } else {
        return this.#deleteRec(value, leftChild);
      }
    }

    if (rightChild !== null) {
      if (rightChild.data === value) {
        if (!rightChild.leftNode && !rightChild.rightNode) {
          node.rightNode = null;
          return true;
        }
      } else {
        return this.#deleteRec(value, rightChild);
      }
    }
  }
}
