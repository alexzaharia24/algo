public class Main {
    public static void main(String[] args) {
        Main man = new Main();

    }

    public int maxSubArray(int[] nums) {
        if(nums.length == 1) return nums[0];
        int sum = nums[0];
        int maxSum = nums[0];
        for(int i=1; i<nums.length; i++) {
            int stepSum = sum + nums[i]; // equiv with sum < 0
            if(nums[i] > stepSum) { // If you find a number bigger than the current sum + the number then replace the current sum.
                sum = nums[i];
            } else {
                sum = stepSum; // Add the number to increase the current sum
            }
            if(sum > maxSum) {
                maxSum = sum;
            }
        }
        return maxSum;
    }
}
