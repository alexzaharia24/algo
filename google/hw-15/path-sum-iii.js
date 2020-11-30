// https://leetcode.com/problems/path-sum-iii/


function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

function pathSum(root, sum) {
    let hash = new Map();
    return recursion(root, sum, 0, hash);
}

function recursion(node, sum, currentSum, hash) {
    if (node === null) return 0;
    let shouldStore = false;
    let entrySum = currentSum;

    // if(currentSum === 0) {
    //     if (hash.get(node) !== undefined) return hash.get(node);
    //     shouldStore = true;
    // }
    if(hash.get({node: node, entrySum: entrySum}) !== undefined) return hash.get({node:node, entrySum: entrySum})
    currentSum += node.val;

    let nrSums = 0;

    // console.log({node: node.val, entrySum: entrySum});
    if (currentSum === sum) {
        nrSums++;
    }

    nrSums += recursion(node.left, sum, currentSum, hash);
    nrSums += recursion(node.left, sum, 0, hash);
    nrSums += recursion(node.right, sum, currentSum, hash);
    nrSums += recursion(node.right, sum, 0, hash);

    hash.set({node: node, entrySum: entrySum} , nrSums);
    console.log(nrSums)
    return nrSums;
}

// let n1 = new TreeNode(10);
// let n2 = new TreeNode(5);
// let n3 = new TreeNode(-3);
// let n4 = new TreeNode(3);
// let n5 = new TreeNode(2);
// let n6 = new TreeNode(11);
// let n7 = new TreeNode(3);
// let n8 = new TreeNode(-2);
// let n9 = new TreeNode(1);

// n1.left = n2;
// n1.right = n3;
// n2.left = n4;
// n2.right = n5;
// n3.right = n6;
// n4.left = n7;
// n4.right = n8;
// n5.right = n9;

let n1 = new TreeNode(1);
let n2 = new TreeNode(1);
let n3 = new TreeNode(3);
let n4 = new TreeNode(4);
let n5 = new TreeNode(5);

n1.right = n2;
n2.right = n3;
n3.right = n4;
n4.right = n5;

// console.log(pathSum(n1, 3));
let n9 = new TreeNode(1);
let n10 = new TreeNode(1);
let map = new Map();
map.set(n10, 1);
map.set(n9, 2);
console.log(map)