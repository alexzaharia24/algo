import java.util.ArrayList;
import java.util.List;

class ListNode {
    ListNode next;
    int val;

    public ListNode(int val) {
        this.val = val;
    }
}

public class Main {
    public static void main(String[] args) {
        Main mn = new Main();
        ListNode root = new ListNode(1);
        ListNode node2 = new ListNode(2);
        ListNode node3 = new ListNode(3);
        ListNode node4 = new ListNode(4);
        ListNode node5 = new ListNode(5);

        root.next = node2;
        node2.next = node3;
        node3.next = node4;
        node4.next = node5;

//        root = mn.removeNthFromEnd2Passes(root, 5);
        root = mn.removeNthFromEnd1PassWithList(root, 4);

        ListNode node = root;
        while (node != null) {
            System.out.print(node.val + "->");
            node = node.next;
        }

    }

    public ListNode removeNthFromEnd2Passes(ListNode head, int n) {
        if (head == null) return null;

        // First pass used to find the length of the list

        ListNode node = new ListNode(head.val);
        node.next = head.next;
        int size = 1;
        while (node.next != null) {
            node = node.next;
            size++;
        }

        if (size == n) {
            return head.next;
        }

        // Second pass to remove the n-th node from the end
        int currentNode = 0;
        node = head;
        while (size - currentNode > n + 1) { // Get the immediate predecessor of the n-th node from the end to be able to erase it
            node = node.next;
            currentNode++;
        }
        node.next = node.next.next;

        return head;
    }

    public ListNode removeNthFromEnd1PassWithList(ListNode head, int n) {
        if (head == null) return null;

        ListNode node = head;

        // Pass the nodes and store them in list
        List<ListNode> array = new ArrayList<>();
        array.add(node);
        while (node.next != null) {
            node = node.next;
            array.add(node);
        }

        if (array.size() == n) {
            return head.next;
        }

        // Remove the nth from end
        ListNode preNthNode = array.get(array.size() - n - 1);
        preNthNode.next = preNthNode.next.next;

        return head;
    }
}

