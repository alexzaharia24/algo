// https://leetcode.com/problems/copy-list-with-random-pointer/

class Node {
    constructor(val, next, random) {
        this.val = val;
        this.next = next;
        this.random = random;
    }
}

function copyRandomList(head) {
    return copyRandomListWithDuplicateNode(head);
}

function copyRandomListWithDuplicateNode(head) {
    if(head === null) return null;
    let originalNode = head;
    // Add duplicate node and set "val" and "next"
    while (originalNode !== null) {
        let duplicateNode = new Node(originalNode.val, null, null);
        let originalNodeNext = originalNode.next;
        originalNode.next = duplicateNode;
        duplicateNode.next = originalNodeNext;
        originalNode = originalNodeNext;
    }

    let node = head;
    while (node !== null) {
        node.next.random = node.random === null ? null : node.random.next;
        node = node.next.next;
    }

    let deepCopyHead = head.next;
    // Separate lists
    node = head;
    while(node !== null) {
        let nextNode = node.next;
        let currentNodeNext = nextNode === null ? null : nextNode.next;
        node.next = currentNodeNext;
        node = nextNode;
    }

    return deepCopyHead;

}

function copyRandomListWithHashMap(head) {
    let hashMap = new Map();
    let noode = head;
    // Create new nodes and map original nodes to copied nodes
    while (noode !== null) {
        hashMap.set(noode, new Node(noode.val));
        noode = noode.next;
    }
    // Set up "next" and "random" pointers for copy nodes
    noode = head;
    while (noode !== null) {
        let copyNode = hashMap.get(noode);
        copyNode.next = hashMap.get(noode.next) ?? null;
        copyNode.random = hashMap.get(noode.random) ?? null;
        hashMap.set(noode, copyNode);
        noode = noode.next;
    }

    return hashMap.get(head);
}

let n7 = new Node(7);
let n13 = new Node(13);
let n11 = new Node(11);
let n10 = new Node(10);
let n1 = new Node(1);

n7.next = n13;
n7.random = null;
n13.next = n11;
n13.random = n7;
n11.next = n10;
n11.random = n1;
n10.next = n1;
n10.random = n11;
n1.next = null;
n1.random = n7;

let deepCopy = copyRandomList(n7);
console.log(deepCopy);