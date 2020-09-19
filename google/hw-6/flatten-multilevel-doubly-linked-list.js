// https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/
function Node(val,prev,next,child)  {
    this.val = val;
    this.prev = prev;
    this.next = next;
    this.child = child;
}


function flatten(head) {
    return solveRecursive(head);
}

function solveRecursive(head) {
    let node = head;
    let result = new Node(null, null, null, null);
    let resultHead = result;
    goDeep(node, result);

    return resultHead.next;
}

function goDeep(node, result) {
    if(node === null) return null;
    result.child = null;
    result.next = node;
    node.prev = result;
    if(node.child !== null) {
        goDeep(node.child, result);
    }

}