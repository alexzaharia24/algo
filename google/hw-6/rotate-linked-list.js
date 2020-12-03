// https://leetcode.com/problems/rotate-list/

class ListNode {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}


function rotateRight(head, k) {
    // O(n) time
    // O(1) space

    if(head === null) return head;
    let node = head;
    // Find length
    let length = 0;
    while (node !== null) {
        length++;
        node = node.next;
    }

    // Remove redundant rotations
    k = k % length;
    if (k === 0) return head;

    // Connect tail with head
    node = head;
    while (node.next !== null) {
        node = node.next;
    }
    node.next = head; // node is tail here

    // Find n-k-1 node
    let idx = 0;
    node = head;
    while (idx < length - k - 1) {
        idx++;
        node = node.next;
    }

    let newHead = node.next;
    // Make node the new tail
    node.next = null;

    return newHead;
}