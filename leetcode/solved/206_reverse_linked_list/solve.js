/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// Time: O(N), Extra space: O(1)
function reverseList(head) {
    let prev = null, node = head;
    while(node !== null) {
        let next = node.next;
        node.next = prev;
        prev = node;
        node = next;
    }

    return prev;
}

// class Node {
//     constructor(val, next) {
//         this.val = val ?? null;
//         this.next = next ?? null;
//     }
// }

// let n1 = new Node(1);
// let n2 = new Node(2);
// let n3 = new Node(3);

// n1.next = n2;
// n2.next = n3;

// console.log(reverseList(n1));