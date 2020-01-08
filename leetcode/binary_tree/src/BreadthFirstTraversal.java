import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class BreadthFirstTraversal {
    public static List<List<String>> traverse(TreeNode root) {
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

        return order;
    }
}
