// https://leetcode.com/problems/invert-binary-tree/

function invertTree(root) {
    // Time: O(n) n - nr of nodes
    // Space: O(n) recursion stack
    if(root === null) return null;
    invertTree(root.left);
    invertTree(root.right);

    [root.left, root.right] = [root.right, root.left];
    return root;
}