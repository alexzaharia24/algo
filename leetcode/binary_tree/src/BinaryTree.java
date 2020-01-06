import com.sun.source.tree.Tree;

import java.lang.reflect.Array;
import java.util.*;

class Pair<K, V> {
    private K key;
    private V value;

    Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() {
        return this.key;
    }

    public V getValue() {
        return this.value;
    }
}

public class BinaryTree {
    public static List<Integer> nodes;

    public static void main(String[] args) {
        int[] treeArray = {-1, 1, 2, 3, -1, -1, -1, -1};

        // TODO binary tree array representation
//        TreeNode node1 = new TreeNode(1);
//        TreeNode node2 = new TreeNode(2);
//        TreeNode node3 = new TreeNode(3);
//        TreeNode node4 = new TreeNode(4);
//        TreeNode node5 = new TreeNode(5);
//        TreeNode node6 = new TreeNode(6);
//        TreeNode node7 = new TreeNode(7);
//        TreeNode node8 = new TreeNode(8);

//        node1.left = node2;
//        node1.right = node3;
//        node2.left = node4;
//        node2.right = node5;
//        node3.right = node7;
//        node5.right = node6;
//        node7.left = node8;

//        node3.left = node1;
//        node3.right = node2;

//        node1.left = node2;
//        node1.right = node3;


//        preorderTraversal(tree);
//        List<Integer> nodes = preorderTraversalIterative(tree);
//        List<Integer> nodes = traversal(node1);
//        for (Integer i : nodes) {
//            System.out.println(i);
//        }

//        iterative();


        TreeNode nodeA = new TreeNode("A");
        TreeNode nodeB = new TreeNode("B");
        TreeNode nodeC = new TreeNode("C");
        TreeNode nodeD = new TreeNode("D");
        TreeNode nodeE = new TreeNode("E");
        TreeNode nodeF = new TreeNode("F");
        TreeNode nodeG = new TreeNode("G");
        TreeNode nodeH = new TreeNode("H");
        TreeNode nodeI = new TreeNode("I");
        TreeNode nodeJ = new TreeNode("J");

        nodeF.left = nodeB;
        nodeF.right = nodeG;
        nodeB.left = nodeA;
        nodeB.right = nodeD;
        nodeD.left = nodeC;
        nodeD.right = nodeE;
        nodeG.right = nodeI;
        nodeI.left = nodeH;
//        nodeH.right = nodeJ;


//        breadthFirstTraversal(nodeF);
//        breadthFirstTraversalNoPair(nodeF);

//        int[] answer = {0};
//        maxDepthTopDown(nodeF, 1, answer);
//        System.out.println("Max depth top down: " + answer[0]);
//
//        int depthBottomUp = maxDepthBottomUp(nodeF, 1);
//        System.out.println("Max depth bottom up: " + depthBottomUp);


        SymmetricBinaryTree.run();
    }

    public static int maxDepthBottomUp(TreeNode node, int depth) {
        if (node == null) return 0;
        int leftDepth = maxDepthBottomUp(node.left, depth);
        int rightDepth = maxDepthBottomUp(node.right, depth);
        return Math.max(leftDepth, rightDepth) + 1;
    }

    public static void maxDepthTopDown(TreeNode node, Integer depth, int[] answer) {
        if (node == null) return;
        if (node.left == null && node.right == null) {
            answer[0] = Math.max(depth, answer[0]);
        }
        maxDepthTopDown(node.left, depth + 1, answer);
        maxDepthTopDown(node.right, depth + 1, answer);
    }

    public static List<List<String>> breadthFirstTraversal(TreeNode root) {
        List<List<String>> order = new ArrayList<>();
        Queue<Pair<TreeNode, Integer>> toVisit = new LinkedList<>();

        if (root != null) {
            toVisit.add(new Pair<>(root, 0));
        }

        while (!toVisit.isEmpty()) {
            Pair<TreeNode, Integer> pair = toVisit.remove();
            TreeNode node = pair.getKey();
            Integer level = pair.getValue();

            if (node.left != null) toVisit.add(new Pair<>(node.left, level + 1));
            if (node.right != null) toVisit.add(new Pair<>(node.right, level + 1));

            try {
                order.get(level);
            } catch (IndexOutOfBoundsException e) {
                order.add(new ArrayList<>());
            }
            if (order.get(level) != null) {
                order.get(level).add(node.name);
            }
        }

//        for (List<String> level : order) {
//            for (String nodeName : level) {
//                System.out.print(nodeName + " ");
//            }
//            System.out.println();
//        }

        return order;
    }

