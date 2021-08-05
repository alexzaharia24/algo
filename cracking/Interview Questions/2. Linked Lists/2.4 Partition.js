// Partition: Write code to partition a linked list around a value x, such that all nodes less than x come
// before all nodes greater than or equal to x. lf x is contained within the list, the values of x only need
// to be after the elements less than x (see below). The partition element x can appear anywhere in the
// "right partition"; it does not need to appear between the left and right partitions.
// EXAMPLE
// Input: 3 -> 5 -> 8 -> 5 -> 10 -> 2 -> 1 [partition = 5)
// Output: 3 -> 1 -> 2 -> 10 -> 5 -> 5 -> 8
// Hints: #3, #24

const LL = require('../../../utils/data-structures/LinkedList');

function partitionSwapValues(head, x) {
    if (head === null) return null;
    let current = head;
    let ahead = head.next;
    while (ahead !== null) {
        if (ahead.value >= x) {
            ahead = ahead.next;
            continue;
        }
        if (current.value >= x) {
            [current.value, ahead.value] = [ahead.value, current.value];
        }
        current = current.next;
    }

    return head;
}

function partitionMoveNodes(node, x) {
    let head = node, tail = node;
    while(node !== null) {
        let next = node.next;
        if(node.value < x) {
            // Add before head
            node.next = head;
            head = node;
        } else {
            // Add after tail
            tail.next = node;
            tail = node;
        }
        node = next;
    }

    // Break the cycle
    tail.next = null; 
    return head;
}

let list = new LL.LinkedList();
let n1 = new LL.Node(1);
let n2 = new LL.Node(2);
let n3 = new LL.Node(3);
let n4 = new LL.Node(4);
let n5 = new LL.Node(5);
let n6 = new LL.Node(6);
list.addAll([n1, n4, n3, n2, n5, n6])
let p = partitionMoveNodes(n1, 4)
console.log(LL.Utils.toStringFromHead(p));