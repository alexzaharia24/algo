// https://leetcode.com/problems/predict-the-winner/

function PredictTheWinner(nums) {
    let totalPoints = 0;
    for (let i = 0; i < nums.length; i++) {
        totalPoints += nums[i];
    }
    let currentPlayer = false; // false - Player 1, true - playerTwo
    // let dp = new Array(nums.length).fill().map(() => new Array(nums.length).fill(0)); // dp[start][end] = the max points that can be obtained from this subset [start...end]

    // dfs(0, nums.length - 1, nums, dp, false);

    let maxPoints = dfs(0, nums.length-1, nums); 
    return  totalPoints - maxPoints <= maxPoints;
}

function dfs(start, end, nums) {
    if(start > end) return 0;
    let points = 0;
    let frontPoints = nums[start] + dfs(start+1, end, nums);
    let backPoints = nums[end] + dfs(start, end-1, nums);

}


