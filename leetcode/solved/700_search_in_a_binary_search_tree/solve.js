class TreeNode {
    constructor(val, left, right) {
        this.val = val ?? 0;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

// Time: O(h)
// Space: O(h)
// h = logN average, N worst case
const recurse = (node, val) => {
    if(node === null) return null;

    if (val === node.val) {
        return node;
    }

    if(val < node.val) {
        return recurse(node.left, val);
    } 

    return recurse(node.right, val);
}

const searchBST = (root, val) => {
    return recurse(root, val);
};

const node1 = new TreeNode(1, null, null);
const node3 = new TreeNode(3, null, null);
const node2 = new TreeNode(2, node1, node3);
const node7 = new TreeNode(7, null, null);
const node4 = new TreeNode(4, node2, node7);

console.log(searchBST(node4, 4));