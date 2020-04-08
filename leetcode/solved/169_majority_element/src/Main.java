import java.util.HashMap;
import java.util.Map;

/**
 * https://leetcode.com/problems/majority-element/
 */
public class Main {
    public static void main(String[] args) {

    }

    public int majorityElement(int[] nums) {
        return majorityElementWithBoyerMoore(nums);
    }

    /**
     * https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_majority_vote_algorithm
     * @param nums array of numbers
     * @return majority element if it exists, -1 otherwise
     */
    public int majorityElementWithBoyerMoore(int[] nums) {
        int majorityElement = 0;
        int count = 0;
        int n = nums.length;

        for(int x: nums) {
            if(count == 0) {
                majorityElement = x;
                count = 1;
            } else {
                if(majorityElement == x) {
                    count++;
                } else {
                    count--;
                }
            }
        }

        // Confirm that there is actually a majorityElement because the algorithm cannot guarantee in a single pass that it will return the majority element. It will only return the element with the most occurrences
        // NOT NEEDED FOR THIS PROBLEM since it is guaranteed from the problem statement that there is a majority element in the array
        count = 0;
        for(int x: nums) {
            if(majorityElement == x) {
                count++;
            }
        }
        if(count <= n/2) majorityElement = -1; // This is the case where there is no majority element in the array

        return majorityElement;
    }

    public int majorityElementWithHashMap(int[] nums) {
        if(nums.length == 1) return nums[0];
        Map<Integer, Integer> occurr= new HashMap<>();
        int n = nums.length;
        int majorityOccurr = 0;
        int majorityElem = -1;
        for(int x: nums) {
            occurr.putIfAbsent(x, 0);
            int occurrCount = occurr.get(x) + 1;
            // if(occurrCount > n/2) return x; // Stop at n/2 since that is the definition of a majority element
            occurr.put(x, occurrCount);
            if(occurrCount > majorityOccurr) {
                majorityOccurr = occurrCount;
                majorityElem = x;
            }
        }

        // for(Integer elem: occurr.keySet()) {
        //     if(occurr.get(elem) == majorityOccurr) {
        //         return elem;
        //     }
        // }

        return majorityElem;
    }
}
