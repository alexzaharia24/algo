// BST Sequences: A binary search tree was created by traversing through an array from left to right
// and inserting each element. Given a binary search tree with distinct elements, print all possible
// arrays that could have led to this tree.

class Node {
    constructor(val, left, right) {
        this.val = val ?? null;
        this.left = left ?? null;
        this.right = right ?? null;
    }

    toString() {
        return this.val;
    }
}

function bstSequences(root) {
    if (root === null) return null;
    let result = [];

    // do a level by level traversal
    let q = [], qIdx = 0;
    q.push(root);

    while (qIdx < q.length) {
        let levelNodes = [];
        let nrOfNodesOnLevel = q.length - qIdx;
        // get all nodes on the level
        for (let i = 0; i < nrOfNodesOnLevel; i++) {
            let node = q[qIdx++];
            levelNodes.push(node);
            // add children to queue
            if (node.left != null) q.push(node.left);
            if (node.right != null) q.push(node.right);
        }

        // get all permutations
        let permutations = getPermutations(levelNodes);
        console.log("permutations: ", permutations);


        if (result.length === 0) {
            result.push(...permutations);
        } else {
            let newResult = [];
            for (let variation of result) {
                for (let perm of permutations) {
                    newResult.push([...variation, ...perm]);
                }
            }
            result = newResult;
            // console.log("result: ", result);
        }

        // console.log("result: ", result);
    }
    console.log("result: ", result);
}

function getPermutations(nodes) {
    // nodes is Node[]
    if (nodes == null || nodes.length === 0) {
        return [];
    }
    let result = [];
    generatePermutations(nodes, [], result);
    return result;
}

function generatePermutations(nodes, permutation, result) {
    // console.log("N: ", nodes, "P: ", permutation, "R: ", result);
    if (nodes.length === 0) {
        result.push(permutation);
        return;
    }
    for (let i = 0; i < nodes.length; i++) {
        let newNodes = [...nodes];
        newNodes.splice(i, 1);
        generatePermutations(newNodes, [...permutation, nodes[i]], result);
    }
}

let n0 = new Node(10);
let n1 = new Node(3);
let n2 = new Node(16);
let n3 = new Node(2);
let n4 = new Node(4);
let n5 = new Node(13);
let n6 = new Node(1);
let n7 = new Node(5);

n0.left = n1; n0.right = n2;
n1.left = n3; n1.right = n4;
n2.left = n5;
// n3.left = n6;
// n4.right = n7;

bstSequences(n0);
// console.log(getPermutations([n0,n1,n2]))