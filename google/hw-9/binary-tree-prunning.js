// https://leetcode.com/problems/binary-tree-pruning/

function pruneTree(root) {
    // Time: O(n)
    // Space: O(n) recursion stack
    dfs(root);
    if (root.left === null && root.right === null && root.val === 0) return null;
    return root;
}

function dfs(root) {
    // Time: O(n)
    // Space: O(n) recursion stack
    if(root === null) return false;
    
    let shouldRemoveLeft = dfs(root.left);
    let shouldRemoveRight = dfs(root.right);

    if(shouldRemoveLeft) root.left = null;
    if(shouldRemoveRight) root.right = null;

    return root.left === null && root.right === null && root.val === 0;
}