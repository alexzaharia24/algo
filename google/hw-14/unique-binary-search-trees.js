// https://leetcode.com/problems/unique-binary-search-trees
function numTrees(n) {
    return numTreesDPLinearSpace(n);
}

function numTreesDPLinearSpace(n) {
    // Time: O(n^2)
    // Space: O(n)
    // dp[i] = nr de BSTs cu i noduri
    //       = linesSum[i]

    let dp = new Array(n + 1).fill(0);

    dp[0] = 1; // artificial value for bounding the lower limit of the array (dp[j-1] and dp[i-j]);
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            // dp[i] += (dp[j-1] || 1) * (dp[i-j] || 1);
            dp[i] += dp[j-1] * dp[i-j];
        }
    }

    return dp[n];
}

function numTreesDPNodesAndRoot(n) {
    // Time: O(n^3)
    // Space: O(n^2)
    // dp[i][j] = nr of BSTs with i nodes and root j
    // dp[i][j] = sum of nodes of trees with j-1 nodes to the right and roots from 1 to j-1 and sum of nodes of trees with n-j nodes to the right and roots from j+1 to n
    let dp = new Array(n + 1).fill()
        .map(() => new Array(n + 1).fill(0));

    let lineSum = new Array(n + 1).fill(0);
    // Base case: 1 node trees
    dp[1][1] = 1;
    lineSum[1] = 1;

    /* O(n^3)
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            let nrNodesLeft = 0, nrNodesRight = 0;

            for (let k = 1; k < j; k++) {
                nrNodesLeft += dp[j - 1][k];
            }

            for (let k = 1; k <= i - j; k++) {
                nrNodesRight += dp[i - j][k];
            }

            dp[i][j] = (nrNodesLeft === 0 ? 1 : nrNodesLeft) * (nrNodesRight === 0 ? 1 : nrNodesRight);
        }
    }
    */

    // O(N^2) using line sums
    // Explanaition: for dp[6][4] => left = dp[3][1] + dp[3][2] + dp[3][3] and right = dp[2][1] + dp[2][2] => dp[6][4] = left * right = (sum of line 3) * (sum of line 2)
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            dp[i][j] = (lineSum[j - 1] || 1) * (lineSum[i - j] || 1);
            lineSum[i] += dp[i][j];
        }
    }

    let totalNumberOfTrees = 0;
    for (let i = 1; i <= n; i++) {
        totalNumberOfTrees += dp[n][i];
    }
    return totalNumberOfTrees;
}

console.log(numTrees(1));
console.log(numTrees(2));
console.log(numTrees(3));
console.log(numTrees(4));