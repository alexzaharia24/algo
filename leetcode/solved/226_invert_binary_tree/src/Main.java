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

        TreeNode root = new TreeNode(4);
        TreeNode n1 = new TreeNode(2);
        TreeNode n2 = new TreeNode(7);
        TreeNode n3 = new TreeNode(1);
        TreeNode n4 = new TreeNode(3);
        TreeNode n5 = new TreeNode(6);
        TreeNode n6 = new TreeNode(9);

        root.left = n1;
        root.right = n2;
        n1.left = n3;
        n1.right = n4;
        n2.left = n5;
        n2.right = n6;

        man.invertTree(root);
        System.out.println();
    }


    // Elegant solution. Official one. https://leetcode.com/problems/invert-binary-tree/solution/
    public TreeNode invertTree(TreeNode root) {
        if(root == null) return null;

        TreeNode left = invertTree(root.left);
        TreeNode right = invertTree(root.right);

        root.left = right;
        root.right = left;
        return root;
    }

    // BAD SOLUTION. FAILS ON IMPERFECT TREES
    public TreeNode invertTreeComplicated(TreeNode root) {
        if (root == null) return null;
        if (root.left == null && root.right == null) return root;
        if (root.left == null) {
            root.left = root.right;
            root.right = null;
            return root;
        }
        if (root.right == null) {
            root.right = root.left;
            root.left = null;
            return root;
        }

        invert(root.left, root.right);
        swapValue(root.left, root.right);
        return root;
    }

    public void invert(TreeNode left, TreeNode right) {
        if (left.left == null && right.right == null) return;
        else if (left.left == null) {
            left.left = new TreeNode(right.right.val);
            right.right = null;
        } else if (right.right == null) {
            right.right = new TreeNode(left.left.val);
            left.left = null;
        } else {
            swapValue(left.left, right.right);
        }


        if (left.right == null && right.left == null) return;
        else if (left.right == null) {
            left.right = new TreeNode(right.left.val);
            right.left = null;
        } else if (right.left == null) {
            right.left = new TreeNode(left.right.val);
            left.right = null;
        } else {
            swapValue(left.right, right.left);
        }

        invert(left.left, right.right);
        invert(left.right, right.left);


    }

    public void swapValue(TreeNode left, TreeNode right) {
        int aux = left.val;
        left.val = right.val;
        right.val = aux;
    }

}
