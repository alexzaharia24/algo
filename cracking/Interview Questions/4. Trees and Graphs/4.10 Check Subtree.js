// Check Subtree: Tl and T2 are two very large binary trees, with Tl much bigger than T2. Create an
// algorithm to determine if T2 is a subtree of Tl.
// A tree T2 is a subtree ofTi if there exists a node n in Ti such that the subtree of n is identical to T2.
// That is, if you cut off the tree at node n, the two trees would be identical.
// Hints: #4, #7 7, #78, #37, #37

class Node {
    constructor(value, left, right) {
        this.value = value ?? null;
        this.left = left ?? null;
        this.right = right ?? null;
    }
}

function checkSubtree(node) {

}

// function isSubtreeOf(root1, root2) {
//     // Check if the subtree starting in root1 is a subtree starting in root2
//     // True if the in-order, pre-order and post-order are the same for each order item of root1 subtree
//     for()
// }

function iterativeInOrder(root) {
    let order = [];
    if (root == null) return;
    let stack = [], visited = {};
    stack.push(root);
    visited[root.value] = true;
    while (stack.length > 0) {
        let node = stack.pop();
        order.push(node.value);
        if (node.right != null && !visited[node.right.value]) {
            visited[node.right.value] = true;
            stack.push(node.right);
        }
        if (node.left != null && !visited[node.left.value]) {
            visited[node.left.value] = true;
            stack.push(node.left);
        }
    }

    return order;
}

function iterativePreOrder(root) {
    let order = [];
    if (root == null) return;
    let stack = [], visited = {};
    stack.push(root);
    visited[root.value] = true;
    while (stack.length > 0) {
        let node = stack.pop();
        if (node.right != null && !visited[node.right.value]) {
            visited[node.right.value] = true;
            stack.push(node.right);
        }

        if (node.left != null && !visited[node.left.value]) {
            visited[node.left.value] = true;
            stack.push(node);
            stack.push(node.left);
        } else {
            order.push(node.value);
        }
    }

    return order;
}

function iterativePostOrder(root) {
    let order = [];
    if (root == null) return;
    let stack = [], visited = {};
    stack.push(root);
    visited[root.value] = true;
    while (stack.length > 0) {
        let node = stack.pop();
        let shouldVisitLeft = node.left != null && !visited[node.left.value];
        let shouldVisitRight = node.right != null && !visited[node.right.value];
        if (shouldVisitLeft || shouldVisitRight) {
            let shouldAddNode = true;
            if (shouldVisitRight) {
                stack.push(node);
                shouldAddNode = false;
                stack.push(node.right);
                visited[node.right.value] = true;
            }
            if (shouldVisitLeft) {
                if(shouldAddNode) {
                    stack.push(node);
                }
                stack.push(node.left);
                visited[node.left.value] = true;
            }
        } else {
            // console.log("O: ", node, shouldVisitLeft, shouldVisitRight); 
            order.push(node.value);
        }
    }

    return order;
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

// console.log(iterativeInOrder(n0).toString());
// console.log(iterativePreOrder(n0).toString());
console.log(iterativePostOrder(n0).toString());