    public static List<List<String>> breadthFirstTraversalNoPair(TreeNode root) {
        List<List<String>> order = new ArrayList<>();
        Queue<TreeNode> toVisit = new LinkedList<>();

        if (root != null) {
            toVisit.add(root);
        }

        while (!toVisit.isEmpty()) {

            List<String> levelValues = new ArrayList<>();

            int queueSize = toVisit.size();
            TreeNode node;
            while (queueSize > 0) {
                node = toVisit.poll();

                if (node.left != null) toVisit.add(node.left);
                if (node.right != null) toVisit.add(node.right);

                levelValues.add(node.name);
                queueSize--;
            }

            order.add(levelValues);
        }

//        for (List<String> level : order) {
//            for (String nodeName : level) {
//                System.out.print(nodeName + " ");
//            }
//            System.out.println();
//        }

        return order;
    }

    public static TreeNode getTreeLinkedListFromArray(int[] treeArray) {
        if (treeArray.length < 2) {
            return null;
        }
        TreeNode root = new TreeNode(treeArray[1]);
        TreeNode currentNode = new TreeNode(root.val);
        for (int i = 2; i < treeArray.length; i++) {
            if (treeArray[i] != -1) {
                currentNode.val = treeArray[i];
                currentNode.left = new TreeNode(-1);
            }

        }

        return root;
    }

    /**
     * Definition for a binary tree node.
     * public class TreeNode {
     * int val;
     * TreeNode left;
     * TreeNode right;
     * TreeNode(int x) { val = x; }
     * }
     */
    public static List<Integer> traversal(TreeNode root) {
        List<Integer> nodes = new ArrayList<>();
        if (root == null) {
            return nodes;
        }
//        preorderTraversalRecursive(root);

//        inorderTraversalRecursive(root, nodes);
//        nodes = inorderTraversalIterative(root);

//        postorderTraversalRecursive(root, nodes);
        nodes = postorderTraversalIterative(root);

        return nodes;
    }

    public static void preorderTraversalRecursive(TreeNode root) {
        nodes.add(root.val);
        if (root.left != null) {
            preorderTraversalRecursive(root.left);
        }
        if (root.right != null) {
            preorderTraversalRecursive(root.right);
        }
    }

    public static List<Integer> preorderTraversalIterative(TreeNode root) {
        Stack<TreeNode> toVisit = new Stack<>();
        List<Integer> order = new ArrayList<>();
        toVisit.add(root);
        while (!toVisit.empty()) {
            TreeNode node = toVisit.pop();
            order.add(node.val);
            if (node.right != null) {
                toVisit.push(node.right);
            }
            if (node.left != null) {
                toVisit.push(node.left);
            }
        }
        System.out.println("Iterative traversal finished");

        return order;
    }

    public static void inorderTraversalRecursive(TreeNode root, List<Integer> order) {
        if (root.left != null) inorderTraversalRecursive(root.left, order);
        order.add(root.val);
        if (root.right != null) inorderTraversalRecursive(root.right, order);
    }

    public static List<Integer> inorderTraversalIterative(TreeNode root) {
        List<Integer> order = new ArrayList<>();
        Stack<TreeNode> toVisit = new Stack<>();
        List<TreeNode> visited = new ArrayList<>();

        toVisit.push(root);
        while (!toVisit.empty()) {
            TreeNode node = toVisit.pop();
            if (node.right != null && !toVisit.contains(node.right)) {
                toVisit.push(node.right);
            }
            if (node.left != null && !visited.contains(node.left)) {
                if (!toVisit.contains(node)) {
                    toVisit.push(node);
                }
                toVisit.push(node.left);
            } else {
                order.add(node.val);
                visited.add(node);
            }
        }

        return order;
    }

