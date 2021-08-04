// Delete Middle Node: Implement an algorithm to delete a node in the middle (i.e., any node but
// the first and last node, not necessarily the exact middle) of a singly linked list, given only access to
// that node.
// EXAMPLE
// Input: the node c from the linked list a - >b- >c - >d - >e- >f
// Result: nothing is returned, but the new linked list looks like a - >b- >d - >e- >f
// Hints: #72

const LL = require('../../../utils/data-structures/LinkedList');

function deleteMiddleNode(head, node) {
    if(head === null || node === null) return null;

    let current = head;
    while(current !== null && current.next !== node) {
        current = current.next;
    }

    current.next = current.next.next;

    return head;
}

function deleteMiddleNodeNoHead(node) {
    if(node === null || node.next === null) return false;
    node.value = node.next.value;
    node.next = node.next.next;
    return true;
}

let list = new LL.LinkedList();
let n1 = new LL.Node(1);
let n2 = new LL.Node(2);
let n3 = new LL.Node(3);
let n4 = new LL.Node(4);
let n5 = new LL.Node(5);
let n6 = new LL.Node(6);
list.addAll([n1, n2, n3, n4, n5, n6])
deleteMiddleNodeNoHead(n2);
// console.log(deleteMiddleNode(n1, n3));
console.log(list.toString());