import java.util.*;

public class SymmetricBinaryTree {
    public static void run() {
        test2();
    }

    public static void test2() {
        // Asymmetric tree

        TreeNode root = new TreeNode(1);
        TreeNode node1 = new TreeNode(2);
        TreeNode node2 = new TreeNode(2);
        TreeNode node3 = new TreeNode(3);
        TreeNode node4 = new TreeNode(3);


        root.left = node1;
        root.right = node2;

        node1.right = node3;
        node2.right = node4;

        // System.out.println(isTreeSymmetricIterative(root));
        System.out.println(isTreeSymmetricRecursive(root));
    }

    public static void test1() {
        // Symmetric tree
        TreeNode root = new TreeNode(1);
        TreeNode node1 = new TreeNode(2);
        TreeNode node2 = new TreeNode(2);
        TreeNode node3 = new TreeNode(3);
        TreeNode node4 = new TreeNode(3);
        TreeNode node5 = new TreeNode(4);
        TreeNode node6 = new TreeNode(4);


        root.left = node1;
        root.right = node2;

        node1.left = node3;
        node1.right = node5;
        node2.left = node6;
        node2.right = node4;

//        System.out.println(isTreeSymmetricIterative(root));
        System.out.println(isTreeSymmetricRecursive(root));
    }

    public static boolean isTreeSymmetricRecursive(TreeNode root) {
        if (root == null) return true;
        return goDeep(root.left, root.right);
    }

    public static boolean goDeep(TreeNode node1, TreeNode node2) {
        if (node1 == null && node2 == null) return true;
        if (node1 == null || node2 == null) return false;
        if (node1.val == node2.val) {
            return goDeep(node1.left, node2.right) && goDeep(node1.right, node2.left);
        }
        return false;
    }

    public static boolean isTreeSymmetricIterative(TreeNode root) {
        // Used a BFT with level comparison of nodes
        Queue<TreeNode> toVisit = new LinkedList<>();
        List<TreeNode> levelNodes;

        if (root != null) toVisit.add(root);

        while (!toVisit.isEmpty()) {
            int queueSize = toVisit.size();
            levelNodes = new ArrayList<>();
            while (queueSize > 0) {
                TreeNode node = toVisit.remove();

                if (node.left != null) toVisit.add(node.left);
                levelNodes.add(node.left);

                if (node.right != null) toVisit.add(node.right);
                levelNodes.add(node.right);

                queueSize--;
            }

//            printNodes(levelNodes);
//            System.out.println(isLevelSymmetric(levelNodes));
//            System.out.println();
            if (!isLevelSymmetric(levelNodes)) return false;
        }
        return true;
    }

    public static void printNodes(List<TreeNode> nodes) {
        for (TreeNode node : nodes) {
            System.out.print(node + " ");
        }
    }

    public static boolean isLevelSymmetric(List<TreeNode> nodes) {
        int middle = nodes.size() / 2;
        int length = nodes.size();
        for (int i = 0; i < middle; i++) {
            TreeNode firstNode = nodes.get(i);
            TreeNode secondNode = nodes.get(length - i - 1);
            if (firstNode == null && secondNode == null) continue;
            if (firstNode == null || secondNode == null) {
                return false;
            }
            if (firstNode.val != secondNode.val) {
                return false;
            }
        }
        return true;
    }
}
