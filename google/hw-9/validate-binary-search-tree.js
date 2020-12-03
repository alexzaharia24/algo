// https://leetcode.com/problems/validate-binary-search-tree/

class TreeNode {
    constructor(val, left, right) {
        this.val = val ?? null;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

function isValidBST(root) {
    let [isValid, min, max] = dfs(root);
    return isValid;
}

// returns [isValid, min, max]
function dfs(node) {
    // Time: O(n) n - nr of nodes
    // Space: O(n) recursion stack
    if (node === null) return [true, Infinity, -Infinity];

    let [isValidLeft, minLeft, maxLeft] = dfs(node.left);
    let [isValidRight, minRight, maxRight] = dfs(node.right);

    let isValid = (
        isValidLeft && isValidRight &&
        node.val > maxLeft && node.val < minRight
    );
    let min = Math.min(node.val, minLeft, minRight);
    let max = Math.max(node.val, maxLeft, maxRight);

    return [isValid, min, max];
}

let n1 = new TreeNode(1)
let n2 = new TreeNode(2)
let n3 = new TreeNode(3)
n1.left = n2;
n1.right = n3;

let n1_1 = new TreeNode(10);
let n2_1 = new TreeNode(5);
let n3_1 = new TreeNode(15);
let n4_1 = new TreeNode(6);
let n5_1 = new TreeNode(20);
n1_1.left = n2_1;
n1_1.right = n3_1;
n3_1.left = n4_1;
n3_1.right = n5_1;




console.log(isValidBST(n1_1));