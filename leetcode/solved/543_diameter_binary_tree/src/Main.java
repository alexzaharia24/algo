class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int val) {
        this.val = val;
    }

    @Override
    public String toString() {
        return this.val + "";
    }
}

/**
 * https://leetcode.com/problems/diameter-of-binary-tree/
 */
public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        TreeNode root = new TreeNode(1);
        TreeNode node2 = new TreeNode(2);
        TreeNode node3 = new TreeNode(3);
        TreeNode node4 = new TreeNode(4);
        TreeNode node5 = new TreeNode(5);
        TreeNode node6 = new TreeNode(6);
        TreeNode node7 = new TreeNode(7);
        TreeNode node8 = new TreeNode(8);
        TreeNode node9 = new TreeNode(9);

        root.left = node2;
        root.right = node3;
        node2.left = node4;
        node2.right = node5;
        node4.left = node6;
        node5.right = node7;
        node6.left = node8;
        node7.right = node9;

        System.out.println(man.heightOfTree(root));
        System.out.println(man.diameterOfBinaryTree(root));

    }

    public int diameterOfBinaryTree(TreeNode root) {
        if(root == null) return 0;
        int heightLeft = heightOfTree(root.left);
        int heightReight = heightOfTree(root.right);
        return Math.max(heightLeft+heightReight, Math.max(diameterOfBinaryTree(root.left), diameterOfBinaryTree(root.right)));
    }

    public int heightOfTree(TreeNode node) {
        if (node == null) return 0;
        return 1 + Math.max(heightOfTree(node.left), heightOfTree(node.right));
    }
}
