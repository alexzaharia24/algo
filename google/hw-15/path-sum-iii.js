// https://leetcode.com/problems/path-sum-iii/


function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

let nrSums = 0, id;

function pathSum(root, sum) {
    console.log(root);
    return pathSumWithGlobals(root, sum);
}

function pathSumSimple(root, sum) {
    if (root === null) return 0;
    recursion(root, sum, root.val, 1);
    return nrSums;
}


function recursion(node, sum, currentSum, level) {
    if (node === null) return 0;
    let entrySum = currentSum;

    if (node.left !== null) {
        recursion(node.left, sum, currentSum + node.left.val, level + 1);
        recursion(node.left, sum, node.left.val, level + 1);
    }
    if (node.right !== null) {
        recursion(node.right, sum, currentSum + node.right.val, level + 1);
        recursion(node.right, sum, node.right.val, level + 1);

    }

    if (currentSum === sum) {
        console.log("level:", level, "node.val: Bl", node.val, "entrySum:", entrySum, "nrSums:", nrSums)
        nrSums++;
    }
}

function pathSumWithGlobals(root, sum) {
    let hash = new Map();
    nrSums = 0; id = 0;
    recursion(root, sum, 0, hash, 0);
    console.log(hash);
    return nrSums;
}

function recursionWithGlobals(node, sum, currentSum, hash, level) {
    if (node === null) return;
    let entrySum = currentSum;
    if (hash.get(JSON.stringify({ node: node, entrySum: entrySum })) !== undefined)
        return;

    node.id = id++;

    currentSum += node.val;

    recursion(node.left, sum, currentSum, hash, level + 1);
    recursion(node.left, sum, 0, hash, level + 1);
    recursion(node.right, sum, currentSum, hash, level + 1);
    recursion(node.right, sum, 0, hash, level + 1);

    if (currentSum === sum) {
        nrSums++;
    }
    hash.set(JSON.stringify({ node: node, entrySum: entrySum }), currentSum === sum);

    // console.log("level:", level, "node.val:", node.val, "entrySum:", entrySum, "nrSums:", nrSums)
    if (node.val === 5 && entrySum === 3) console.log("entered");
}

let n1 = new TreeNode(10);
let n2 = new TreeNode(5);
let n3 = new TreeNode(-3);
let n4 = new TreeNode(3);
let n5 = new TreeNode(2);
let n6 = new TreeNode(11);
let n7 = new TreeNode(3);
let n8 = new TreeNode(-100);
let n9 = new TreeNode(1);

n1.left = n2;
n1.right = n3;
n2.left = n4;
n2.right = n5;
n3.right = n6;
n4.left = n7;
n4.right = n8;
n5.right = n9;

console.log(pathSum(n1, -100))

// let n1 = new TreeNode(0);
// let n2 = new TreeNode(1);
// let n3 = new TreeNode(1);
// n1.left = n2;
// n1.right = n3;
// console.log(pathSum(n1, 1))

// let n1 = new TreeNode(1);
// let n2 = new TreeNode(1);
// let n3 = new TreeNode(3);
// let n4 = new TreeNode(4);
// let n5 = new TreeNode(5);

// n1.right = n2;
// n2.right = n3;
// n3.right = n4;
// n4.right = n5;