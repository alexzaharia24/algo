// https://leetcode.com/problems/stone-game-ii/

function Sum(i, j, sums) {
    if (i - 1 < 0) return sums[j];
    return sums[j] - sums[i - 1];
}

function Solve(i, j, n, piles, dp, sums) {
    // base case: M is large enough to cover the rest of the interval
    if (i + 2 * j >= n) {
        return Sum(i, n - 1, sums);
    }

    if (dp[i][j] !== -Infinity) {
        return dp[i][j];
    }

    for (let x = 1; (x <= 2 * j) && (i + x - 1 < n); x++) {
        dp[i][j] = Math.max(dp[i][j], Sum(i, i + x - 1, sums) - Solve(i + x, Math.max(x, j), n, piles, dp, sums));
    }

    return dp[i][j];
}

function stoneGameII(piles) {
    return stoneGameIIIterative(piles);
}

function stoneGameIIIterative(piles) {
    // Time: O(n^3), n=length of piles
    // Space: O(n^2)
    // dp[i][j] = max difference of points when playing on the [i,n) interval with M = j
    let n = piles.length;
    let dp = new Array(n).fill()
        .map(() => new Array(n).fill(-Infinity));

    let sums = new Array(n);
    sums[0] = piles[0];


    for (let i = 1; i < n; i++) {
        sums[i] = sums[i - 1] + piles[i];
    }

    for (let i = n - 1; i >= 0; i--) {
        for (let j = 1; j <= n; j++) {
            if ((i + 2 * j) >= n) { // base case
                dp[i][j] = Sum(i, n - 1, sums);
            } else {
                for (let x = 1; (x <= 2 * j) && (i + x - 1 < n); x++) {
                    dp[i][j] = Math.max(dp[i][j], Sum(i, i + x - 1, sums) - dp[i + x][Math.max(x, j)]);
                }
            }
        }
    }

    return (Sum(0, n - 1, sums) + dp[0][1]) / 2;
}

function stoneGameIIRecursive(piles) {
    // Time: O(n^3), n=length of piles
    // Space: O(n^2)
    // dp[i][j] = max difference of points that a player can obtain by playing on the interval [i, n) and M = j

    let n = piles.length;
    let dp = new Array(n + 1).fill()
        .map(() => new Array(n).fill(-Infinity));


    let sums = new Array(n).fill(0);
    sums[0] = piles[0];
    for (let i = 1; i < n; i++) {
        sums[i] = sums[i - 1] + piles[i];
    }

    // Sum = A + B
    // Solve = A - B , where A=points of player 1, B = points of player 2
    // => A = (Sum + Solve) / 2
    return (Sum(0, n - 1, sums) + Solve(0, 1, n, piles, dp, sums)) / 2;
}


function stoneGameIITry1(piles) {
    // dp[i][m] - max difference you can obtain from interval [i,n) for M=m
    let n = piles.length;
    let dp = new Array(n + 1).fill()
        .map(() => new Array(n + 1).fill(-Infinity));

    dp[n] = 0; // outside of the array 
    for (let i = 1; i <= n; i++) {
        dp[n - 1][i] = piles[n - 1];
    }

    // for (let i = n - 2; i >= 0; i--) {
    //     let maxM = n - i;
    //     let maxDiff = -Infinity;
    //     for (let m = 1; m <= maxM; m++) {
    //         let sum = 0;
    //         for (let j = 0; j < m; j++) {
    //             sum += piles[i + j];
    //         }
    //         dp[i][m] = sum - dp[i + m][
    //         // maxDiff = Math.max(maxDiff, sum - dp[i + j + 1][m - 1])
    //     }
    // }
}

console.log(stoneGameII([2, 7, 9, 4, 4]))
console.log(stoneGameII([1]))