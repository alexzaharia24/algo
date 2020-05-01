class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) {
        this.val = val;
    }
}
public class Main {
    public static void main(String[] args) {
        System.out.println();
    }

    public boolean isValidSequence(TreeNode root, int[] arr) {
        if(root == null) {
            if(arr.length == 0) return true;
            return false;
        }
        if(arr.length == 0) return false;

        return computeRecursive(root, arr, 0);
    }

    public boolean computeRecursive(TreeNode node, int[] arr, int currentIdx) {
        if(node.val != arr[currentIdx]) return false;
        if((node.left == null) && (node.right == null) && (currentIdx == (arr.length - 1))) return true;
        if((node.left == null) && (node.right == null)) return false;
        if(currentIdx == (arr.length - 1)) return false;
        boolean left = false, right = false;
        if(node.left != null) left = computeRecursive(node.left, arr, currentIdx+1);
        if(node.right != null) right = computeRecursive(node.right, arr, currentIdx+1);

        return left || right;
    }
}
