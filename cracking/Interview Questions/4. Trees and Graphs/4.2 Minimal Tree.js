// Minimal Tree: Given a sorted (increasing order) array with unique integer elements, write an algorithm
// to create a binary search tree with minimal height.
// Hints: #19, #73, #176

class Node {
    constructor(value, left, right) {
        this.value = value ?? null;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

// Time: O(N), Extra Space: O(N)
function buildBST(A) {
    if (A.length === 0) return null;
    let mid = parseInt(A.length / 2);
    let root = new Node(A[mid]);
    root.left = buildBSTRecursive(A, 0, mid - 1);
    root.right = buildBSTRecursive(A, mid + 1, A.length - 1);
    return root;
}

function buildBSTRecursive(A, left, right) {
    console.log(left, right);
    if (left > right) return null;
    let mid = parseInt((left + right) / 2);
    let root = new Node(A[mid]);
    root.left = buildBSTRecursive(A, left, mid - 1);
    console.log("RIGHT");
    root.right = buildBSTRecursive(A, mid + 1, right);
    return root;
}

// let A = [1, 2, 3, 4, 5, 6];
// let A = [];
// let A = [1];
// let A = [1,2];
// let A = [1, 2, 3];
let bst = buildBST(A);
console.log(bst);