    public static void postorderTraversalRecursive(TreeNode root, List<Integer> order) {
        if (root.left != null) postorderTraversalRecursive(root.left, order);
        if (root.right != null) postorderTraversalRecursive(root.right, order);
        order.add(root.val);
    }

    public static List<Integer> postorderTraversalIterative(TreeNode root) {
        List<Integer> order = new ArrayList<>();
        Stack<TreeNode> toVisit = new Stack<>();
        List<TreeNode> visited = new ArrayList<>();

        toVisit.push(root);
        while (!toVisit.empty()) {
            TreeNode node = toVisit.pop();
            if (node.left == null || visited.contains(node.left)) {
                if (node.right == null || visited.contains(node.right)) {
                    order.add(node.val);
                    visited.add(node);
                } else {
                    toVisit.push(node);
                    toVisit.push(node.right);
                }
            } else {
                if (!toVisit.contains(node) && !visited.contains(node)) toVisit.push(node);
                if (node.right != null && !visited.contains(node.right)) {
                    toVisit.push(node.right);
                }

                toVisit.push(node.left);
            }
        }

        return order;
    }

    public static void iterative() {
        TreeNode nodeA = new TreeNode("A");
        TreeNode nodeB = new TreeNode("B");
        TreeNode nodeC = new TreeNode("C");
        TreeNode nodeD = new TreeNode("D");
        TreeNode nodeE = new TreeNode("E");
        TreeNode nodeF = new TreeNode("F");
        TreeNode nodeG = new TreeNode("G");
        TreeNode nodeH = new TreeNode("H");
        TreeNode nodeI = new TreeNode("I");

        nodeF.left = nodeB;
        nodeF.right = nodeG;
        nodeB.left = nodeA;
        nodeB.right = nodeD;
        nodeD.left = nodeC;
        nodeD.right = nodeE;
        nodeG.right = nodeI;
        nodeI.left = nodeH;

        Stack<TreeNode> toVisit = new Stack<>();
        List<TreeNode> visited = new ArrayList<>();
        Map<String, Boolean> isVisited = new HashMap<>();

        TreeNode root = nodeF;

        if (root == null) return;

        // PRE
//        toVisit.push(root);
//        while (!toVisit.isEmpty()) {
//            TreeNode node = toVisit.pop();
//            visited.add(node);
//            isVisited.put(node.name, true);
//
//            if (node.right != null && isVisited.get(node.right.name) == null) {
//                toVisit.push(node.right);
//            }
//
//            if (node.left != null && isVisited.get(node.left.name) == null) {
//                toVisit.push(node.left);
//            }
//        }
//
//        for (TreeNode node : visited) {
//            System.out.println(node.name);
//        }


        // IN-order
//        toVisit.push(root);
//        while (!toVisit.isEmpty()) {
//            TreeNode node = toVisit.pop();
//
//            if(node.right != null && !toVisit.contains(node.right)) {
//                toVisit.push(node.right);
//            }
//
//            if(node.left != null) {
//                if(visited.contains(node.left)) {
//                    visited.add(node);
//                } else {
//                    toVisit.push(node);
//                    toVisit.push(node.left);
//                }
//            } else {
//                visited.add(node);
//            }
//
//        }

        // POST-order
        toVisit.push(root);
        boolean toVisitNode = false;
        while (!toVisit.isEmpty()) {
            TreeNode node = toVisit.pop();

            toVisitNode = false;
            boolean isLeftVisited = visited.contains(node.left);
            boolean isRightVisited = visited.contains(node.right);

            boolean isLeftDone = isLeftVisited || node.left == null;
            boolean isRightDone = isRightVisited || node.right == null;

            if (isLeftDone && isRightDone) {
                visited.add(node);
            } else {
                if (node.right != null) {
                    if (!isRightVisited) {
                        toVisit.push(node);
                        toVisit.push(node.right);
                        toVisitNode = true;
                    }
                }

                if (node.left != null) {
                    if (!toVisitNode) toVisit.push(node);

                    if (!isLeftVisited) {
                        toVisit.push(node.left);
                    }
                }
            }
        }

        for (TreeNode node : visited) {
            System.out.println(node.name);
        }
    }
}
