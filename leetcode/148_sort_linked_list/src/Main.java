import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class ListNode {
    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
    }

    @Override
    public String toString() {
        return val + "";
    }
}

public class Main {
    public static void main(String[] args) {
        Main mn = new Main();

//        4->2->1->3
        ListNode n1 = new ListNode(1);
        ListNode n2 = new ListNode(2);
        ListNode n3 = new ListNode(3);
        ListNode n4 = new ListNode(4);

        n4.next = n2;
        n2.next = n1;
        n1.next = n3;

        ListNode sorted = mn.sortList(n4);
        System.out.println();
    }


    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode middle = getMiddle(head);
        ListNode nextOfMiddle = middle.next; // Start of right list
        middle.next = null; // Set this as end of left list

        ListNode sortedLeft = sortList(head);
        ListNode sortedRight = sortList(nextOfMiddle);

        ListNode merged = merge(sortedLeft, sortedRight);
        return merged;
    }

    ListNode merge(ListNode left, ListNode right) {
        if (left == null) return right;
        if (right == null) return left;

        ListNode result;
        ListNode current;
        if (left.val < right.val) {
            result = left;
            current = result;
            left = left.next;
        } else {
            result = right;
            current = result;
            right = right.next;
        }

        while (left != null && right != null) {
            if (left.val < right.val) {
                current.next = left;
                left = left.next;
                current = current.next;
            } else {
                current.next = right;
                right = right.next;
                current = current.next;
            }
        }

        if (left != null) {
            current.next = left;
        }
        if (right != null) {
            current.next = right;
        }
        return result;
    }

    ListNode getMiddle(ListNode head) {
        if (head == null) return null;
        ListNode slow = head;
        ListNode fast = head;

        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        return slow;
    }
}
