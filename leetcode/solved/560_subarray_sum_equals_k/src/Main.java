import java.util.HashMap;
import java.util.Map;

/**
 * https://leetcode.com/problems/subarray-sum-equals-k/
 */
public class Main {
    public static void main(String[] args) {

    }

    public int subarraySum(int[] nums, int k) {
        return linearWithHashMapOfOccurrencesOfSums(nums, k);
    }

    /**
     * Solution from https://leetcode.com/problems/subarray-sum-equals-k/solution/
     * Keep in a map pairs of key value in which key = sum[i] and value = number of occurrences of the sum. sum[i] is the sum from index = 0 to i inclusive
     * At each step j we perform difference = sum[j] - k. The logic is from s[j] - s[i] = k => there is a k sum between i and j, i exclusive. We search for "difference" in map and if we find it we add to total number of k-sums the number of occurrences of "difference".
     * @param nums
     * @param k
     * @return
     */
    public int linearWithHashMapOfOccurrencesOfSums(int[] nums, int k) {
        int totalNumber = 0;
        int n = nums.length;
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1); // For case nums[i] = k or currentSum - k = 0
        int currentSum = 0;
        for(int i=0; i<n; i++)  {
            currentSum += nums[i];

            int difference = currentSum - k; // Look for s[i] = s[j] - k
            if(map.get(difference) != null) {
                totalNumber+=map.get(difference);
            }

            map.putIfAbsent(currentSum, 0);
            map.put(currentSum, map.get(currentSum) + 1);

        }
        return totalNumber;
    }

    // Slow version
    public int bruteForceQuadraticArrayOfSumFromBeginning(int[] nums, int k) {
        int totalNumber = 0;
        int n = nums.length;
        int[] sumFromBeginning = new int[n];
        int sum = 0;
        for(int i=0; i<n ;i++) {
            sum += nums[i];
            sumFromBeginning[i] = sum;
        }


        for(int i=0; i<n; i++) {
            for(int j=i; j<n; j++) {
                int currentSum = sumFromBeginning[j] - sumFromBeginning[i] + nums[i];
                if(currentSum == k) {
                    totalNumber++;
                }
            }
        }

        return totalNumber;
    }

    // Cumulative sum
    public int bruteForceQuadratic(int[] nums, int k) {
        int totalNumber = 0;
        int n = nums.length;
        for(int i=0; i<n; i++) {
            int currentSum = 0;
            for(int j=i; j<n; j++) {
                currentSum += nums[j];
                if(currentSum == k) {
                    totalNumber++;
                }
            }
        }

        return totalNumber;
    }
}
