class Node {
    constructor(value) {
        this.value = value ?? null;
        this.children = [];
    }

    toString() {
        return this.value;
    }
}

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

//// Binary Tree
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

//// Binary Search Tree
// We suppose we have duplicates
class BinarySearchTree {
    constructor(root) {
        this.root = root ?? null;
    }

    insert(node) {
        if (this.root === null) {
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
        if (currentNode === null) {
            return node;
        }

        if (node.value <= currentNode.value) {
            currentNode.left = this.insertRecursive2(node, currentNode.left)
        } else {
            currentNode.right = this.insertRecursive2(node, currentNode.right)
        }

        return currentNode;
    }

    /**
     * Find out if the node (comparision with the node not the value) exists in the tree
     * O(logN) time
     * @param {BinaryTreeNode} node The node to be found
     * @returns true if the node exists in the tree, false otherwise
     */
    exists(node) {
        return this.existsRecursive(this.root, node);
    }

    /**
     * Find out if the node (comparision with the node not the value) exists in the tree
     * @param {BinaryTreeNode} currentNode The current node in the recursion
     * @param {BinaryTreeNode} node The node to be found
     * @returns true if the node exists in the tree, false otherwise
     */
    existsRecursive(currentNode, node) {
        if (currentNode === null) return false;
        if (currentNode === node) return true;

        if (node.value <= currentNode.value) {
            return this.existsRecursive(currentNode.left, node);
        }
        return this.existsRecursive(currentNode.right, node);
    }

    /**
     * Find the first node that has the specified value
     * O(logN) time
     * @param {number} value 
     * @returns The first BinaryTreeNode that has the same value or null if there is none in the tree 
     */
    find(value) {
        return this.findRecursive(this.root, value);
    }

    /**
     * Find the first node that has the specified value
     * @param {BinaryTreeNode} currentNode The current node in the recursion 
     * @param {number} value 
     * @returns The first BinaryTreeNode that has the same value or null if there is none in the tree 
    */
    findRecursive(currentNode, value) {
        if (currentNode === null) return null;
        if (currentNode.value === value) return currentNode;

        if (value < currentNode.value) {
            return this.findRecursive(currentNode.left, value);
        }
        return this.findRecursive(currentNode.right, value);
    }

    /**
     * Removes the node (compare the object references) from the tree
     * @param {BinaryTreeNode} node 
     */
    remove(node) {
        return this.removeRecursive(this.root, node);
    }

    removeRecursive(currentNode, node) {
        if (currentNode === null) return null;

        let returnedNode = currentNode;
        if (node.value < currentNode.value) {
            currentNode.left = this.removeRecursive(currentNode.left, node);
        } else if (node.value > currentNode.value) {
            currentNode.right = this.removeRecursive(currentNode.right, node);
        } else {
            // currentNode.value === node.value => Found it
            // Case 1: No children
            if(currentNode.left === null && currentNode.right === null) {
                returnedNode = null;
            }
            // Case 2: 1 child
            else if(currentNode.left === null) {
                let right = currentNode.right;
                currentNode.right = null;
                returnedNode = right;
            } else if(currentNode.right === null) {
                let left = currentNode.left;
                currentNode.left = null;
                returnedNode = left;
            } 
            // Case 3: 2 children
            else {
                let minLeft = this.findMin(currentNode.left); // Min node from left subtree
                this.removeRecursive(currentNode, minLeft); // Remove it
                minLeft.left = currentNode.left;
                minLeft.right = currentNode.right;
                returnedNode = minLeft;
            }
        }

        return returnedNode;
    }

    /**
     * Find the min value node from the binary tree starting at root
     * @param {BinaryTreeNode} root The root of the binary tree
     * @returns The min valued node or null if no node exists
     */
    findMin(root) {
        return this.findMinRecursive(root, root);
    }

    /**
     * Find the min value node from the binary tree starting at root
     * @param {BinaryTreeNode} root The root of the binary tree
     * @param {} min Min so far
     * @returns The min valued node or null if no node exists
     */
    findMinRecursive(root, minNode) {
        if(root === null) return minNode;
        if(root.value < minNode.value) {
            minNode = root;
        }
        
        let leftMin = this.findMinRecursive(root.left, minNode);
        let rightMin = this.findMinRecursive(root.right, minNode);

        if(leftMin === null) return rightMin;
        if(rightMin === null) return leftMin;

        return leftMin.value < rightMin.value ? leftMin : rightMin;
    }

    printPreorder() {
        this.preorder(this.root);
    }


    preorder(node) {
        if (node === null) return;
        console.log(node.toString());
        this.preorder(node.left);
        this.preorder(node.right);
    }

    printInorder() {
        this.inorder(this.root);
    }

    inorder(node) {
        if (node === null) return;
        this.inorder(node.left);
        console.log(node.toString());
        this.inorder(node.right);
    }
}

// let root = new Node(1);
// let n2 = new Node(2);
// let n3 = new Node(3);
// let n4 = new Node(4);
// let n5 = new Node(5);
// let n6 = new Node(6);
// let n7 = new Node(7);
// let n8 = new Node(8);
// let n9 = new Node(9);
// let n10 = new Node(10);

// root.children = [n2, n3, n4];
// n2.children = [n5, n6];
// n3.children = [n7];
// n4.children = [n9];
// n7.children = [n8];
// n9.children = [n10];

// let rootBst = new BinaryTreeNode(8);
// let n1Bst = new BinaryTreeNode(4);
// let n2Bst = new BinaryTreeNode(10);
// let n3Bst = new BinaryTreeNode(2);
// let n4Bst = new BinaryTreeNode(6);
// let n5Bst = new BinaryTreeNode(20);

// rootBst.left = n1Bst;
// rootBst.right = n2Bst;
// n1Bst.left = n3Bst;
// n1Bst.right = n4Bst;
// n2Bst.right = n5Bst;

// let bst = new BinarySearchTree(rootBst);
// bst.printInorder();
// bst.insert(new BinaryTreeNode(1));
// bst.insert(new BinaryTreeNode(7));
// bst.printInorder();


// // BST exists test
// console.assert(bst.exists(n5Bst), n5Bst, bst);

// // BST find test
// console.assert(bst.find(100) === null, bst);

// let nodeFind1 = new BinaryTreeNode(100);
// bst.insert(nodeFind1);
// console.assert(bst.find(100) === nodeFind1, nodeFind1, 1);

// let nodeFind2 = new BinaryTreeNode(100);
// bst.insert(nodeFind2);
// console.assert(bst.find(100) === nodeFind1, nodeFind2, 2);

// console.log(bst.findMin(rootBst));

// // BST remove test
// console.assert(bst.remove(rootBst) === n3Bst, "Remove n3Bst");
// console.assert(bst.remove(n1Bst).left === n3Bst, "Remove n1Bst");
// console.log(bst);
// bst.printInorder();
