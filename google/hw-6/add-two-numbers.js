// https://leetcode.com/problems/add-two-numbers/

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

function addTwoNumbers(l1, l2) {
    // O(n) time
    // O(1) space
    let sumHead = new ListNode(null, null);
    let result = sumHead;

    let remainder = 0;
    while (l1 !== null || l2 !== null) {
        let value1 = l1 !== null ? l1.val : 0;
        let value2 = l2 !== null ? l2.val : 0;

        let sum = value1 + value2;
        let partialResult = remainder + sum;

        let digit = partialResult % 10;

        sumHead.val = digit;

        remainder = parseInt(partialResult / 10);

        if ((l1 !== null && l1.next !== null) || (l2 !== null && l2.next !== null)) {
            // Prepare next node if there is another digit to be added
            let nextNode = new ListNode(null, null);
            sumHead.next = nextNode;
            sumHead = nextNode;
        }

        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }

    if (remainder > 0) {
        sumHead.next = new ListNode(remainder, null);
    }

    return result;
}