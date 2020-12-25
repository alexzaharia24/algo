// https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

function bstFromPreorder(preorder) {
    return bstRecursiveWithValueSeparation(preorder);
}

function bstRecursiveWithValueSeparationGoDeep(start, end, preorder) {
    // Time: O(N^2)
    // Space: O(N)
    if (start > end) return null;
    let node = new TreeNode(preorder[start]);
    if (start === end) return node;


    let idxOfFirstBigger = getIdxOfFirstBigger(node.val, start + 1, end, preorder);
    node.left = bstRecursiveWithValueSeparationGoDeep(start + 1, idxOfFirstBigger === -Infinity ? end : idxOfFirstBigger-1, preorder);
    node.right = bstRecursiveWithValueSeparationGoDeep(idxOfFirstBigger === -Infinity ? end + 1 : idxOfFirstBigger, end, preorder);

    return node;
}

function getIdxOfFirstBigger(value, start, end, array) {
    let i;
    for (i = start; i <= end && array[i] < value; i++);
    if (i > end) return -Infinity;
    return i;
}

function bstFromPreorderIterative(preorder) {
    let stack = [];
    let root = new TreeNode(preorder[0]);
    let low = [1, root.val - 1];
    let high = [root.val + 1, Infinity];

    stack.push({ node: root, low: low, high: high });

    for (let i = 1; i < preorder.length; i++) {
        let node = new TreeNode(preorder[i]);
        while (stack.length > 0) {
            let parent = stack[stack.length - 1];
            if (node.val >= parent.low[0] && node.val <= parent.low[1]) {
                // left
                parent.node.left = node;
                stack.push({ node: node, low: [parent.low[0], node.val - 1], high: [node.val + 1, parent.low[1]] });
                break;
            } else if (node.val >= parent.high[0] && node.val <= parent.high[1]) {
                // right
                parent.node.right = node;
                stack.push({ node: node, low: [parent.high[0], node.val - 1], high: [node.val + 1, parent.high[1]] });
                break;
            } else {
                stack.pop();
            }
        }
    }

    return root;
}

function bstRecursiveWithValueSeparation(preorder) {
    return bstRecursiveWithValueSeparationGoDeep(0, preorder.length - 1, preorder)
}

function bstFromPreorderRecursive(preorder) {
    let root = new TreeNode(preorder[0]);
    let low = [1, root.val - 1];
    let high = [root.val + 1, Infinity];

    bstFromPreorderRecursiveGoDeep(root, low, high, preorder);

    return root;
}

function bstFromPreorderRecursiveGoDeep(node, low, high, preorder) {

}

let idx = 1;
// let next = null;

function bstFromPreorderRecursiveWithSolve(preorder) {
    let root = new TreeNode(preorder[0]);
    solve(root, null, preorder)
    return root;
}

function solve(node, parent, preorder) {
    if (idx === preorder.length) return;
    let next = new TreeNode(preorder[idx]);
    console.log("LEFT");
    console.log("node:", node)
    console.log("parent:", parent)
    console.log("idx:", idx)
    console.log("next:", next)
    console.log("------------")

    if (next.val < node.val) {
        if (node.left !== null) {
            solve(node.left, node, preorder);
        } else {
            node.left = next;
            idx++
            solve(node.left, node, preorder);
        }
    }

    next = new TreeNode(preorder[idx]);
    console.log("RIGHT");
    console.log("node:", node)
    console.log("parent:", parent)
    console.log("idx:", idx)
    console.log("next:", next)
    console.log("------------")
    if (next.val > node.val) {
        if (parent === null || node.val > parent.val || next.val < parent.val) {
            if (node.right !== null) {
                solve(node.right, node, preorder);
            } else {
                node.right = next;
                idx++;
                solve(node.right, node, preorder);
            }
        }
    }
}

console.log(bstFromPreorder([8,5,1,7,10,12]));