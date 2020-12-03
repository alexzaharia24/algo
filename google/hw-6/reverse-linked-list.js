// https://leetcode.com/problems/reverse-linked-list/

class ListNode {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}

function reverseList(head) {
    return reverseIterativelyWithStack(head);
}

function reverseIterativelyWithRememberParent(head) {
    // Option 1 iterative: remember parent
    // O(n) time
    // O(1) space
    let parent, node;
    node = head;
    parent = null;
    while (node !== null) {
        let nextNode = node.next;
        node.next = parent;
        parent = node;
        node = nextNode;
    }
    return parent;
}

function reverseIterativelyWithStack(head) {
    // Option 2 iterative: stack
    // O(n) time
    // O(n) space
    if (head === null) return null;
    let node = head, newHead;
    let stack = [];
    while (node.next !== null) {
        stack.push(node);
        node = node.next;
    }
    newHead = node;

    let parent;
    while (stack.length > 0) {
        parent = stack.pop();
        node.next = parent;
        node = parent;
    }
    node.next = null;
    return newHead;
}


function reverseRecursively(head) {
    // O(n) time
    // O(n) space - stack for recursive calls
    /*
        We can also do this: for getting the new head 
            // Save the tail => the new head
            let newHead = null;
            let node = head;
            
            while(node.next !== null) {
                node = node.next;
            }
            newHead = node;
    */

    if (head === null) return null;
    let newHead = { node: null }
    goDeepRecursive(head, null, newHead);

    return newHead.node;
}

function goDeepRecursive(node, parent, newHead) {
    if (node.next !== null) {
        goDeepRecursive(node.next, node, newHead);
    } else {
        newHead.node = node;
    }
    node.next = parent;

}

let l5 = new ListNode(5, null);
let l4 = new ListNode(4, l5);
let l3 = new ListNode(3, l4);
let l2 = new ListNode(2, l3);
let l1 = new ListNode(1, l2);

console.log(l1);
console.log(reverseList(l1));