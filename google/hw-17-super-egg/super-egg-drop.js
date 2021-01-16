// https://leetcode.com/problems/super-egg-drop/

function superEggDrop(K, N) {
    let dp = new Array(N + 1).fill().map(() => new Array(K + 1).fill(Infinity));
    // dp[i][j] = nr of min drops to reach F starting from floor i and having j eggs left

    let result = solve(N, K, dp);
    console.log("for N=" + N, "and K=" + K, "there are", count, "calls")
    return result;
}

let count = 1;
function solve(i, j, dp) {
    // Time: O(N*K*logN)
    // Space: O(N*K)
    count++;

    if (i === 0) return 0;
    if (j === 1) return i;

    if (dp[i][j] !== Infinity) {
        return dp[i][j];
    }

    // Will TLE
    // for (let k = 1; k <= i; k++) {
    //     // if it breaks => dp[k-1][j-1]
    //     // if it doesn't break => dp[i-k][j]
    //     dp[i][j] = Math.min(dp[i][j], Math.max(solve(k - 1, j - 1, dp), solve(i - k, j, dp)) + 1);
    // }

    // Make it binary search
    let left = 1, right = i;
    while (left <= right) {
        let mid = parseInt((left + right) / 2);
        let first = solve(mid - 1, j - 1, dp);
        let second = solve(i - mid, j, dp);
        dp[i][j] = Math.min(dp[i][j], Math.max(first, second) + 1);

        if (first < second) {
            // go right
            left = mid + 1;
        } else {
            // go left
            right = mid - 1;
        }
    }

    return dp[i][j];
}

console.log(superEggDrop(10000,1000000));
