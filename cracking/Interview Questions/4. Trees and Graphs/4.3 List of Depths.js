// List of Depths: Given a binary tree, design an algorithm which creates a linked list of all the nodes
// at each depth (e.g., if you have a tree with depth 0, you'll have 0 linked lists).
// Hints: #107, #123, #735

const { Queue } = require('../../../utils/data-structures/Queue');
const { LinkedList } = require('../../../utils/data-structures/LinkedList');
const { BinaryTreeNode } = require('../../../utils/data-structures/Tree');

function listOfDepths(root) {
    if (root == null) return [];
    let result = [];
    let q = new Queue();
    // console.log(q);
    q.add(root);

    while (!q.isEmpty()) {
        let linkedList = new LinkedList();
        let nodesPerLevel = q.size;
        for (let i = 0; i < nodesPerLevel; i++) {
            let node = q.remove();
            if (node.left != null) {
                q.add(node.left);
            }
            if (node.right != null) {
                q.add(node.right);
            }
            linkedList.add(node);
        }
        result.push(linkedList);
    }
    return result;
}

// Alternative solution: Modified Preorder DFS
// p:243

let n0 = new BinaryTreeNode(0);
let n1 = new BinaryTreeNode(1);
let n2 = new BinaryTreeNode(2);
let n3 = new BinaryTreeNode(3);
let n4 = new BinaryTreeNode(4);
let n5 = new BinaryTreeNode(5);
let n6 = new BinaryTreeNode(6);

n0.left = n1;
n0.right = n2;
n1.right = n3;
n2.left = n4;
n2.right = n5;
n3.left = n6;

listOfDepths(n0).fogrEach(ll => console.log(ll.toString()))