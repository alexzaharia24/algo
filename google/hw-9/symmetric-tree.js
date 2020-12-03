// https://leetcode.com/problems/symmetric-tree/

class TreeNode {
    constructor(val, left, right) {
        this.val = val ?? null;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

function isSymmetric(root) {
    return isSymmetricBfs(root);
    // return isSymmetricDfs(root);
}

function isSymmetricDfs(root) {
    // Time: O(n) n - nr of nodes
    // Space: O(n) stack size
    if (root === null) return true;
    return goDeep(root.left, root.right);
}

function goDeep(left, right) {
    if (left === null) return right === null;
    else if (right === null) return left === null;

    return left.val === right.val && goDeep(left.left, right.right) && goDeep(left.right, right.left);
}

function isSymmetricBfs(root) {
    if (root === null) return true;
    let queue = [];
    let idxQueue = 0;
    queue.push(root.left);
    queue.push(root.right);
    while (idxQueue < queue.length) {
        let left = queue[idxQueue++];
        let right = queue[idxQueue++];
        
        if(left === null && right === null) continue;
        else if(left === null || right === null) return false;

        if(left.val != right.val) return false;

        queue.push(left.left);
        queue.push(right.right);
        queue.push(left.right);
        queue.push(right.left);
    }

    return true;
}

let n1 = new TreeNode(1)
let n2_1 = new TreeNode(2)
let n2_2 = new TreeNode(2)
let n3_1 = new TreeNode(3)
let n3_2 = new TreeNode(3)
let n4_1 = new TreeNode(4)
let n4_2 = new TreeNode(4)
let n5 = new TreeNode(5)

n1.left = n2_1;
n1.right = n2_2;
n2_1.left = n3_1;
n2_1.right = n4_1;
n2_2.left = n4_2;
n2_2.right = n3_2;

console.log(isSymmetric(n1));