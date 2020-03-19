import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {
    }

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }

    @Override
    public String toString() {
        return String.valueOf(val);
    }
};

public class NextRightPointers {
    public static void run() {
        testImperfectTree();
    }

    public static void testPerfectTree() {
        Node node1 = new Node(1);
        Node node2 = new Node(2);
        Node node3 = new Node(3);
        Node node4 = new Node(4);
        Node node5 = new Node(5);
        Node node6 = new Node(6);
        Node node7 = new Node(7);

        node1.left = node2;
        node1.right = node3;
        node2.left = node4;
        node2.right = node5;
        node3.left = node6;
        node3.right = node7;

        connect(node1);
    }

    public static void testImperfectTree() {
        Node node1 = new Node(1);
        Node node2 = new Node(2);
        Node node3 = new Node(3);
        Node node4 = new Node(4);
        Node node5 = new Node(5);
        Node node6 = new Node(6);
        Node node7 = new Node(7);
        Node node8 = new Node(8);

        node1.left = node2;
        node1.right = node3;
        node2.left = node4;
        node2.right = node5;
        node3.right = node6;
        node4.left = node7;
        node6.right = node8;

        connectImperfectTree(node1);
    }


    public static Node connect(Node root) {
        Queue<Node> toVisit = new LinkedList<>();
        List<Node> order = new ArrayList<>();

        if (root == null) return null;
        toVisit.add(root);

        while (!toVisit.isEmpty()) {
            int size = toVisit.size();

            Node node = toVisit.peek();
            order.add(node);

            while (size > 0) {
                node = toVisit.remove();

                if (node.left != null) toVisit.add(node.left);
                if (node.right != null) toVisit.add(node.right);
                if (size > 1) node.next = toVisit.peek();

                order.add(node.next);
                size--;
            }
        }

        for (Node node : order) {
            System.out.println(node);
        }

        return order.get(0);
    }

    public static Node connectRecursive(Node root) {
        root.next = null;

        if(root.left != null && root.right != null) {
            setNextForLeftNode(root.left, root);
            setNextForRightNode(root.right, root);
        }

        return root;
    }

    public static void setNextForLeftNode(Node node, Node parent) {
        node.next = parent.right;

        if(node.left != null && node.right != null) {
            setNextForLeftNode(node.left, node);
            setNextForRightNode(node.right, node);
        }
    }

    public static void setNextForRightNode(Node node, Node parent) {
        if(parent.next == null) node.next = null;
        else {
            node.next = parent.next.left;
        }

        if(node.left != null && node.right != null) {
            setNextForLeftNode(node.left, node);
            setNextForRightNode(node.right, node);
        }
    }

    public static Node connectRecursiveImproved(Node root) {
        if(root == null) return null;

        if(root.left != null) {
            root.left.next = root.right;
        }
        if(root.right != null && root.next != null) {
            root.right.next = root.next.left;
        }

        connectRecursiveImproved(root.left);
        connectRecursiveImproved(root.right);

        return root;
    }

    public static Node connectImperfectTree(Node root) {
        if(root == null) return null;

        if(root.right != null) {
            if(root.next != null) {
                Node nextParentSibling = root.next;
                while(nextParentSibling != null && nextParentSibling.left == null && nextParentSibling.right == null) {
                    nextParentSibling = nextParentSibling.next;
                }

                if(nextParentSibling != null) {
                    if(nextParentSibling.left != null) root.right.next = nextParentSibling.left;
                    else if(nextParentSibling.right != null) root.right.next = nextParentSibling.right;
                }
//                if(root.next.left != null) {
//                    root.right.next = root.next.left;
//                } else if(root.next.right != null) {
//                    root.right.next = root.next.right;
//                }
            }
            connectImperfectTree(root.right);
        }

        if(root.left != null) {
            if(root.right != null) {
                root.left.next = root.right;
            } else if(root.next != null) {
                Node nextParentSibling = root.next;
                while(nextParentSibling != null && nextParentSibling.left == null && nextParentSibling.right == null) {
                    nextParentSibling = nextParentSibling.next;
                }

                if(nextParentSibling != null) {
                    if(nextParentSibling.left != null) root.left.next = nextParentSibling.left;
                    else if(nextParentSibling.right != null) root.left.next = nextParentSibling.right;
                }
            }

            connectImperfectTree(root.left);
        }




        return root;
    }
}
