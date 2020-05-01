// Definition for a binary tree node.
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

/**
 * https://leetcode.com/explore/challenge/card/30-day-leetcoding-challenge/530/week-3/3305/
 */
public class Main {
    public static void main(String[] args) {
        Main man = new Main();
        int[] preorder = new int[]{8, 5, 1, 7, 10, 12};

        TreeNode bst = man.bstFromPreorder(preorder);
        System.out.println();
    }

    public TreeNode bstFromPreorder(int[] preorder) {
        return constructTree(preorder, 0, preorder.length);
    }

    public TreeNode constructTree(int[] preorder, int start, int end) {
        if(start >= preorder.length || start >= end) return null;
        TreeNode node = new TreeNode(preorder[start]);
        int firstBigger = getFirstBiggger(preorder,start, end);
        TreeNode left = null, right = null;
        if(firstBigger == -1) {
            // only smaller elements to the right
            left = constructTree(preorder, start+1, end);
        }
        else {
            // both smaller and bigger elements to the right
            left = constructTree(preorder, start+1, firstBigger);
            right = constructTree(preorder, firstBigger, end);
        }

        node.left = left;
        node.right = right;

        return node;
    }

    public int getFirstBiggger(int[] arr, int start, int end) {
        for(int i=start+1; i<end; i++) {
            if(arr[i] > arr[start]) return i;
        }
        return -1;
    }

    public TreeNode constructBST(int[] preorder) {
        TreeNode head = new TreeNode(preorder[0]);
        nextBranch(preorder, 1, preorder.length, head);
        return head;
    }

    public void nextBranch(int[] preorder, int start, int finish, TreeNode node) {
        int firstBigger = getFirstBigger(preorder, start, finish);
        if(firstBigger != -1) {

        }
    }

    public int getFirstBigger(int[] preorder, int start, int finish) {
        int idx = -1;
        int max = preorder[start];
        for (int i = start + 1; i < finish; i++) {
            if (preorder[i] > max) {
                max = preorder[i];
                idx = i;
            }
        }

        return idx;
    }
}
