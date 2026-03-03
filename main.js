import { Tree } from "./tree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(test.root);
// console.log(test);
// test.insert(8);
// test.insert(10);
test.deleteItem(3);
// prettyPrint(test.root);
test.deleteItem(1);
prettyPrint(test.root);
// console.log(test);
