/**
 * 124. Binary Tree Maximum Path Sum
 * https://leetcode.com/problems/binary-tree-maximum-path-sum/
 */

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode() {
    }

    TreeNode(int val) {
        this.val = val;
    }

    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
public class Main {
    public static void main(String[] args) {

    }

    int max = Integer.MIN_VALUE;
    public int maxPathSum(TreeNode root) {
        if(root.left == null && root.right == null) return root.val;
        goDeep(root);
        System.out.println(max);
        return max;
    }

    // Max((left+root), (right+root), root)

    /**
     * Bottom up approach. Go to the leaves. Return value of leaves for left and right. For upper nodes at each step keep the max(leftPathWithRoot, rightPathWithRoot, leftPathRootRightPath, root, leftMax, rightMax)
     * leftMax is a path in the left subtree that does not pass through root. Same for rightMax but in the right subtree
     * leftPathWithRoot is the max path from left subtree that passes through the root. Same for rightPathWithRoot
     * leftPathRootRightPath is a path that starts in the left subtree passes through the root and finishes in the right subtree
     * @param node
     * @return
     */
    public Integer goDeep(TreeNode node) {
        if(node == null) return null;
        Integer leftMax = goDeep(node.left);
        Integer rightMax = goDeep(node.right);
        System.out.println("left: " + leftMax);
        System.out.println("right: " + rightMax);

        int localMax, leftRootRight, localMaxWithRoot;

        if(leftMax == null && rightMax == null) return node.val;

        if(leftMax == null) {
            localMax = rightMax;
            leftRootRight = node.val + rightMax;
        } else if(rightMax == null) {
            localMax = leftMax;
            leftRootRight = leftMax + node.val;
        } else {
            localMax = Math.max(leftMax, rightMax);
            leftRootRight = leftMax + node.val + rightMax;
        }

        localMaxWithRoot = localMax + node.val;

        max = Math.max(max, Math.max(localMax, Math.max(leftRootRight, Math.max(localMaxWithRoot, node.val))));

        return Math.max(localMaxWithRoot, node.val);

    }
}
