import java.util.HashMap;
import java.util.Map;

/**
 * https://leetcode.com/explore/challenge/card/30-day-leetcoding-challenge/531/week-4/3313/
 * Solution similar to LRU cache
 */
public class Main {
    public static void main(String[] args) {

    }
}

class Node {
    int value;
    Node next;
    Node(int val) {
        this.value =val;
    }
}

class FirstUnique {

    Map<Integer, Node> map = new HashMap<>();
    Node list;
    Node uniqueElem;

    public FirstUnique(int[] nums) {
        for(int x: nums) {
            this.add(x);
        }

        for(int x: nums) {
            Node node = map.get(x);
            if(node.value > 0) {
                this.uniqueElem = node;
                break;
            }
        }
    }

    public int showFirstUnique() {
        if(this.uniqueElem == null) return -1;
        if(this.uniqueElem.value <= 0) {
            // need new unique
            this.updateUnique(this.uniqueElem);
        }
        if(this.uniqueElem != null && this.uniqueElem.value > 0) return this.uniqueElem.value;
        return -1;
    }

    public void updateUnique(Node startNode) {
        Node node = startNode;
        while(node != null && node.value <= 0) {node = node.next;}
        this.uniqueElem = node;
    }

    public void add(int value) {
        if(map.get(value) != null) {
            Node node = map.get(value);
            node.value -= value;
        } else {
            Node node = new Node(value);
            if(list == null) {
                list = node;
            } else {
                list.next = node;
                list = node;
            }
            map.put(value, node);
            if(this.uniqueElem == null) {
                this.updateUnique(node);
            }
        }
    }
}

/**
 * Your FirstUnique object will be instantiated and called as such:
 * FirstUnique obj = new FirstUnique(nums);
 * int param_1 = obj.showFirstUnique();
 * obj.add(value);
 */
