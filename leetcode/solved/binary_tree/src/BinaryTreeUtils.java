import com.sun.source.tree.Tree;

import java.util.ArrayList;
import java.util.List;

public class BinaryTreeUtils {
    public static void getPreOrder(TreeNode root, List<TreeNode> order) {
        if (order == null) {
            order = new ArrayList<>();
        }

        if (root != null) {
            order.add(root);
            getPreOrder(root.left, order);
            getPreOrder(root.right, order);
        }
    }

    public static void getInOrder(TreeNode root, List<TreeNode> order) {
        if (order == null) {
            order = new ArrayList<>();
        }

        if (root != null) {
            getInOrder(root.left, order);
            order.add(root);
            getInOrder(root.right, order);
        }
    }

    public static void getPostOrder(TreeNode root, List<TreeNode> order) {
        if (order == null) {
            order = new ArrayList<>();
        }

        if (root != null) {
            getPostOrder(root.left, order);
            getPostOrder(root.right, order);
            order.add(root);
        }
    }

    public static void printOrder(TreeNode root, String mode) {
        List<TreeNode> order = new ArrayList<>();
        switch (mode) {
            case "pre":
                getPreOrder(root, order);
                break;
            case "in":
                getInOrder(root, order);
                break;
            case "post":
                getPostOrder(root, order);
                break;
        }

        for(TreeNode node: order) {
            System.out.print(node.val + " ");
        }
    }
}
