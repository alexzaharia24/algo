// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/

const { last } = require("lodash");


class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }

    toString() {
        return this.val;
    }
}

function lowestCommonAncestor(root, p, q) {
    return lowestCommonAncestorNPatrat(root, p, q);
}

function lowestCommonAncestorNPatrat(root, p, q) {
    let pathToP = [], pathToQ = [];
    getPathToNode(root, pathToP, p); // O(N)
    getPathToNode(root, pathToQ, q); // O(N)

    console.log("####")
    console.log(`${pathToP}`);
    console.log(`${pathToQ}`);
    console.log("---")

    // O(N)
    let idx = 0, lastAncestor = 0;
    while (idx < pathToP.length && idx < pathToQ.length && pathToP[idx].val === pathToQ[idx].val) {
        lastAncestor = idx;
        idx++;
    }

    return pathToP[lastAncestor];
}

function getPathToNode(node, path, searchedNode) {
    if (node === null) return false;

    path.push(node);
    if (node.val === searchedNode.val) {
        return true;
    }

    let findLeft = getPathToNode(node.left, path, searchedNode);
    if (findLeft) return true;

    let findRight = getPathToNode(node.right, path, searchedNode);
    if (findRight) return true;

    path.pop();
    return false;
}

let n0 = new TreeNode(0);
let n1 = new TreeNode(1);
let n2 = new TreeNode(2);
let n3 = new TreeNode(3);
let n4 = new TreeNode(4);
let n5 = new TreeNode(5);
let n6 = new TreeNode(6);
let n7 = new TreeNode(7);
let n8 = new TreeNode(8);

n3.left = n5;
n3.right = n1;
n5.left = n6;
n5.right = n2;
n1.left = n0;
n1.right = n8;
n2.left = n7;
n2.right = n4;

console.log(lowestCommonAncestor(n3, new TreeNode(5), new TreeNode(1)));
console.log(lowestCommonAncestor(n3, new TreeNode(5), new TreeNode(4)));