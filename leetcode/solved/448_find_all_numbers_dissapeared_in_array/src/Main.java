import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 448. Find All Numbers Disappeared in an Array
 * https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/
 */
public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        int[] nums = new int[]{4, 3, 2, 7, 8, 2, 3, 1};
        System.out.println(man.findDisappearedNumbers(nums));
    }

    public List<Integer> findDisappearedNumbers(int[] nums) {

        return findDisappearedNoExtraMemory(nums);
    }

    /**
     * Inspiration: https://medium.com/@Zack123456/448-find-all-numbers-disappeared-in-an-array-3e3f764b3989
     *
     * @param nums
     * @return
     */
    public List<Integer> findDisappearedNoExtraMemory(int[] nums) {
        List<Integer> result = new ArrayList<>();

        for (int i = 0; i < nums.length; i++) {
            int indexValue = Math.abs(nums[i]) - 1; // Get the index represented by this value. It could be negative because we will negate the appearing values, so take the absolute value
            nums[indexValue] = -Math.abs(nums[indexValue]); // Negate the value at indexValue because that means value indexValue appears. Negate the absolute value so we don't negate twice thus always keeping a negative value if the number appears
        }

        for (int i = 0; i < nums.length; i++) { // Go through the array and if a value > 0 then it means value i+1 (since we want from 1 to n) does not appear
            if (nums[i] > 0) {
                result.add(i+1);
            }
        }

        return result;
    }

    public List<Integer> solveWithSet(int[] nums) {
        Set<Integer> occurr = new HashSet<Integer>();
        int n = nums.length;
        for (int x : nums) {
            occurr.add(x);
        }

        List<Integer> result = new ArrayList<>();

        for (int i = 1; i <= n; i++) {
            if (!occurr.contains(i)) {
                result.add(i);
            }
        }

        return result;
    }

    public List<Integer> solveWithOccurrArray(int[] nums) {
        int n = nums.length;
        int[] occurr = new int[n + 1];
        List<Integer> result = new ArrayList<>();
        for (int x : nums) {
            occurr[x]++;
        }

        for (int i = 1; i < occurr.length; i++) {
            if (occurr[i] == 0) {
                result.add(i);
            }
        }

        return result;
    }
}
