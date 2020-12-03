// https://leetcode.com/problems/middle-of-the-linked-list/

function middleNode(head) {
    return middleNodeOnePass(head);
}

function middleNodeOnePass(head) {
    // O(n) time 
    // O(1) space
    // Use 2 pointers, one for normal iteration and other for iteration of 2 steps at once
    let slowNode = head, fastNode = head;
    while (fastNode.next !== null && fastNode.next.next !== null) {
        slowNode = slowNode.next;
        fastNode = fastNode.next.next;
    }
    return slowNode;
}

function middleNodeTwoPasses(head) {
    // O(n) time
    // O(1) space
    // 1. Find length of list
    let n = 0;
    let node = head;
    while (node !== null) {
        n++;
        node = node.next;
    }

    // 2. Get the node at the middle
    let middle = n / 2;
    node = head;
    for (let i = 1; i <= middle; i++) {
        node = node.next;
    }
    return node;
}

class ListNode {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}

let l5 = new ListNode(5, null);
let l4 = new ListNode(4, l5);
let l3 = new ListNode(3, l4);
let l2 = new ListNode(2, l3);
let l1 = new ListNode(1, l2);

console.log(middleNode(l1))