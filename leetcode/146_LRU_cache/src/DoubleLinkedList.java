class Node {
    int val;
    int key;
    Node prev;
    Node next;

    Node(int key, int val) {
        this.key = key;
        this.val = val;
    }

    Node(int val) {
        this.val = val;
    }

    @Override
    public String toString() {
        return key + "," + val;
    }
}

public class DoubleLinkedList {
    Node head;
    Node tail;
    int size = 0;

    public Node prepend(int val) {
        Node n = new Node(val);
        if (head == null) {
            tail = n;
        } else {
            head.prev = n;
            n.next = head;
        }

        head = n;
        size++;

        return n;
    }

    public Node prepend(Node n) {
        if(n == null) return null;
        if (head == null) {
            tail = n;
        } else {
            head.prev = n;
            n.next = head;
        }

        n.prev = null;
        head = n;
        size++;

        return n;
    }

    public Node append(int val) {
        Node n = new Node(val);
        if (tail == null) {
            head = n;
        } else {
            tail.next = n;
            n.prev = tail;
        }

        tail = n;
        size++;

        return n;
    }

    public Node remove(Node n) {
        if (n == null) return null;
        if (!isNodeInList(n)) return n;
        if (n.prev != null) {
            n.prev.next = n.next;
        } else {
            head = n.next;
        }
        if (n.next != null) {
            n.next.prev = n.prev;
        } else {
            tail = n.prev;
        }

        size--;
        return n;
    }

    public boolean isNodeInList(Node n) {
        if (n == null) return false;
        if (n.prev != null && n.next != null) {
            return n.prev.next == n.next.prev;
        }

        if (n.prev == null && n == head) return true;
        if (n.next == null && n == tail) return true;

        return false;
    }

    public Node insertBefore(int val, Node n) {
        if (n == null) return null;
        Node newNode = new Node(val);
        newNode.next = n;
        if (n.prev != null) {
            newNode.prev = n.prev;
            n.prev.next = newNode;
        } else {
            head = newNode;
        }

        n.prev = newNode;
        size++;

        return newNode;
    }
}
