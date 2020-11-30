// https://leetcode.com/problems/binary-tree-level-order-traversal/

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

function levelOrder(root) {
    let order = new Array();
    let queue = [];
    let queueIdx = 0;


    if(root !== null) queue.push({ node: root, level: 0 });
    
    while (queueIdx < queue.length) {
        let element = queue[queueIdx++];
        if (order[element.level] === undefined) {
            order[element.level] = [element.node.val];
        } else {
            order[element.level].push(element.node.val);
        }

        if (element.node.left !== null) {
            queue.push({ node: element.node.left, level: element.level + 1 });
        }
        if (element.node.right !== null) {
            queue.push({ node: element.node.right, level: element.level + 1 });
        }
    }

    return order;
}

let n3 = new TreeNode(3);
let n9 = new TreeNode(9);
let n20 = new TreeNode(20);
let n15 = new TreeNode(15);
let n7 = new TreeNode(7);

n3.left = n9;
n3.right = n20;
n20.left = n15;
n20.right = n7;

console.log(levelOrder(n3));
