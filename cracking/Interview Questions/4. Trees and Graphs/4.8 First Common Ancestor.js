// First Common Ancestor: Design an algorithm and write code to find the first common ancestor
// of two nodes in a binary tree. Avoid storing additional nodes in a data structure. NOTE: This is not
// necessarily a binary search tree.

class Node {
    constructor(value, left, right) {
        this.value = value ?? null;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

// Check is node is descendant of ancestor
function isDescendantOf(node, ancestor) {
    return searchDfs(ancestor, node);
}

// return true if target is found in the subtree of root
function searchDfs(root, target) {
    if (root === target) return true;
    if (root === null) return false;
    return searchDfs(root.left, target) || searchDfs(root.right, target);
}

function firstCommonAncestor(root, node1, node2) {
    let result = { ancestor: null };
    if(!isDescendantOf(node1, root) || !isDescendantOf(node2, root)) return null;
    firstCommonAncestorRecursive(root, node1, node2, result);
    return result.ancestor;
}

// Time: O(N), Extra space: O(Depth) rec stack
function firstCommonAncestorRecursive(root, node1, node2, result) {
    if(root == null) return false;
    let isNode1LeftDescendant = isDescendantOf(node1, root.left);
    let isNode12RightDescendant = isDescendantOf(node2, root.right);
    if(isNode1LeftDescendant) {
        if(!isNode12RightDescendant) {
            result.ancestor = root.left;
            firstCommonAncestorRecursive(root.left, node1, node2, result);
        } else {
            result.ancestor = root;
            return true;
        }
    } else {
        if(isNode12RightDescendant) {
            result.ancestor = root.right;
            firstCommonAncestorRecursive(root.right, node1, node2, result);
        } else  {
            result.ancestor = root;
            return true;
        }
    }

    return false;
}

let n0 = new Node(0);
let n1 = new Node(1);
let n2 = new Node(2);
let n3 = new Node(3);
let n4 = new Node(4);
let n5 = new Node(5);
let n6 = new Node(6);
let n7 = new Node(7);
let n8 = new Node(8);

n0.left = n1;
n0.right = n2;
n1.left = n3;
n1.right = n4;
n4.left = n6;
n4.right = n7;
n2.left = n5;

// console.log(firstCommonAncestor(n0, n3, n7)); // n1
// console.log(firstCommonAncestor(n0, n3, n2)); // n0
console.log(firstCommonAncestor(n0, n4, n8)); // n4 