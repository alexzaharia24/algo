// https://leetcode.com/problems/diameter-of-binary-tree/

class TreeNode {
    constructor(val, left, right) {
        this.val = val ?? null;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

function diameterOfBinaryTree(root) {
    return diameterOfBinaryTreeDfsWithResultObject(root);
}

function diameterOfBinaryTreeDfs(root) {
    // Time: O(n)
    // Space: O(n) recursion stack
    if (root === null) return 0;
    let [maxBranch, maxThroughParent] = dfs(root);
    return maxThroughParent;
}

function dfs(root) {
    // Time: O(n)
    // Space: O(n) recursion stack
    if (root === null) return [-1, -1];

    let [leftMaxBranch, leftMaxThroughParent] = dfs(root.left);
    leftMaxBranch += 1;
    let [rightMaxBranch, rightMaxThroughParent] = dfs(root.right);
    rightMaxBranch += 1;

    let maxBranch = Math.max(leftMaxBranch, rightMaxBranch);
    let maxThroughParent = Math.max(leftMaxThroughParent, rightMaxThroughParent, leftMaxBranch + rightMaxBranch);

    return [maxBranch, maxThroughParent];
}

function diameterOfBinaryTreeDfsWithResultObject(root) {
    // Time: O(n)
    // Space: O(n) recursion stack
    if (root === null) return 0;
    let result = { diameter: 0 }
    dfsWithResultObject(root, result);
    return result.diameter - 1;
}

function dfsWithResultObject(root, result) {
    // Time: O(n)
    // Space: O(n) recursion stack
    if (root === null) return 0;

    let leftMaxBranch = dfsWithResultObject(root.left, result);
    let rightMaxBranch = dfsWithResultObject(root.right, result);

    let maxBranch = Math.max(1 + leftMaxBranch, 1 + rightMaxBranch);
    let maxThroughParent = Math.max(result.diameter, leftMaxBranch + rightMaxBranch + 1);
    result.diameter = maxThroughParent;

    return maxBranch;
}

let n1 = new TreeNode(1);
let n2 = new TreeNode(2);
let n3 = new TreeNode(3);
let n4 = new TreeNode(4);
let n5 = new TreeNode(5);

n1.left = n2;
n1.right = n3;
n2.left = n4;
n2.right = n5;

console.log(diameterOfBinaryTree(n1));