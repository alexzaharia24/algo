// Intersection: Given two (singly) linked lists, determine if the two lists intersect. Return the intersecting
// node. Note that the intersection is defined based on reference, not value. That is, if the kth
// node of the first linked list is the exact same node (by reference) as the jth node of the second
// linked list, then they are intersecting.
// Hints: #20, #45, #55, #65, #76, #93, #111, #120, #129

const LL = require('../../../utils/data-structures/LinkedList');

function intersectionWithHashMap(head1, head2) {
    if(head1 === null || head2 === null) return null;
    let map = new Map();

    let node1 = head1, node2 = head2;
    while(node1 !== null) {
        map.set(node1, true);
        node1 = node1.next;
    }

    while(node2 !== null) {
        if(map.get(node2)) {
            return node2;
        }
        node2 = node2.next;
    }

    return null;
}

function intersectionWithSkipping(head1, head2) {
    if (head1 === null || head2 === null) return null;
    let length1 = length(head1), length2 = length(head2);

    let node1 = head1, node2 = head2;
    if(length1 > length2) {
        let skip = length1 - length2;
        while (skip > 0) {
            node1 = node1.next;
            skip--;
        }
    } else {
        let skip = length2 - length1;
        while (skip > 0) {
            node2 = node2.next;
            skip--;
        }
    }

    while(node1 !== null && node2 !== null) {
        if(node1 === node2) {
            return node1;
        }
        node1 = node1.next;
        node2 = node2.next;
    }

    return null;

}

function length(head) {
    let length = 0;
    while(head !== null) {
        length++;
        head = head.next;
    }
    return length;
}

let list1 = new LL.LinkedList();
let n1 = new LL.Node(1);
let n2 = new LL.Node(2);
let n3 = new LL.Node(3);
let n4 = new LL.Node(4);
let n5 = new LL.Node(5);
list1.addAll([n1,n2,n3,n4,n5])
let list2 = new LL.LinkedList();
list2.addAll([
    new LL.Node(10),
    new LL.Node(20),
    n4
])

console.log(intersectionWithHashMap(list1.first, list2.first));
