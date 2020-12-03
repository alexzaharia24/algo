// https://leetcode.com/problems/flatten-binary-tree-to-linked-list/
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

function flatten(root) {
    return flattenWithNewTree(root);
}

function flattenWithNewTree(root) {
    // Time: O(n)
    // Space: O(n) recursion stack + new tree
    if (root === null) return null;
    let flattened = new TreeNode();
    dfsWithNewTree(root, flattened);
    root.right = flattened.right.right;
    root.left = null;
}

function dfsWithNewTree(node, flattened) {
    // Time: O(n)
    // Space: O(n) recursion stack + new tree
    if (node === null) return null;
    flattened.right = new TreeNode(node.val);
    let currentNode = flattened.right;
    let leftNode = dfsWithNewTree(node.left, currentNode) ?? currentNode;
    let rightNode = dfsWithNewTree(node.right, leftNode) ?? leftNode;

    return rightNode;
}

function flattenSameTree(root) {
    // Time: O(n)
    // Space: O(n) recursion stack
    dfsSameTree(root);
}

function dfsSameTree(node) {
    // Time: O(n)
    // Space: O(n) recursion stack
    if(node === null) return null;
    let left = node.left, right = node.right;
    
    let leftSubtreeEnd = dfsSameTree(left) ?? node;
    if(leftSubtreeEnd !== null) {
        let rightSubTree = right;
        node.right = left;
        node.left = null;
        leftSubtreeEnd.right = rightSubTree;
    }
    
    let rightSubtreeEnd = dfsSameTree(right) ?? leftSubtreeEnd;
    return rightSubtreeEnd;
}


let n1 = new TreeNode(1);
let n2 = new TreeNode(2);
let n3 = new TreeNode(3);
let n4 = new TreeNode(4);
let n5 = new TreeNode(5);
let n6 = new TreeNode(6);

// n1.left = n2;
// n2.left = n3;
// n2.right = n4;
// n1.right = n5;
// n5.right = n6;

n1.left = n2;
n2.left = n3;
n2.right = n4;
n3.left = n5;

flatten(n1);
let flattened = n1;
console.log("--------");
while (flattened !== null) {
    console.log(flattened.val);
    flattened = flattened.right;
}


