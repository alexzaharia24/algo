import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

enum Validity {
    BAD, UNKNOWN
}

class Pair<K, V> {
    public K key;
    public V value;

    Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    @Override
    public String toString() {
        return key + "," + value;
    }
}

public class Main {
    public static void main(String[] args) {
        Main mn = new Main();

        int[] nums = new int[]{2, 3, 1, 1, 4};
//        int[] nums = new int[]{2, 0, 6, 9, 8, 4, 5, 0, 8, 9, 1, 2, 9, 6, 8, 8, 0, 6, 3, 1, 2, 2, 1, 2, 6, 5, 3, 1, 2, 2, 6, 4, 2, 4, 3, 0, 0, 0, 3, 8, 2, 4, 0, 1, 2, 0, 1, 4, 6, 5, 8, 0, 7, 9, 3, 4, 6, 6, 5, 8, 9, 3, 4, 3, 7, 0, 4, 9, 0, 9, 8, 4, 3, 0, 7, 7, 1, 9, 1, 9, 4, 9, 0, 1, 9, 5, 7, 7, 1, 5, 8, 2, 8, 2, 6, 8, 2, 2, 7, 5, 1, 7, 9, 6};
        System.out.println(mn.canJump(nums));
    }

    public boolean canJump(int[] nums) {
        return this.canJumpOnePass(nums);

    }

    public boolean canJumpBacktrackWithMemo(int[] nums) { // O(n*something) - TLE
        // Backtracking solution with memoization for BAD positions. A position is BAD if it doesn't lead to the last element
        if (nums.length == 0) return false;
        if (nums.length == 1) return true;

        List<Validity> positionValidity = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            positionValidity.add(Validity.UNKNOWN);
        }

        Stack<Pair<Integer, Integer>> currentJump = new Stack<>();
        currentJump.push(new Pair<>(0, nums[0]));
        while (currentJump.size() > 0) {
            Pair<Integer, Integer> jump = currentJump.pop();
            if (jump.key == nums.length - 1) return true;
            if (jump.value == 0) positionValidity.set(jump.key, Validity.BAD);
            if (positionValidity.get(jump.key) == Validity.BAD) continue;
            if (jump.value > 0) {
                for (int i = jump.key + 1; i < nums.length && i < jump.value + jump.key + 1; i++) {
                    currentJump.push(new Pair<>(i, nums[i]));
                }
            }
        }

        return false;
    }

    public boolean canJumpOnePass(int[] nums) {
        int target = nums.length - 1;
        for (int i = nums.length - 1; i >= 0; i--) {
            if (i + nums[i] >= target) {
                target = i;
            }
        }

        return target == 0;
    }
}
