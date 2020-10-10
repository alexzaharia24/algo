// https://leetcode.com/problems/insert-into-a-binary-search-tree/
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}


function insertIntoBST(root, val) {
    let newNode = new TreeNode(val);
    if (root === null) return newNode;
    
    // Find insertion point
    let insertionPoint = dfs(root, val, null);
    let result = root;
    
    // Insert the node
    if(val > insertionPoint.val) {
        insertionPoint.right = newNode;
        // newNode.left = insertionPoint;

        // if(insertionPoint.right !== null && val < insertionPoint.right) {
        //     newNode.right = insertionPoint.right;
        //     insertionPoint.right = null;
        // }
        
    } else {
        insertionPoint.left = newNode;
    }

    return result;
}

function dfs(node, val, candidate) {
    if (node === null) return candidate;

    if (val < node.val) {
        return dfs(node.left, val, node);
    }
    return dfs(node.right, val, node);
}