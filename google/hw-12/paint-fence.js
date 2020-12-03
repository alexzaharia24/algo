// https://leetcode.com/problems/paint-fence/
function numWays(n, k) {
    return numWaysDP(n, k);
}

function numWaysDP(n, k) {
    // Time: O(n)
    // Space: O(n)
    if (n === 0) return 0;
    if (n === 1) return k;
    let dp = new Array(n).fill();
    dp[0] = k; // first level has k possibilities
    dp[1] = k * k; // second level has k*k possibilities
    for (let i = 2; i < n; i++) {
        let sameColor = (k-1) * dp[i-2]; // nr of ways to paint the fence with the last two poles having the same color
        let diffColor = (k-1) * dp[i-1]; // nr of ways to paint the fence with the last two poles having different colors
        dp[i] = sameColor + diffColor;
    }
    return dp[n-1];
}

function numWaysSameAndDiff(n, k) {
    // Time: O(n)
    // Space: O(1)
    if (n === 0) return 0;
    if (n === 1) return k;
    let sameColor = k; // Number of ways to paint the 1st and 2nd pole in the same color
    let diffColor = k * (k - 1); // Number of ways to paint the 1st and 2nd pole in different colors

    for (let i = 2; i < n; i++) {
        let prevDiff = diffColor;
        diffColor = (sameColor + diffColor) * (k - 1); // Number of ways to paint the i pole in a different color than the i-1 pole
        sameColor = prevDiff; // Number of ways to paint the i pole in the same color as pole i-1, without having more than 2 adjacent poles of the same color 
    }

    return sameColor + diffColor;
}

function numWaysDFS(n, k) {
    // Time: O(result) - exponentional
    // Space: O(1)
    if (n === 0) return 0;
    let ways = 0;
    for (let i = 0; i < k; i++) {
        ways += dfs(i, 1, n - 1, k);
    }

    return ways;
}

function dfs(poleColor, adjSameColor, polesLeft, k) {
    if (polesLeft === 0) return 1;
    let ways = 0;
    for (let i = 0; i < k; i++) {
        if (poleColor === i && adjSameColor < 2) {
            ways += dfs(i, adjSameColor + 1, polesLeft - 1, k);
        } else if (poleColor !== i) {
            ways += dfs(i, 1, polesLeft - 1, k);
        }
        console.log(`level ${i}: ${ways} ways`)
    }
    return ways;
}

console.log(numWays(3, 2));
console.log(numWays(4, 3));
console.log(numWays(6, 2));