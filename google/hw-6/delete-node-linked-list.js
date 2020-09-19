// https://leetcode.com/problems/delete-node-in-a-linked-list/

function deleteNode(node) {
    while(node.next.next !== null) {
        node.val = node.next.val;
        node = node.next;
    }
    node.val = node.next.val;
    node.next = null;
}