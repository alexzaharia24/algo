class Node {
    int val;
    int min;
    Node prev;
    Node next;

    Node(int val) {
        this.val = val;
    }

    @Override
    public String toString() {
        return this.val + "";
    }
}

class MinStack {
    Node elem;
    Integer min = null;

    /**
     * initialize your data structure here.
     */
    public MinStack() {
    }

    public void push(int x) {
        if (elem == null) {
            elem = new Node(x);
            elem.min = x;
        } else {
            Node newNode = new Node(x);
            newNode.min = Math.min(elem.min, x);
            elem.next = newNode;
            newNode.prev = elem;
            elem = newNode;
        }
    }

    public void pop() {
        if (elem != null) {
            elem = elem.prev;
            if (elem != null) {
                elem.next = null;
            }
        }
    }

    public int top() {
        if (elem != null) {
            return elem.val;
        }
        return Integer.MIN_VALUE;
    }

    public int getMin() {
        return elem.min;
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack obj = new MinStack();
 * obj.push(x);
 * obj.pop();
 * int param_3 = obj.top();
 * int param_4 = obj.getMin();
 */


/**
 * https://leetcode.com/problems/min-stack/
 */
public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        MinStack minStack = new MinStack();
        minStack.push(-2);
        minStack.push(0);
        minStack.push(-3);
        minStack.getMin();
        minStack.pop();
        minStack.top();
        minStack.getMin();
        System.out.println();
    }
}
