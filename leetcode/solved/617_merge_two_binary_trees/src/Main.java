class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int val) {
        this.val = val;
    }

    @Override
    public String toString() {
        return val + "";
    }
}

public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        TreeNode t1 = new TreeNode(1);
        TreeNode t1_1 = new TreeNode(3);
        TreeNode t1_2 = new TreeNode(2);
        TreeNode t1_3 = new TreeNode(5);
        t1.left = t1_1;
        t1.right = t1_2;
        t1_1.left = t1_3;

        TreeNode t2 = new TreeNode(2);
        TreeNode t2_1 = new TreeNode(1);
        TreeNode t2_2 = new TreeNode(3);
        TreeNode t2_3 = new TreeNode(4);
        TreeNode t2_4 = new TreeNode(7);
        t2.left = t2_1;
        t2.right = t2_2;
        t2_1.right = t2_3;
        t2_2.right = t2_4;

        man.mergeTrees(t1, t2);
        System.out.println();

    }

    public TreeNode mergeTrees(TreeNode t1, TreeNode t2) {
        if (t1 == null) return t2;
        if (t2 == null) return t1;

        TreeNode result = t1;
        result.val = result.val + t2.val;
        addToTree(result, t2);

        return result;
    }

    public void addToTree(TreeNode result, TreeNode t) {
        if (t == null) return;
        if (result.left == null) result.left = t.left;
        else {
            if (t.left != null) {
                result.left.val = result.left.val + t.left.val;
                addToTree(result.left, t.left);
            }
        }

        if (result.right == null) result.right = t.right;
        else {
            if (t.right != null) {
                result.right.val = result.right.val + t.right.val;
                addToTree(result.right, t.right);
            }
        }
    }
}
