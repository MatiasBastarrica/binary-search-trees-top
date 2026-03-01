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

    root.left = this.#sortedArrayToBSTRecur(arr, start, mid - 1);
    root.right = this.#sortedArrayToBSTRecur(arr, mid + 1, end);

    return root;
  }
}
