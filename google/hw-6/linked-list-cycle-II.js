// https://leetcode.com/problems/linked-list-cycle-ii/

function detectCycle(head) {
    return solveWithFloydCycleDetection(head);
}

function solveWithHashMap(head) {
    // O(n) time
    // O(n) space

    if (head === null) return head;
    let hash = new Map();
    let node = head;
    while (node.next !== null) {
        hash.set(node, true);
        if (hash.get(node.next) === true) {
            return node.next;
        }
        node = node.next;
    }
    return null;
}

function solveWithFloydCycleDetection(head) {
    if(head === null) return null;
    let intersectionPointer = hasCycle(head);
    if(intersectionPointer !== null) {
        let startPointer = head;
        // It is guaranteed that they will meet at the start of the cycle
        while(intersectionPointer !== startPointer) {
            startPointer = startPointer.next;
            intersectionPointer = intersectionPointer.next;
        }
    }
    return intersectionPointer;
}

function hasCycle(head) {
    let slow = head, fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return slow;
    }

    return null;
}