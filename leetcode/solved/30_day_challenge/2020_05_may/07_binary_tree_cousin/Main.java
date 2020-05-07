import java.util.LinkedList;
import java.util.Queue;

class TreeNode {
    int val;
    TreeNode left, right;

    TreeNode(int val) {
        this.val = val;
    }

    public String toString() {
        return this.val + "";
    }
}

public class Main {
    int depth1 = -1, depth2 = -1;
    TreeNode parent1, parent2;

    public static void main(String[] args) {
        Main man = new Main();
        TreeNode n1 = new TreeNode(1);
        TreeNode n2 = new TreeNode(2);
        TreeNode n3 = new TreeNode(3);
        TreeNode n4 = new TreeNode(4);
        TreeNode n5 = new TreeNode(5);
        TreeNode n6 = new TreeNode(6);

        n1.left = n2;
        n1.right = n3;
        n2.left = n4;
        n3.right = n5;

        System.out.println(man.isCousins(n1, 3, 5));
    }

    public boolean isCousins(TreeNode root, int x, int y) {
        if (root.val == x || root.val == y)
            return false;
        // dfs(root, x, y, 0);
        bfs(root, x, y);
        return (depth1 == depth2 && parent1.val != parent2.val);
        // depth start from 0
    }

    public void dfs(TreeNode root, int x, int y, int depth) {
        if (depth1 != -1 && depth2 != -1)
            return;
        if (root != null) {
            if (root.left != null) {
                if (root.left.val == x) {
                    depth1 = depth + 1;
                    parent1 = root;
                } else if (root.left.val == y) {
                    depth2 = depth + 1;
                    parent2 = root;
                }
            }
            if (root.right != null) {
                if (root.right.val == x) {
                    depth1 = depth + 1;
                    parent1 = root;
                } else if (root.right.val == y) {
                    depth2 = depth + 1;
                    parent2 = root;
                }
            }

            dfs(root.left, x, y, depth + 1);
            dfs(root.right, x, y, depth + 1);
        }
    }

    public void bfs(TreeNode root, int x, int y) {
        Queue<TreeNode> toVisit = new LinkedList<>();
        toVisit.add(root);

        int depth = 0;
        while (!toVisit.isEmpty()) {
            int currentLevelSize = toVisit.size();

            for (int i = 0; i < currentLevelSize; i++) {
                TreeNode node = toVisit.remove();
                if(node != null) {
                    if(node.left != null) {
                        if(node.left.val == x) {
                            depth1 = depth;
                            parent1 = node; 
                        } else if(node.left.val == y) {
                            depth2 = depth;
                            parent2 = node;
                        }

                        toVisit.add(node.left);
                    }
                    if(node.right != null) {
                        if(node.right.val == x) {
                            depth1 = depth;
                            parent1 = node; 
                        } else if(node.right.val == y) {
                            depth2 = depth;
                            parent2 = node;
                        }
                    }

                    toVisit.add(node.right);
                }
            }

            if(depth1 != -1 && depth2!= -1) break;

            depth++;
        }
    }
}