class TreeNode {
    TreeNode left;
    TreeNode right;
    int val;
    TreeNode(int val) {
        this.val = val;
    }
}

// [9,-42,-42,null,76,76,null,null,13,null,13]

public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        TreeNode root = new TreeNode(1);
        TreeNode node2Left = new TreeNode(2);
        TreeNode node2Right = new TreeNode(2);
        TreeNode node3Left = new TreeNode(3);
        TreeNode node3Right = new TreeNode(3);
        TreeNode node4Left = new TreeNode(4);
        TreeNode node4Right = new TreeNode(4);

        root.left = node2Left;
        root.right = node2Right;
        node2Left.left = node3Left;
        node2Left.right = node4Right;
        node2Right.left = node4Left;
        node2Right.right = node3Right;

        System.out.println(man.isSymmetric(root));
    }

    public boolean isSymmetric(TreeNode root) {
        if(root == null) return true;
        if(root.left == null && root.right == null) return true;

        return verify(root.left, root.right);
    }

    public boolean verify(TreeNode left, TreeNode right) {
        if(left == null || right == null) return left == right;
        if(left.left == null && right.right == null && left.right == null && right.left == null) return left.val == right.val;
        return verify(left.left, right.right) && verify(left.right, right.left) && left.val == right.val;
    }
}
