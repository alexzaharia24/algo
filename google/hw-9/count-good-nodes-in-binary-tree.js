// https://leetcode.com/problems/count-good-nodes-in-binary-tree/

function goodNodes(root) {
    // Time: O(n) - go through all nodes
    // Space: O(n) recursion stack
    return dfs(node, -Infinity);
}

function dfs(node, maxSoFar) {
    // Time: O(n) - go through all nodes
    // Space: O(n) recursion stack
    if (node === null) return 0;
    let max = Math.max(node.val, maxSoFar);
    let left = dfs(node.left, max);
    let right = dfs(node.right, max);
    if (node.val >= maxSoFar) {
        return 1 + left + right;
    }
    return left + right;
}