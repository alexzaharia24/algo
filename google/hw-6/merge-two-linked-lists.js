// https://leetcode.com/problems/merge-two-sorted-lists
class ListNode {
    constructor(val, next) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

function mergeTwoLists(l1, l2) {
    let merged = new ListNode();
    let headMerged = merged;
    while (l1 !== null && l2 !== null) {
        if(l1.val <= l2.val) {
            merged.next = l1;
            l1 = l1.next;
        } else {
            merged.next = l2;
            l2 = l2.next;
        }
        merged = merged.next;
    }

    if(l1 !== null) {
        merged.next = l1;
    }
    if(l2 !== null) {
        merged.next = l2;
    }
    return headMerged.next;
}