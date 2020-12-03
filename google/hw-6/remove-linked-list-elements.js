// https://leetcode.com/problems/remove-linked-list-elements/

class ListNode {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}

function removeElements(head, val) {
    // O(n) time
    // O(1)
    if(head === null) return null;

    let resultHead = head;
    let parent = null;
    while(head !== null) {
        if(head.val === val) {
            if(parent !== null) {
                // Node not head
                parent.next = head.next; // Skip current node
            } else {
                // Node is head => need new head
                resultHead = resultHead.next;
            }
        } else {
            parent = head;
        }
        head = head.next;
    }

    return resultHead;
}

let l5 = new ListNode(5, null);
let l4 = new ListNode(4, l5);
let l3 = new ListNode(3, l4);
let l2 = new ListNode(2, l3);
let l21 = new ListNode(2, l2);
let l1 = new ListNode(1, l21);
let l0 = new ListNode(1, l1);

console.log(removeElements(l0, 2));