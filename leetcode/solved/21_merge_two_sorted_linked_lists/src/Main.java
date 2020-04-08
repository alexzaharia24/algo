class ListNode {
    int val;
    ListNode next;
    ListNode(int val) {
        this.val = val;
    }
}

/**
 * https://leetcode.com/problems/merge-two-sorted-lists/
 */
public class Main {
    public static void main(String[] args) {

    }

    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if(l1 == null) return l2;
        if(l2 == null) return l1;
        ListNode result;
        ListNode head;
        if(l1.val < l2.val) {
            result = l1;
            l1 = l1.next;
        } else {
            result = l2;
            l2 = l2.next;
        }

        head = result; // Remember the head node. This will be returned

        while(l1 != null && l2 != null) {
            if(l1.val < l2.val) {
                result.next = l1;
                l1 = l1.next;
            } else {
                result.next = l2;
                l2 = l2.next;
            }
            result = result.next;
        }

        if(l1 != null) { // No need for while since remaining nodes will be connected to l1 at this step
            result.next = l1;
        }
        if(l2 != null) { // No need for while since remaining nodes will be connected to l2 at this step
            result.next = l2;
        }

        return head;
    }
}
