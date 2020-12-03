// https://leetcode.com/problems/predict-the-winner/

function PredictTheWinner(nums) {
    return PredictTheWinnerDPIterative(nums);
}

function PredictTheWinnerDPIterative(nums) {
    // Time: O(n^2), n=length of nums
    // Space: O(n^2)
    let dp = new Array(nums.length).fill().map(() => new Array(nums.length).fill());

    // Base case, one number intervals
    for (let i = 0; i < nums.length; i++) {
        dp[i][i] = nums[i];
    }
    // Next we need to iterate intervals in increasing order of elements, first with 2 elements then with 3 elements and so on. The reason is: dp[i][j] = number[start or front] - dp[i+1 or i][j or j-1], which is a smaller interval, so it needs to already have a value when it is used.
    for (let sizeOfInterval = 2; sizeOfInterval <= nums.length; sizeOfInterval++) {
        for (let i = 0, j = i + sizeOfInterval - 1; i <= nums.length - sizeOfInterval; i++, j++) {
            dp[i][j] = Math.max(
                nums[i] - dp[i + 1][j],
                nums[j] - dp[i][j - 1]
            )
        }
    }

    return dp[0][nums.length - 1] >= 0;
}

function PredictTheWinnerDPRecursive(nums) {
    let dp = new Array(nums.length).fill().map(() => new Array(nums.length).fill());
    return dpRecursive(0, nums.length - 1, nums, dp) >= 0;
}

function dpRecursive(start, end, nums, dp) {
    // Time: O(n^2), n=length of nums
    // Space: O(n^2)
    // dp[i][j] = Max number of points the current player can obtain from the [i,j] interval of nums
    // dp[i][j] = points from the front subtracting the points of the next player (if we start with Player 1 then we subtract the points of Player 2), or points from the back subtracting the next points of Player 2. We do this because we know that Player 2 will also choose the optimal path for maximizing points.
    if (start === end) return nums[start];
    if (dp[start][end] !== undefined) {
        return dp[start][end];
    }

    let frontPoints = nums[start] - dpRecursive(start + 1, end, nums, dp);
    let endPoints = nums[end] - dpRecursive(start, end - 1, nums, dp);

    return Math.max(frontPoints, endPoints);
}

function PredictTheWinnerRecursive(nums) {
    // Time: O(2^n) n=lenth of nums
    // Space: O(n) - recursion stack
    return recursion(0, nums.length - 1, nums) >= 0;
}

function recursion(start, end, nums) {
    // recursion(start, end, nums) will give the max number of points the current player can obtain from the interval [start, end] of nums
    if (start === end) return nums[start];

    let frontPoints = nums[start] - recursion(start + 1, end, nums); // from nums[start] we subtract the points Player 2 can obtain in the next move (a mirror play), since Player 2 will also choose the maximum possible points
    let backPoints = nums[end] - recursion(start, end - 1, nums); // same here but from the back

    return Math.max(frontPoints, backPoints);
}

console.log(PredictTheWinner([6, 5, 2]));


