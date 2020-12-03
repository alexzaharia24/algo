// https://leetcode.com/problems/unique-paths/

function uniquePaths(m, n) {
    return uniquePathsIterative(m, n);
}

function uniquePathsIterative(m, n) {
    // Time: O(n*m)
    // Space: O(n*m)
    // State definition: dp[i][j] = nr of paths that lead to position (i,j)
    // Recursion formula: dp[i][j] = sum of nr of ways to reach position (i,j) from left and from top
    let dp = new Array(m).fill().map(() => new Array(n).fill());
    // Initialize first row and column with 1
    for (let row = 0; row < m; row++) {
        dp[row][0] = 1;
    }
    for (let col = 0; col < n; col++) {
        dp[0][col] = 1;
    }
    for (let row = 1; row < m; row++) {
        for (let col = 1; col < n; col++) {
            dp[row][col] = dp[row-1][col] + dp[row][col-1];
        }
    }

    return dp[m-1][n-1];
}

function uniquePathsRecursive(m, n) {
    let memory = new Array(m).fill().map(() => new Array(n).fill());
    return dfs(0, 0, m, n, memory);
}

function dfs(row, col, m, n, memory) {
    // Time: O(m*n)
    // Space: O(m*n) - memoization + recursion stack

    // console.log(`row: ${row}, col: ${col}`)
    if (row === m - 1 && col === n - 1) return 1;
    let neighbors = [
        { row: row, col: col + 1 }, // right
        { row: row + 1, col: col }, // down
    ]

    let localNrOfPaths = 0;
    for (let neighbor of neighbors) {
        if (isPositionValid(neighbor.row, neighbor.col, m, n)) {
            // console.log(`neighbor.row: ${neighbor.row}, neighbor.col: ${neighbor.col}`)
            // console.log(`memory: ${memory}`)
            let nrOfPathsForNeighbor = memory[neighbor.row][neighbor.col] ?? dfs(neighbor.row, neighbor.col, m, n, memory);
            localNrOfPaths += nrOfPathsForNeighbor;
        }
    }

    memory[row][col] = localNrOfPaths;
    return localNrOfPaths;
}

function isPositionValid(row, col, m, n) {
    return row >= 0 && row < m && col >= 0 && col < n;
}

console.log(uniquePaths(3, 7));
console.log(uniquePaths(3, 2));
console.log(uniquePaths(3, 3));