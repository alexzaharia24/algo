// 2.2 Return Kth to Last: Implement an algorithm to find the kth to last element of a singly linked list.
// Hints: #8, #25, #47, #67, # 726

const LL = require('../../../utils/data-structures/LinkedList');

function findKthToLast(node, K) {
    if (K === 0) return null;
    let current = node;
    let currentPlusK = node;
    let leftToGo = K - 1;

    while (leftToGo > 0 && currentPlusK.next !== null) {
        leftToGo--;
        currentPlusK = currentPlusK.next;
    }
    if (leftToGo > 0) return null;

    while (currentPlusK.next !== null) {
        current = current.next;
        currentPlusK = currentPlusK.next;
    }

    return current;
}

function findKthToLastRefined(node, K) {
    if (K === 0) return null;
    let current = node;
    let currentPlusK = node;

    for (let i = 0; i < K; i++) {
        if (currentPlusK === null) {
            return null;
        }
        currentPlusK = currentPlusK.next;
    }

    while (currentPlusK !== null) {
        current = current.next;
        currentPlusK = currentPlusK.next;
    }

    return current;
}

// O(N) time, O(N) space (recursion stack)
function findKthToLastRecursive(node, K) {
    return recursion(node, K, { value: 0 });
}

function recursion(node, K, idxFromEnd) {
    if (node === null) return null;

    let result = recursion(node.next, K, idxFromEnd);

    idxFromEnd.value += 1;
    if (idxFromEnd.value === K) {
        return node;
    }

    return result;
}


let list = new LL.LinkedList();
let n1 = new LL.Node(1);
let n2 = new LL.Node(2);
let n3 = new LL.Node(3);
let n4 = new LL.Node(4);
let n5 = new LL.Node(5);
let n6 = new LL.Node(6);
list.addAll([n1, n2, n3, n4, n5, n6])

console.log(findKthToLast(list.first, 4));