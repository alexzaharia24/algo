// Check Balanced: Implement a function to check if a binary tree is balanced. For the purposes of
// this question, a balanced tree is defined to be a tree such that the heights of the two subtrees of any
// node never differ by more than one.
// Hints: #2 7, #33, #49, # 705, #724

const { BinaryTreeNode } = require('../../../utils/data-structures/Tree');

function checkBalanced(root) {
    if(root == null) return true;
    return Math.abs(height(root.left) - height(root.right)) <= 1;
}

function height(root) {
    if(root == null) return 0;
    return Math.max(height(root.left), height(root.right)) + 1;
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

console.log(checkBalanced(n0));