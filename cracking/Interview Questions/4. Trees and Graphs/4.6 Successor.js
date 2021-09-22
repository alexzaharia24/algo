// Successor: Write an algorithm to find the "next" node (i .e., in-order successor) of a given node in a
// binary search tree. You may assume that each node has a link to its parent.
// Hints: #79, #91

class Node {
    constructor(value, left, right, parent) {
        this.value = value ?? null;
        this.left = left ?? null;
        this.right = right ?? null;
        this.parent = parent ?? null;
    }
}

// In-order successor
//  1. if it has right subtree then return the leftomost(root.right)
//  2. if not then return parent (root.parent)
function successor(node) {
    if (node == null) return null;
    if (node.right != null) {
        return leftmost(node.right);
    } else {
        if (node.parent !== null) {
            if (node.parent.left === node) {
                // If the node is the left child of the parent
                return node.parent;
            } else {
                // If the node is the right child of the parent you need to return the first ancestor that has a right node different than the current one
                while (node.parent !== null && node.parent.left !== node) {
                    node = node.parent;
                }

                return node.parent;
            }
        }

        // In case of node = root and no right sub tree
        return null;
    }
}

function leftmost(node) {
    if (node == null) return node;
    return leftmost(node.left) ?? node;
}

let n0 = new Node(0);
let n1 = new Node(1);
let n2 = new Node(2);
let n3 = new Node(3);
let n4 = new Node(4);
let n5 = new Node(5);
let n6 = new Node(6);
let n7 = new Node(7);

n5.left = n3; n3.parent = n5;
n5.right = n6; n6.parent = n5;
n3.left = n1; n1.parent = n3;
n3.right = n4; n4.parent = n3;
n6.right = n7; n7.parent = n6;

// console.log(successor(n5)); // n6
// console.log(successor(n4)); // n5
console.log(successor(n7)); // null