import java.util.HashMap;
import java.util.Map;

//class LRUCache {
//    Map<Integer, Node> map;
//    DoubleLinkedList dll;
//    int capacity;
//
//    public LRUCache(int capacity) {
//        this.capacity = capacity;
//        map = new HashMap<>();
//        dll = new DoubleLinkedList();
//    }
//
//    public int get(int key) {
//        Node n = map.get(key);
//        if (n == null) return -1;
//
//        dll.remove(n);
//        dll.prepend(n);
//
//        return n.val;
//    }
//
//    public void put(int key, int value) {
//        Node n;
//        n = map.get(key);
//        if (n == null) {
//            n = new Node(key, value);
//            n = dll.prepend(n);
//            map.put(key, n);
//        } else {
//            get(key);
//            n.val = value;
//        }
//
//        if(dll.size > capacity) {
//            map.put(dll.tail.key, null);
//            dll.remove(dll.tail);
//        }
//    }
//}
//
///**
// * Your LRUCache object will be instantiated and called as such:
// * LRUCache obj = new LRUCache(capacity);
// * int param_1 = obj.get(key);
// * obj.put(key,value);
// */
//public class Main {
//    public static void main(String[] args) {
//        Main mn = new Main();
//
//        LRUCache cache = new LRUCache(3);
//
////        cache.put(1,1);
////        System.out.println(cache.get(1));
////        cache.put(2,2);
////        System.out.println(cache.get(2));
////        cache.put(3,3);
////        System.out.println(cache.get(1));
////        System.out.println(cache.get(3));
////        System.out.println();
//
////        cache.put(1, 1);
////        cache.put(2, 2);
////        System.out.println(cache.get(1));       // returns 1
////        cache.put(3, 3);    // evicts key 2
////        System.out.println(cache.get(2));       // returns -1 (not found)
////        cache.put(4, 4);    // evicts key 1
////        System.out.println(cache.get(1));       // returns -1 (not found)
////        System.out.println(cache.get(3));       // returns 3
////        System.out.println(cache.get(4));       // returns 4
//
//        System.out.println("---------------------");
//
////        [[3],[1,1],[2,2],[3,3],[4,4],[4],[3],[2],[1],[5,5],[1],[2],[3],[4],[5]]
//
//
//        cache.put(1,1);
//        cache.put(2,2);
//        cache.put(3,3);
//        cache.put(4,4);
//        System.out.println(cache.get(4));
//        System.out.println(cache.get(3));
//        System.out.println(cache.get(2));
//        System.out.println(cache.get(1));
//        cache.put(5,5);
//        System.out.println(cache.get(1));
//        System.out.println(cache.get(2));
//        System.out.println(cache.get(3));
//        System.out.println(cache.get(4));
//        System.out.println(cache.get(5));
//
//
////        DoubleLinkedList dll = new DoubleLinkedList();
////        Node n1 = dll.prepend(1);
////        Node n2 = dll.prepend(2);
////        Node n3 = dll.prepend(3);
////
////        dll.remove(n1);
////        dll.remove(n2);
////        dll.remove(n3);
////
//        System.out.println();
//    }
//
//
//}




class Main {

    public static void main(String[] args) {
        Main man = new Main();
        LRUCache cache = new LRUCache(3);

        cache.put(1,1);
        cache.put(2,2);
        cache.put(3,3);
        cache.put(4,4);
        System.out.println(cache.get(4));
        System.out.println(cache.get(3));
        System.out.println(cache.get(2));
        System.out.println(cache.get(1));
        cache.put(5,5);
        System.out.println(cache.get(1));
        System.out.println(cache.get(2));
        System.out.println(cache.get(3));
        System.out.println(cache.get(4));
        System.out.println(cache.get(5));

    }

}

class LLNode {
    int value;
    int key;
    LLNode prev, next;

    LLNode(int key, int value) {
        this.key = key;
        this.value = value;
    }

    @Override
    public String toString() {
        return key + ": " + value;
    }
}

class LRUCache {
    Map<Integer, LLNode> map;
    LLNode head, tail;
    int size = 0, capacity;

    public LRUCache(int capacity) {
        map = new HashMap<>();
        this.capacity = capacity;
    }

    public int get(int key) {
        LLNode elem = map.get(key);
        if (elem != null) {
            removeNode(elem);
            moveToStart(elem);

            return elem.value;
        }
        return -1;
    }

    public void put(int key, int value) {
        LLNode node = map.get(key);
        if (node == null) {
            node = new LLNode(key, value);
            map.put(key, node);
            size++;
        } else {
            node.value = value;
            map.put(key, node);
            removeNode(node);
        }

        moveToStart(node);
        if (size > capacity) {
            size--;
            removeTail();
        }
    }

    public void moveToStart(LLNode node) {
        if(node == head) return;
        if (head == null) {
            head = node;
            // tail = new LLNode(node.value);
            // tail.prev = head; // (!)
        } else {
            if (tail == null) {
                tail = head;
                tail.prev = node;
                head = node;
                head.next = tail;
            } else {
                head.prev = node;
                node.next = head;
                head = node;
                node.prev = null;
            }
        }
    }

    public void removeNode(LLNode node) {
        if(node == head) return;
        if (node.prev != null) {
            node.prev.next = node.next;
        }
        if (node.next != null) {
            node.next.prev = node.prev;
        }

        if(node == tail) {
            tail = tail.prev;
        }
    }

    public void removeTail() {
        if (tail != null) {
            map.put(tail.key, null);
            tail.prev.next = null;
            tail = tail.prev;
        }
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache obj = new LRUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.put(key,value);
 */