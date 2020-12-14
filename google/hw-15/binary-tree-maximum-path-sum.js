// https://leetcode.com/problems/binary-tree-maximum-path-sum/

let globalMax;
function maxPathSum(root) {
    globalMax = -Infinity;
    recursion(root);
    return globalMax;
}

function recursion(node) {
    // Time: O(nr of nodes)
    // Space: O(height of tree) for recursion stack
    // recursion(i) = max path sum for branch starting from 'node'
    if (node === null) return 0;
    let left = recursion(node.left);
    let right = recursion(node.right);

    let maxBranch = Math.max(node.val + left, node.val + right, node.val);
    let subTreeSum = node.val + left + right;
    globalMax = Math.max(maxBranch, globalMax, subTreeSum);
    return maxBranch;
}

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

let n5 = new TreeNode(5);
let n4_1 = new TreeNode(4);
let n4_2 = new TreeNode(4);
let n8 = new TreeNode(8);
let n13 = new TreeNode(13);
let n1 = new TreeNode(1);
let n11 = new TreeNode(11);
let n7 = new TreeNode(7);
let n2 = new TreeNode(2);

n5.left = n4_1;
n5.right = n8;
n4_1.left = n11;
n11.left = n7;
n11.right = n2;
n8.left = n13;
n8.right = n4_2;
n4_2.right = n1;

console.log(maxPathSum(n5));