// - default: node == null return 0
// - else: 1 + Math.max(dfs(node.left), dfs(node.right))

// 3 => 1 + 2 = 3
//  9 => 1 + Math.max(0,0) = 1
//   null => 0
//   null => 0
//  20 => 1 + 1 = 2
//   15 => 1
//    null => 0
//    null => 0
//   7 => 1
//    null => 0
//    null => 0

var maxDepth = function(root) {
    // recursivelt get the max depth of root.left and root.right recursively
    // Time: O(N), Space: O(MAX_DEPTH) = O(N) worst case, O(logN) average case
    if(root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};