// Loop Detection: Given a circular linked list, implement an algorithm that returns the node at the
// beginning of the loop.
// DEFINITION
// Circular linked list: A (corrupt) linked list in which a node's next pointer points to an earlier node, so
// as to make a loop in the linked list.
// EXAMPLE
// Input: A -) B -) C -) 0 -) E - ) C[thesameCasearlierl
// Output: C
// Hints: #50, #69, #83, #90

const LL = require('../../../utils/data-structures/LinkedList');

function detectLoopWithHashMap(head) {
    if(head === null) return null;
    let map = new Map();
    let node = head;
    
    while(node !== null) {
        if(map.get(node)) return node;
        map.set(node, true);
        node = node.next;
    }

    return null;
}

function detectLoopWithVisitedMark(head) {
    if(head === null) return null;
    let node = head;
    
    while(node !== null) {
        if(node.visited) return node;
        node.visited = true;
        node = node.next;
    }

    return null;
}

function detectLoopWithFloyd(head) {
    if(head === null) return null;
    let slow = head, fast = head;
    
    while(fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;  
        if(slow === fast) break;
    }
    if(fast !== null) {
        slow = head;
        while(slow !== fast) {
            slow = slow.next;
            fast = fast.next;
        }
    }

    return fast;
}

let list = new LL.LinkedList();
let n1 = new LL.Node(1);
let n2 = new LL.Node(2);
let n3 = new LL.Node(3);
let n4 = new LL.Node(4);
let n5 = new LL.Node(5);
list.addAll([n1,n2,n3,n2])

console.log(detectLoopWithFloyd(list.first));
