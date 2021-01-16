// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

class TreeNode {
    constructor(val, left, right) {
        this.val = val;
        this.left = left || null;
        this.right = right || null;
    }
}

let preIdx;
function buildTree(preorder, inorder) {
    preIdx = 0;
    let hashIn = {};
    for (let idx = 0; idx < inorder.length; idx++) {
        hashIn[inorder[idx]] = idx;
    }
    return construct(hashIn, preorder, 0, inorder.length - 1);
}

function construct(hashIn, preorder, inStart, inEnd) {
    // Time: O(N)
    // Space: O(N)
    if (preIdx > preorder.length) return null;
    if (inStart > inEnd) return null;

    let node = new TreeNode(preorder[preIdx]);
    preIdx++;

    if (inStart === inEnd) {
        return node;
    }

    let idx = hashIn[node.val]; // O(1)
    if (idx === -1) return null;

    let leftIn = [inStart, idx - 1];
    let rightIn = [idx + 1, inEnd];

    node.left = construct(hashIn, preorder, leftIn[0], leftIn[1]);
    node.right = construct(hashIn, preorder, rightIn[0], rightIn[1]);

    return node;
}


// function construct(preIdx, preorder, inStart, inEnd, inorder) {
//     console.log("inStart:",inStart, "inEnd:",inEnd, "preIdx:",preIdx, "(" + preorder[preIdx] + ")");
//     if (inStart > inEnd) return null;
//     let root = new TreeNode(preorder[preIdx]);
//     if (inStart === inEnd) return new TreeNode(inorder[inStart]);
//     preIdx++;
//     let inIdx = inorder.indexOf(root.val);
//     if (inIdx === -1) return null;

//     root.left = construct(preIdx, preorder, inStart, inIdx, inorder);
//     preIdx++;
//     root.right = construct(preIdx, preorder, inIdx + 1, inEnd, inorder);

//     return root;
// }



function preOrder(root, order) {
    if (root === null) return;
    order.push(root.val);
    preOrder(root.left, order);
    preOrder(root.right, order);
}

function inOrder(root, order) {
    if (root === null) return;
    inOrder(root.left, order);
    order.push(root.val);
    inOrder(root.right, order);
}

let nodes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => new TreeNode(n));
nodes[1].left = nodes[2];
nodes[1].right = nodes[3];
nodes[2].left = nodes[4];
nodes[2].right = nodes[5];
nodes[5].left = nodes[8];
nodes[3].left = nodes[6];
nodes[3].right = nodes[7];
nodes[6].right = nodes[9];
nodes[9].right = nodes[10];

let preorder = [];
preOrder(nodes[1], preorder);
let inorder = [];
inOrder(nodes[1], inorder);

// console.log(preorder);
// console.log(inorder);

// console.log(buildTree(preorder, inorder));
console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));