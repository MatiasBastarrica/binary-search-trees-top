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

  delete(value) {
    // PSEUDOCODE
  }
}
