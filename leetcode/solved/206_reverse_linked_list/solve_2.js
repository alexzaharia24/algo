class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

const printLinkedList = (head) => {
    let string = "";

    while (head !== null) {
        string += head.val;

        if (head.next != null) {
            string += " -> ";
        }

        head = head.next;
    }

    console.log(string);
}

// 1 -> 2 -> 3 -> 4 -> 5 -> null
// current = 1, prev = null, 1.next = 2 => 1.next = null, prev = 1
// current = 2, prev = 1, 2.next = 3 => 2.next = 1, prev = 2
// current = 3, prev = 2, 3.next = 4 => 3.next = 2, prev = 3
// current = 4, prev = 3, 4.next = 5 => 4.next = 3, prev = 4
// current = 5, prev = 4, 5.next = null => 5.next = 4, prev = 5
// current = null
// return prev

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseListIterative = function (head) {
    let prev = null, current = head;

    while (current !== null) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    return prev;
};

// 1 current = 1 prev = null, .next = null
// 2 current = 2, prev = 1, .next = 1
// 3 current = 3, prev = 2, .next = 2
// 4 current = 4, prev = 3, .next = 3
// 5 current 5, prev = 4, .next = 4
// null

const recurseOne = (current, prev) => {
    if (current === null) return prev;

    const newHead = recurseOne(current.next, current);

    current.next = prev;
    
    return newHead;
}

const recurseTwo = (current, prev) => {
    if (current === null) return prev;

    const next = current.next;
    current.next = prev;

    return recurseTwo(next, current);
}

const reverseListRecursive = (head) => {
    return recurseTwo(head, null);
}

const reverseList = (head) => {
    return reverseListRecursive(head);
}

const five = new ListNode(5, null);
const four = new ListNode(4, five);
const three = new ListNode(3, four);
const two = new ListNode(2, three);
const one = new ListNode(1, two);

printLinkedList(one);
// printLinkedList(reverseList(one));
printLinkedList(reverseListRecursive(one));