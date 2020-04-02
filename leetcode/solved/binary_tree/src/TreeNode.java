public class TreeNode {
    int val;
    String name;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }

    TreeNode(String x) {
        name = x;
    }

    @Override
    public String toString() {
        String str = name != null ? name : String.valueOf(val);
        return str;
    }
}
