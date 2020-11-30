// https://leetcode.com/problems/jump-game-ii/

function jump(nums) {
    // Time: O(n^2)
    // Space: O(n)
    // dp[i] = length of min path from beginning to position i
    // dp[i+1] = Math.min(dp[i] + 1, dp[i]) if dp[i] !== Inf

    let dp = new Array(nums.length).fill(Infinity);
    dp[0] = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        if (dp[i] !== Infinity) { // this position can be reached
            for (let j = i + 1; (j <= i + nums[i]) && j < nums.length; j++) {
                dp[j] = Math.min(dp[i] + 1, dp[j]);
            }
        }
    }
    return dp[nums.length - 1];
}

console.log(jump([2,3,1,1,4]));