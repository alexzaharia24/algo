import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class LowestCommonAncestor {
    public static void run() {

    }

    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {

    }

    public static List<TreeNode> findPathToNode(TreeNode root, TreeNode node) {
        List<TreeNode> path = new ArrayList<>();



        return path;
    }

    public static TreeNode goDeep(TreeNode root, TreeNode node, Stack<TreeNode> path) {
        if(root == null) return null;
        if(root == node) return node;

        if(root.left != null) {
            TreeNode leftResult = goDeep(root.left, node, path);
            if(leftResult != null) {
                path.push(leftResult);
                return root;
            }
        }

        if(root.left != null) {
            TreeNode leftResult = goDeep(root.left, node, path);
            if(leftResult != null) {
                path.push(leftResult);
            }
        }

    }
}
