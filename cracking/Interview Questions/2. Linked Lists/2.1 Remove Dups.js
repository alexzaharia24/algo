const LL = require('../../../utils/data-structures/LinkedList');

// O(N) time, O(N) space
function removeDupsWithHashMap(node) {
    if (node === null !== node.next === null) return node;
    let map = new Map();
    let currentNode = node;
    map.set(currentNode.value, true);
    while (currentNode !== null && currentNode.next !== null) {
        if (map.get(currentNode.next.value)) {
            currentNode.next = currentNode.next.next;
        } else {
            map.set(currentNode.next.value, true)
            currentNode = currentNode.next;
        }
    }
    return node;
}

// O(N^2) time and O(1) space
function removeDupsWithTwoPointersMarkDelete(node) {
    if (node === null !== node.next === null) return node;
    let node1 = node, node2;
    while (node1 !== null) {
        node2 = node1.next;
        while (node2 !== null) {
            if (node1.value === node2.value) {
                // Mark for deletion
                node2.value = null;
            }
            // Mark all duplicates with node1 before moving to the next element
            node2 = node2.next;
        }
        if(node1.next !== null && node1.next.value === null) {
            // Needs deletions
            node1.next = node1.next.next;
        } else {
            node1 = node1.next;
        }
    }

    return node;
}

// O(N^2) time and O(1) space
function removeDupsWithTwoPointersDeleteAsYouGo(node) {
    if (node === null !== node.next === null) return node;
    let current = node;
    while (current !== null) {
        let runner = current;
        while (runner.next !== null) {
            if (current.value === runner.next.value) {
                // Delete duplicate
                runner.next = runner.next.next;
            } else {
                runner = runner.next;
            }
        }
        current = current.next;
    }

    return node;
}

let list = new LL.LinkedList();
let n1 = new LL.Node(1);
let n2 = new LL.Node(2);
let n3 = new LL.Node(2);
let n4 = new LL.Node(3);
let n5 = new LL.Node(4);
let n6 = new LL.Node(3);
list.addAll([n1,n2,n3,n4,n5,n6])

list.first = removeDupsWithTwoPointersDeleteAsYouGo(list.first);
console.log(list.toString());