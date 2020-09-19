// https://leetcode.com/problems/linked-list-cycle/
function hasCycle(head) {
    return hasCycleWithSlowAndFastPointers(head);
}

function hasCycleWithHashMap(head) {
    // O(n) time
    // O(n) space
    let hash = new Map();
    let idx = 0;

    let node = head;
    while (node !== null) {
        let idxOfExistingNode = hash.get(node);
        if (idxOfExistingNode !== undefined) {
            return true;
        }
        hash.set(node, idx);
        idx++;
        node = node.next;
    }

    return false;
}

function hasCycleWithSlowAndFastPointers(head) {
    // O(n) time ?? Cum demonstrezi ?
    // O(1) spatiu
    if(head === null) return false;
    let slowNode = head, fastNode = head.next;
    while (slowNode !== null && fastNode !== null) {
        if (slowNode === fastNode) return true;
        slowNode = slowNode.next;
        fastNode = fastNode.next;
        if (fastNode !== null) {
            fastNode = fastNode.next;
        }
    }
    return false;
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
l5.next = l1;

console.log(hasCycle(l1));