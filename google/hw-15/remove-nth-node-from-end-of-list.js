// https://leetcode.com/problems/remove-nth-node-from-end-of-list/

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
function removeNthFromEnd(head, n) {
    return removeNthFromEndOnePass(head, n);
}

function removeNthFromEndOnePass(head, n) {
    let firstPointer = new ListNode();
    firstPointer.next = head;
    let secondPointer = head;

    // Create a distance of n between first and second pointers
    let counter = 0;
    while (counter < n) {
        if (secondPointer === null) { // Reached end of array before counting n => n-th node from the end is before the first node => return the whole list
            return head;
        }
        counter++;
        secondPointer = secondPointer.next;
    }

    while(secondPointer !== null) {
        secondPointer = secondPointer.next;
        firstPointer = firstPointer.next;
    }

    if(firstPointer.next === head) {
        return head.next;
    }
    firstPointer.next = firstPointer.next.next;

    return head;
}

function removeNthFromEndTwoPasses(head, n) {
    let length = 0;
    let node = head;
    while (node !== null) {
        length++;
        node = node.next;
    }

    node = head;
    if (length === n) return head.next;
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

let n1 = new ListNode(1);
let n2 = new ListNode(2);
let n3 = new ListNode(3);
let n4 = new ListNode(4);
let n5 = new ListNode(5);

n1.next = n2;
n2.next = n3;
n3.next = n4;
n4.next = n5;

// console.log(removeNthFromEnd(n1, 2));
// console.log(removeNthFromEnd(n1, 1));
console.log(removeNthFromEnd(n1, 5));