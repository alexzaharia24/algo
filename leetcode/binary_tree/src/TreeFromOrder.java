import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TreeFromOrder {
    public static void run() {
        createTreeFromOrder();
    }

    public static void createTreeFromOrder() {
        int[] inorder = {9, 3, 15, 20, 7};
        int[] postorder = {9, 15, 7, 20, 3};
        int[] preorder = {3, 9, 20, 15, 7};

        List<Integer> inOrder = new ArrayList<>();
        List<Integer> postOrder = new ArrayList<>();
        List<Integer> preOrder = new ArrayList<>();

        for (int val : inorder) {
            inOrder.add(val);
        }
        for (int val : postorder) {
            postOrder.add(val);
        }
        for (int val : preorder) {
            preOrder.add(val);
        }

//        TreeNode root = createTreeFromInAndPostOrder(inOrder, postOrder);
        TreeNode root = createTreeFromInAndPreOrder(inOrder, preOrder);
        BinaryTreeUtils.printOrder(root, "in");
    }

    public static TreeNode createTreeFromInAndPostOrder(List<Integer> inOrder, List<Integer> postOrder) {
        int postOrderRootIndex = postOrder.size() - 1;

        if (inOrder.isEmpty() || postOrder.isEmpty()) return null;
        if (inOrder.size() == 1) return new TreeNode(inOrder.get(0));
        if (postOrder.size() == 1) return new TreeNode(postOrder.get(0));

        TreeNode root = new TreeNode(postOrder.get(postOrderRootIndex));

        int inOrderRootIndex = inOrder.indexOf(root.val);
        if (inOrderRootIndex == -1) return null;

        List<Integer> inOrderLeftSubtree = inOrder.subList(0, inOrderRootIndex);
        List<Integer> inOrderRightSubtree = inOrder.subList(inOrderRootIndex + 1, inOrder.size());

        List<Integer> postOrderLeftSubtree = postOrder.subList(0, inOrderLeftSubtree.size());
        List<Integer> postOrderRightSubtree = postOrder.subList(inOrderLeftSubtree.size(), postOrderRootIndex);

        root.left = createTreeFromInAndPostOrder(inOrderLeftSubtree, postOrderLeftSubtree);
        root.right = createTreeFromInAndPostOrder(inOrderRightSubtree, postOrderRightSubtree);

        return root;
    }

    public static TreeNode createTreeFromInAndPreOrder(List<Integer> inOrder, List<Integer> preOrder) {
        int preOrderRootIndex = 0;

        if (inOrder.isEmpty() || preOrder.isEmpty()) return null;
        if (inOrder.size() == 1) return new TreeNode(inOrder.get(0));
        if (preOrder.size() == 1) return new TreeNode(preOrder.get(0));

        TreeNode root = new TreeNode(preOrder.get(preOrderRootIndex));

        int inOrderRootIndex = inOrder.indexOf(root.val);
        if (inOrderRootIndex == -1) return null;

        List<Integer> inOrderLeftSubtree = inOrder.subList(0, inOrderRootIndex);
        List<Integer> inOrderRightSubtree = inOrder.subList(inOrderRootIndex + 1, inOrder.size());

        List<Integer> postOrderLeftSubtree = preOrder.subList(1, inOrderLeftSubtree.size() + 1);
        List<Integer> preOrderRightSubtree = preOrder.subList(inOrderLeftSubtree.size() + 1, preOrder.size());

        root.left = createTreeFromInAndPostOrder(inOrderLeftSubtree, postOrderLeftSubtree);
        root.right = createTreeFromInAndPostOrder(inOrderRightSubtree, preOrderRightSubtree);

        return root;
    }
}
