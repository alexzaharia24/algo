// Validate BST: Implement a function to check if a binary tree is a binary search tree.
// Hints: #35, #57, #86, # 773, # 728

const { BinaryTreeNode } = require('../../../utils/data-structures/Tree');

function validateBST(root) {
    return validate(root, new Map(), new Map());
}

function validate(root, memMax, memMin) {
    if (root == null) return true;
    let left = validate(root.left, memMax, memMin);
    let right = validate(root.right, memMax, memMin);
    return left && right && (maxValue(root.left, memMax) < root.value && root.value < minValue(root.right, memMin));
}

function maxValue(root, mem) {
    if(root == null) mem.set(root, -Infinity);
    if (mem.get(root) == null) {
        mem.set(root, Math.max(maxValue(root.left, mem), root.value, maxValue(root.right, mem)));
    }

    return mem.get(root);
}

function minValue(root, mem) {
    if(root == null) mem.set(root, Infinity);
    if (mem.get(root) == null) {
        mem.set(root, Math.min(minValue(root.left, mem), root.value, minValue(root.right, mem)));
    }

    return mem.get(root);
}

let n0 = new BinaryTreeNode(0);
let n1 = new BinaryTreeNode(1);
let n2 = new BinaryTreeNode(2);
let n3 = new BinaryTreeNode(3);
let n4 = new BinaryTreeNode(4);
let n5 = new BinaryTreeNode(5);
let n6 = new BinaryTreeNode(6);

n0.left = n1;
n0.right = n2;
n1.right = n3;
n2.left = n4;
n3.left = n5;
n5.left = n6;

console.log(validateBST(n0)); // False

// let n0 = new BinaryTreeNode(10);
// let n1 = new BinaryTreeNode(6);
// let n2 = new BinaryTreeNode(15);
// let n3 = new BinaryTreeNode(9);
// let n4 = new BinaryTreeNode(11);
// let n5 = new BinaryTreeNode(8);
// let n6 = new BinaryTreeNode(7);

// n0.left = n1;
// n0.right = n2;
// n1.right = n3;
// n2.left = n4;
// n3.left = n5;
// n5.left = n6;

// console.log(validateBST(n0)); // True