// https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list/

// Definition for a Node.
function Node(val, next) {
    this.val = val;
    this.next = next;
};


function insert(head, insertVal) {
    // O(n) time
    // O(1) space
    
    let node = head;
    let newNode = new Node(insertVal, null);
    if (head === null) {
        newNode.next = newNode;
        return newNode;
    }

    let lowerBoundNode = node;
    do {
        if (
            // Find two elements between wich the new node belongs
            // 1. a and b such that a <= newNode <= b
            // 2. a and b such that a <= newNode and newNode > b but a > b as well which means a is the max elem in the list (it is "the tail" of the list)
            // 3. a and b such that a >= newNode and newNode <= b but a > b as well which means a is the max and b is the smallest (the "head" of the list) and the newNode will be the new smallest element
            (node.val <= insertVal && (insertVal <= node.next.val || node.val > node.next.val))
            || (node.val >= insertVal && insertVal <= node.next.val && node.val > node.next.val)) {

            lowerBoundNode = node;
            break;
        }
        node = node.next;
    } while (node !== head)

    newNode.next = lowerBoundNode.next;
    lowerBoundNode.next = newNode;
    return head;
}

let n1 = new Node(2);
let n2 = new Node(2);
let n3 = new Node(1);
n1.next = n2;
n2.next = n3;
n3.next = n1;

let head = insert(n2, 4);
let node = head;
do {
    console.log(node.val + " -> ");
    node = node.next;
} while(node !== head)