// https://leetcode.com/problems/predict-the-winner/

function PredictTheWinner(nums) {
    let totalPoints = 0;
    for (let i = 0; i < nums.length; i++) {
        totalPoints += nums[i];
    }
    let currentPlayer = false; // false - Player 1, true - playerTwo
    let dp = new Array(nums.length).fill().map(() => new Array(nums.length).fill(0)); // dp[start][end] = the max points that can be obtained from this subset [start...end]

    dfs(0, nums.length - 1, nums, dp, false);
    return dp[0]
    console.log(totalPoints);
}

function dfs(start, end, nums, dp) {

}


