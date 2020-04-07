import java.util.Stack;

class ListNode {
    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
    }

    @Override
    public String toString() {
        return this.val + "";
    }
}

/**
 * https://leetcode.com/problems/reverse-linked-list/
 */
public class Main {
    public static void main(String[] args) {
//        Input: 1->2->3->4->5->NULL
//        Output: 5->4->3->2->1->NULL
    }

    public ListNode reverseListIterative(ListNode head) {
        if(head == null) return head;
        Stack<ListNode> order = new Stack<>();

        ListNode node = head;
        while(node != null) {
            order.push(node);
            node = node.next;
        }

        node = order.pop();
        ListNode result = node;
        while(order.size() > 0) {
            node.next = order.pop();
            node = node.next;
        }
        node.next = null;

        return result;
    }

    public ListNode reverseListRecursive(ListNode head) {
        if (head == null) return null;
        if (head.next == null) return head;
        ListNode newHead = reverseRec(head.next, head);
        head.next = null; // Remove next from previous head

        return newHead;
    }

    public ListNode reverseRec(ListNode node, ListNode parent) {
        if (node == null) {
            return parent;
        }

        ListNode head = reverseRec(node.next, node); // Get tail (new head)
        node.next = parent;
        return head; // Return tail (new head)

    }
}
