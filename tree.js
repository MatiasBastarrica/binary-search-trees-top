import { Node } from "./node.js";
import { Queue } from "queue.js";

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
        } else if (
          (leftChild.leftNode && !leftChild.rightNode) ||
          (!leftChild.leftNode && leftChild.rightNode)
        ) {
          node.leftNode = leftChild.leftNode
            ? leftChild.leftNode
            : leftChild.rightNode;
          return true;
        } else if (leftChild.leftNode && leftChild.rightNode) {
          const replacement = this.#getInorderSuccesor(leftChild.rightNode);
          const replacementData = replacement.data;
          replacement.data = leftChild.data;
          leftChild.data = replacementData;
          if (this.#deleteRec(replacement.data, leftChild)) {
            return true;
          }
        }
      } else {
        if (this.#deleteRec(value, leftChild)) {
          return true;
        }
      }
    }

    if (rightChild !== null) {
      if (rightChild.data === value) {
        if (!rightChild.leftNode && !rightChild.rightNode) {
          node.rightNode = null;
          return true;
        } else if (
          (rightChild.leftNode && !rightChild.rightNode) ||
          (!rightChild.leftNode && rightChild.rightNode)
        ) {
          node.rightNode = rightChild.leftNode
            ? rightChild.leftNode
            : rightChild.rightNode;
          return true;
        } else if (rightChild.leftNode && rightChild.rightNode) {
          const replacement = this.#getInorderSuccesor(rightChild.rightNode);
          const replacementData = replacement.data;
          replacement.data = rightChild.data;
          rightChild.data = replacementData;
          if (this.#deleteRec(replacement.data, rightChild)) {
            return true;
          }
        }
      } else {
        if (this.#deleteRec(value, rightChild)) {
          return true;
        }
      }
    }
  }

  #getInorderSuccesor(node) {
    if (node.leftNode) {
      return this.#getInorderSuccesor(node);
    } else {
      return node;
    }
  }
}
