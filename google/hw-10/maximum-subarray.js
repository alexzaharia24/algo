// https://leetcode.com/problems/maximum-subarray/

function maxSubArray(nums) {
    return maxSubArrayDP(nums);
}

function maxSubArrayLinear(nums) {
    // Time: O(n)
    // Space: O(1)
    let currentSum = nums[0];
    let max = currentSum;
    for (let i = 1; i < nums.length; i++) {
        if (currentSum < 0) {
            currentSum = nums[i];
        }
        else {
            currentSum += nums[i];
        }
        max = Math.max(max, currentSum);
    }
    return max;
}

function maxSubArrayDP(nums) {
    // Time: O(n)
    // Space: O(n) memoisation
    // DP:  dp[i] - maximal sum of the subarray ending in i
    //      dp[i] = max sum of previous subarray + current element or the current element
    let dp = new Array(nums.length).fill(0);
    dp[0] = nums[0];
    let globalMax = dp[0];
    for (let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
        globalMax = Math.max(globalMax, dp[i]);
    }
    return globalMax
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
console.log(maxSubArray([1]))