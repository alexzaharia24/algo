import java.util.Stack;

public class PathSum {
    public static void run() {
        runHasPathSum();
    }

    static Stack<Integer> lastValidPath = new Stack<>();

    public static boolean hasPathSum(TreeNode node, int currentSum, int targetSum) {
        currentSum += node.val;
        if (node.left == null && node.right == null) {
            if (currentSum == targetSum) return true;
        }

        boolean leftValue = node.left != null && hasPathSum(node.left, currentSum, targetSum);
        boolean rightValue = node.right != null && hasPathSum(node.right, currentSum, targetSum);
        return leftValue || rightValue;
    }

    public static boolean hasPathSumImproved(TreeNode node, int targetSum) {
        targetSum -= node.val;
        if (node.left == null && node.right == null) {
            return targetSum == 0;
        }

        boolean leftValue = node.left != null && hasPathSumImproved(node.left, targetSum);
        boolean rightValue = node.right != null && hasPathSumImproved(node.right, targetSum);
        return leftValue || rightValue;
    }

    public static boolean hasPathSumWithTrace(TreeNode node, int targetSum, Stack<Integer> trace) {
        targetSum -= node.val;
        trace.push(node.val);

        if (node.left == null && node.right == null) {
            if (targetSum == 0) {
                lastValidPath.removeAllElements();
                PathSum.lastValidPath.addAll(trace);
                trace.pop();

                return true;
            }
            trace.pop();
            return false;
        }

        boolean leftValue = node.left != null && hasPathSumWithTrace(node.left, targetSum, trace);

        boolean rightValue = node.right != null && hasPathSumWithTrace(node.right, targetSum, trace);
        trace.pop();

        return leftValue || rightValue;
    }


    public static void runHasPathSum() {
        TreeNode root = new TreeNode(5);
        TreeNode node1 = new TreeNode(4);
        TreeNode node2 = new TreeNode(8);
        TreeNode node3 = new TreeNode(11);
        TreeNode node4 = new TreeNode(13);
        TreeNode node5 = new TreeNode(4);
        TreeNode node6 = new TreeNode(7);
        TreeNode node7 = new TreeNode(2);
        TreeNode node8 = new TreeNode(5);

        root.left = node1;
        root.right = node2;
        node1.left = node3;
        node1.right = node4;
        node2.right = node5;
        node3.left = node6;
        node3.right = node7;
        node5.right = node8;

        int targetSum = 22;
//        System.out.println("For sum " + targetSum + ": " + hasPathSum(root, 0, targetSum));
//        System.out.println("For sum " + targetSum + ": " + hasPathSumImproved(root, targetSum));
        System.out.println("For sum " + targetSum + ": " + hasPathSumWithTrace(root, targetSum, new Stack<>()));
        while (!lastValidPath.isEmpty()) {
            System.out.print(lastValidPath.pop() + " ");
        }
    }
}
