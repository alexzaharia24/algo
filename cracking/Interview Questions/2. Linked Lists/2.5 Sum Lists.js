// Sum Lists: You have two numbers represented by a linked list, where each node contains a single
// digit. The digits are stored in reverse order, such that the 1 's digit is at the head of the list. Write a
// function that adds the two numbers and returns the sum as a linked list.
// EXAMPLE
// Input: (7-) 1 -) 6) + (5 -) 9 -) 2) .Thatis,617 + 295.
// Output: 2 -) 1 -) 9. That is, 912.
// FOLLOW UP
// Suppose the digits are stored in forward order. Repeat the above problem.
// EXAMPLE
// Input: (6 -) 1 -) 7) + (2 -) 9 -) 5).Thatis,617 + 295.
// Output: 9 -) 1 -) 2. That is, 912.
// Hints: #7, #30, #71, #95, #109

const LL = require('../../../utils/data-structures/LinkedList');

// O(Max(length1, length2)) space and time
function sumBackwards(head1, head2) {
    let resultHead = new LL.Node();
    let currentNodeResult = resultHead;
    let currentNode1 = head1;
    let currentNode2 = head2;
    let carry = 0;

    while (currentNode1 !== null || currentNode2 !== null) {
        let value1 = currentNode1 !== null ? currentNode1.value : 0;
        let value2 = currentNode2 !== null ? currentNode2.value : 0;
        let sum = carry + value1 + value2;
        let remainder = sum % 10;
        carry = parseInt(sum / 10);

        currentNodeResult.value = remainder;
        currentNode1 = currentNode1 !== null ? currentNode1.next : null;
        currentNode2 = currentNode2 !== null ? currentNode2.next : null;

        if (currentNode1 !== null || currentNode2 !== null) {
            let newNode = new LL.Node();
            currentNodeResult.next = newNode;
            currentNodeResult = newNode;
        }
    }

    if (carry !== 0) {
        currentNodeResult.next = new LL.Node(carry);
    }

    return resultHead;
}

// O(2*N) space and O(N) time where N = Max(length1, length2)
function sumBackwardsRecursive(head1, head2) {
    let resultHead = new LL.Node();

    recursionBackwards(head1, head2, resultHead, 0);

    return resultHead;
}

function recursionBackwards(node1, node2, resultNode, carry) {
    if (node1 === null && node2 === null && carry === 0) return;
    let value1 = node1 !== null ? node1.value : 0;
    let value2 = node2 !== null ? node2.value : 0;

    let sum = carry + value1 + value2;
    let remainder = sum % 10;
    carry = parseInt(sum / 10);

    resultNode.value = remainder;
    if (node1 !== null || node2 !== null) {
        resultNode.next = new LL.Node();
    }

    let next1 = node1 !== null ? node1.next : null;
    let next2 = node2 !== null ? node2.next : null;

    recursionBackwards(next1, next2, resultNode.next, carry);
}

function sumForwardsWithReverse(head1, head2) {
    // Transform from forwards to backwards
    if (head1 === null) return head2;
    if (head2 === null) return head1;

    head1 = reverseLinkedList(head1);
    head2 = reverseLinkedList(head2);

    return reverseLinkedList(sumBackwards(head1, head2));
}

function reverseLinkedList(head) {
    let prev = null;
    let current = head;

    while (current !== null) {
        let next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    return prev;
}

// O(2*N) space and O(N) time where N = Max(length1, length2)
function sumForwardsRecursiveWithPadding(head1, head2) {
    // Works only for LLs with the same length

    let length1 = getLengthRecursive(head1);
    let length2 = getLengthRecursive(head2);

    if (length1 < length2) {
        head1 = padList(head1, length2 - length1);
    } else {
        head2 = padList(head2, length1 - length2);
    }

    let carry = { value: 0 };
    let resultHead = recursionForwards(head1, head2, carry);

    if (carry.value > 0) {
        resultHead = insertNodeBefore(resultHead, carry.value);
    }


    return resultHead;
}

function getLengthRecursive(head) {
    if (head === null) return 0;
    return 1 + getLengthRecursive(head.next);
}

function padList(head, padding) {
    while (padding > 0) {
        head = insertNodeBefore(head, 0);
        padding--;
    }
    return head;
}

function insertNodeBefore(node, value) {
    let newNode = new LL.Node(value ?? null);
    newNode.next = node;
    return newNode;
}

function recursionForwards(node1, node2, carry) {
    if (node1 === null && node2 === null && carry.value === 0) return null;

    let next1 = node1 !== null ? node1.next : null;
    let next2 = node2 !== null ? node2.next : null;

    let resultHead = recursionForwards(next1, next2, carry);

    let value1 = node1 !== null ? node1.value : 0;
    let value2 = node2 !== null ? node2.value : 0;

    let sum = carry.value + value1 + value2;
    let remainder = sum % 10;
    carry.value = parseInt(sum / 10);

    let newResultHead = new LL.Node();
    newResultHead.value = remainder;
    newResultHead.next = resultHead;

    return newResultHead;
}



//// BACKWARDS
// let list1 = new LL.LinkedList();
// list1.addAll([
//     new LL.Node(9),
//     new LL.Node(9)
// ])
// let list2 = new LL.LinkedList();
// list2.addAll([
//     new LL.Node(9),
//     new LL.Node(9),
//     new LL.Node(9),
//     new LL.Node(9)
// ])

// let list1 = new LL.LinkedList();
// list1.addAll([
//     new LL.Node(9),
//     new LL.Node(7),
//     new LL.Node(8),
// ])
// let list2 = new LL.LinkedList();
// list2.addAll([
//     new LL.Node(6),
//     new LL.Node(8),
//     new LL.Node(5)
// ])

// console.log(LL.Utils.toStringFromHead(sumBackwardsRecursive(list1.first, list2.first)));


//// FORWARDS
// let list1 = new LL.LinkedList();
// list1.addAll([
//     new LL.Node(6),
//     new LL.Node(1),
//     new LL.Node(7)
// ])
// let list2 = new LL.LinkedList();
// list2.addAll([
//     new LL.Node(2),
//     new LL.Node(9),
//     new LL.Node(5)
// ])

let list1 = new LL.LinkedList();
list1.addAll([
    new LL.Node(9),
    new LL.Node(9),
    new LL.Node(9),
    new LL.Node(9)
])
let list2 = new LL.LinkedList();
list2.addAll([
    new LL.Node(9),
    new LL.Node(9)
])
console.log(LL.Utils.toStringFromHead(sumForwardsRecursiveWithPadding(list1.first, list2.first)));