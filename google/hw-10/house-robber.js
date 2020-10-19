// https://leetcode.com/problems/house-robber/

function rob(nums) {
    return robIterative(nums);
}

function robRecursive(nums) {
    let memory = {};
    return Math.max(dfs(nums, 0, memory), dfs(nums, 1, memory));
}

function dfs(nums, idx, memory) {
    // Time: O(n) - there are some overlapping calls but they will be performed in O(1) due to memoization
    // Space: O(n) - memoization + recursion stack
    if (idx >= nums.length) return 0;

    let plus2 = memory[idx + 2] ?? dfs(nums, idx + 2, memory);
    let plus3 = memory[idx + 3] ?? dfs(nums, idx + 3, memory);

    memory[idx] = Math.max(nums[idx] + plus2, nums[idx] + plus3);
    return memory[idx];
}

function robIterative(nums) {
    // dp[i] = max nr of money stolen from the houses sequence that ends in house i
    // dp[i] = max btw dp[i-2] + nums[i] and dp[i-3] + nums[i]
    // Works for maximizing with negative numbers as well.

    if (nums.length === 0) return 0;
    let dp = new Array(nums.length).fill();
    let max = 0;
    for (let i = 0; i < nums.length; i++) {
        dp[i] = Math.max(max, (nums[i] + dp[i - 2]) || nums[i]);
        max = Math.max(max, dp[i]);
    }
    return max;
}

console.log(rob([1, -6,-7, -5, 2, 3, 1]))
console.log(rob([2, 7, 9, 3, 1]))