class ListNode {
    int val;
    ListNode next;
    ListNode(int val) {
        this.val = val;
    }
}

public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        int[] head = {2, 0, 1, 3};
        int node = 2;

        ListNode linkedList = man.getLinkedListFromArray(head);
        man.deleteNode(linkedList);
        man.printLinkedList(linkedList);

    }

    public void deleteNode(ListNode node) {
        deleteNodeWithSkip(node);
    }
    
    public void deleteNodeWithSkip(ListNode node) {
        node.val = node.next.val;
        node.next = node.next.next;
    }
    
    public void deleteNodeWithPermutationToLeft(ListNode node) {
        while(node != null && node.next != null) {
            node.val = node.next.val;
            if(node.next.next == null) 
                node.next = null;
            node = node.next;
        }
    }

    public ListNode getLinkedListFromArray(int[] list) {
        ListNode node = new ListNode(list[0]);
        ListNode head = node;
        for(int i=1; i<list.length; i++) {
            ListNode next = new ListNode(list[i]);
            node.next = next;
            node = next; 
        }
        return head;
    }

    public void printLinkedList(ListNode linkedList) {
        while(linkedList != null) {
            System.out.print(linkedList.val + "->");
            linkedList = linkedList.next;
        }
    }
}