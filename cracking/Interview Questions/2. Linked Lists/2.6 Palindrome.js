// Palindrome: Implement a function to check if a linked list is a palindrome.
// Hints: #5, #13, #29, #61, #101

const LL = require('../../../utils/data-structures/LinkedList');

function palindrome(head) {
    let stack = [];
    let node = head;
    let length = getLength(head);

    let middle = parseInt(length / 2);
    node = head;
    for (let i = 0; i <= middle; i++) {
        stack.push(node);
        node = node.next;
    }

    if (length % 2 === 1) {
        stack.pop();
    }

    // node is now the one after middle
    while (node !== null) {
        if (node.value !== (stack.pop()).value) {
            return false;
        }
        node = node.next;
    }

    return true;
}


function palindromeRecursive(head) {
    let length = getLength(head);

    let middle = parseInt(length / 2);
    let headNode = { node: head };
    let middleNode = head;

    nextToMiddleIdx = length % 2 === 0 ? middle : middle + 1;
    for (let i = 0; i < nextToMiddleIdx; i++) {
        middleNode = middleNode.next;
    }   

    return recursion(middleNode, headNode);

}

/**
 * Compare is nodes match the palindrome property
 * @param {Node} node The node next the middle to the right
 * @param {{node: Node}} headNode The head node
 */
function recursion(node, headNode) {
    if (node === null) return true;
    let result = recursion(node.next, headNode);
    if (!result) return false;

    if (node.value === headNode.node.value) {
        headNode.node = headNode.node.next;
        return true;
    }

    return false;
}

function getLength(head) {
    let length = 0;
    while (head !== null) {
        length++;
        head = head.next;
    }
    return length;
}

let list = new LL.LinkedList();
list.addAll([
    new LL.Node(1),
    new LL.Node(2),
    new LL.Node(3),
    new LL.Node(2),
    new LL.Node(1)
])

console.log(palindromeRecursive(list.first));