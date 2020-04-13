import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * https://leetcode.com/problems/contiguous-array/
 */
public class Main {
    public static void main(String[] args) {
        Main man = new Main();

        int[] nums = new int[]{0,1,0,1};
        System.out.println(man.findMaxLength(nums));
        System.out.println();
    }

    public int findMaxLength(int[] nums) {
        return findMaxLengthLinearWithMapOfCounts(nums);
    }
    /**
     * Inspiration: https://leetcode.com/problems/contiguous-array/solution/
     * @param nums
     * @return
     */
    public int findMaxLengthLinearWithMapOfCounts(int[] nums) {
        int maxLength = 0;
        Map<Integer, Integer> counts = new HashMap<>();
        int count = 0;
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            count = nums[i] == 0 ? count - 1 : count + 1;
            if (count == 0) {
                maxLength = i+1;
            } else {
                if (counts.get(count) == null) {
                    counts.put(count, i);
                } else {
                    maxLength = Math.max(maxLength, i - counts.get(count));
                }
            }
        }

        return maxLength;
    }

    /**
     * Inspiration: https://leetcode.com/problems/contiguous-array/solution/
     *
     * @param nums
     * @return
     */
    public int findMaxLengthLinearWithArrayOfCounts(int[] nums) {
        int maxLength = 0;
        int n = nums.length;
        int count = 0;
        int[] counts = new int[2 * n + 1]; // Possible values from -n (all 0s, -n at i=0) to n (all 1s, n at i=2n) for count. (0 at i=n)
        Arrays.fill(counts, -1); // Mark all as unvisited
        counts[n] = 0; // Mark 0th count as visited since if there is an equal number of 0s and 1s in the array then 0 will be visited only once. We need to force the first visit so we can deduce the length in this special case.
        for (int i = 0; i < n; i++) {
            if (nums[i] == 0) {
                count--;
            } else count++;
            if (counts[count + n] >= 0) {
                // visited before
                int lengthOfSegmentBetweenOccurrences;
                if (count == 0) { // count[n] is always 0 => the segment until i-th index inclusive has equal number of 0s and 1s => i+1 elements
                    lengthOfSegmentBetweenOccurrences = i + 1;
                } else { // compute the length btw current occurrence index and the first index
                    lengthOfSegmentBetweenOccurrences = i - counts[count + n];
                }
                maxLength = Math.max(maxLength, lengthOfSegmentBetweenOccurrences);
                // keep the index of the first occurrence in counts
            } else {
                // first visit
                counts[count + n] = i;
            }
        }

        return maxLength;
    }

    public int findMaxLengthLinear(int[] nums) {
        int maxLength = 0;
        int len = 0;
        int diff = 0;
        for (int x : nums) {
            if (x == 0) {
                diff--;
            } else diff++;
            len++;
            if (diff == 0) {
                if (len > maxLength) {
                    maxLength = len;

                }
            }
        }

        return maxLength;
    }

    public int findMaxLengthBruteForce(int[] nums) {
        int maxLength = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            int len = 0;
            int diff = 0; // Difference btw 1s and 0s
            for (int j = i; j < nums.length; j++) {
                if (nums[j] == 1) {
                    diff++;
                } else diff--;
                len++;
                if (diff == 0) {
                    if (len > maxLength) maxLength = len;
                }
            }
        }
        return maxLength;
    }

}
