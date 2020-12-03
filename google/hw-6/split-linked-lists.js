// https://leetcode.com/problems/split-linked-list-in-parts/

function splitListToParts(root, k) {
    // O(n) time
    // O(n) space for result (O(1) if result not taken into consideration)
    if (k === 1) return [root];
    let result = new Array(k).fill(null);

    // Find out the length of the linked list
    let length = 0;
    let node = root;
    while (node !== null) {
        length++;
        node = node.next;
    }

    let nrOfNodes, remainder;

    // Decide how many nodes per part
    if (k > length) {
        nrOfNodes = 1;
        remainder = 0;
    } else {
        nrOfNodes = parseInt(length / k);
        remainder = length % k;
    }

    // Create parts
    node = root;
    let partIdx = 0;
    let currentPartNrOfNodes = nrOfNodes - 1; // -1 because there is one node in part to start with
    let partHead = node;
    while (node !== null) {
        if (currentPartNrOfNodes > 0) {
            node = node.next;
            currentPartNrOfNodes--;
        } else {
            // Add aditional node to part if possible
            if (remainder > 0) {
                node = node.next;
                remainder--;
            }

            let nextNode = node.next;
            node.next = null;
            result[partIdx++] = partHead;
            partHead = nextNode;
            node = nextNode;
            currentPartNrOfNodes = nrOfNodes - 1;
        }
    }

    return result;
}