class Node {
    constructor(value) {
        this.value = value ?? null;
        this.children = [];
    }

    toString() {
        return this.value;
    }
}

let root = new Node(1);
let n2 = new Node(2);
let n3 = new Node(3);
let n4 = new Node(4);
let n5 = new Node(5);
let n6 = new Node(6);
let n7 = new Node(7);
let n8 = new Node(8);
let n9 = new Node(9);
let n10 = new Node(10);

root.children = [n2, n3, n4];
n2.children = [n5, n6];
n3.children = [n7];
n4.children = [n9];
n7.children = [n8];
n9.children = [n10];

function preorderGeneral(root) {
    if (root === null) return;
    console.log(root.toString());
    for (let child = 0; child < root.children.length; child++) {
        preorderGeneral(root.children[child]);
    }
}

// Root will be at order rootOrder in the child list order
function inOrderGeneral(root, rootOrder) {
    if (root === null) return;
    for (let child = 0; child < root.children.length; child++) {
        if (rootOrder === child) {
            console.log(root.toString());
        }
        inOrderGeneral(root.children[child], rootOrder);
    }
}


function bfsTreeGeneral(root) {
    if (root === null) return null;
    let queue = [], qIdx = 0, visited = new Map();
    queue.push(root);
    visited.set(root, true);

    while (qIdx < queue.length) {
        let node = queue[qIdx++];
        console.log(node.toString());
        for (let child of node.children) {
            if (!visited.get(child)) {
                queue.push(child);
                visited.set(child, true);
            }
        }
    }
}

// preorderGeneral(root);
// bfsTreeGeneral(root);


//// Binary tree
class BinaryTreeNode {
    constructor(value, left, right) {
        this.value = value ?? null;
        this.left = left ?? null;
        this.right = right ?? null;
    }

    toString() {
        return this.value;
    }
}

// We suppose we have duplicates
class BinarySearchTree {
    constructor(root) {
        this.root = root ?? null;
    }

    insert(node) {
        if(this.root === null) {
            this.root = node;
            return;
        }
        this.insertRecursive(node, this.root);
    }


    // Version 1
    insertRecursive(node, parent) {
        if (node.value <= parent.value) {
            if (parent.left === null) {
                parent.left = node;
            } else {
                this.insertRecursive(node, parent.left)
            }
        } else {
            if (parent.right === null) {
                parent.right = node;
            } else {
                this.insertRecursive(node, parent.right)
            }
        }
    }

    // Version 2
    insertRecursive2(node, currentNode) {
        if(currentNode === null) {
            return node;
        }

        if (node.value <= currentNode.value) {
            currentNode.left = this.insertRecursive2(node, currentNode.left)
        } else {
            currentNode.right = this.insertRecursive2(node, currentNode.right)
        }

        return currentNode;
    }

    exists(node) {

    }
    
    find(value) { }
    remove(node) { }

    printPreorder() {
        this.preorder(this.root);
    }

    printInorder() {
        this.inorder(this.root);
    }

    preorder(node) {
        if (node === null) return;
        console.log(node.toString());
        this.preorder(node.left);
        this.preorder(node.right);
    }

    inorder(node) {
        if (node === null) return;
        this.inorder(node.left);
        console.log(node.toString());
        this.inorder(node.right);
    }
}

let rootBst = new BinaryTreeNode(8);
let n1Bst = new BinaryTreeNode(4);
let n2Bst = new BinaryTreeNode(10);
let n3Bst = new BinaryTreeNode(2);
let n4Bst = new BinaryTreeNode(6);
let n5Bst = new BinaryTreeNode(20);

rootBst.left = n1Bst;
rootBst.right = n2Bst;
n1Bst.left = n3Bst;
n1Bst.right = n4Bst;
n2Bst.right = n5Bst;

let bst = new BinarySearchTree(rootBst);
// bst.printInorder();
bst.insert(new BinaryTreeNode(9));
bst.insert(new BinaryTreeNode(7));
bst.printInorder();