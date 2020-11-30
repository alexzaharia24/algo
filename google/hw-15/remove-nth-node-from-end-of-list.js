// https://leetcode.com/problems/remove-nth-node-from-end-of-list/

function removeNthFromEnd(head, n) {
    return removeNthFromEndOnePass(head, n);
}

function removeNthFromEndOnePass(head, n) {
    let helperNode = new ListNode(null, head);
    removeNthFromEndOnePassRecursion(helperNode, -1, -1, n);
    return helperNode.next;
}

function removeNthFromEndOnePassRecursion(node, length, idx, n) {
    if(node === null) {
        return;
    }
    length++;
    

}

function removeNthFromEndTwoPasses(head, n) {
    let length = 0;
    let node = head;
    while (node !== null) {
        length++;
        node = node.next;
    }

    node = head;
    if(length === n) return head.next;
    for (let i = 0; i < length; i++) {
        if (length - i === n + 1) {
            if (node.next !== null) {
                node.next = node.next.next;
            }
            break;
        }
        node = node.next;
    }
    return head;
}

