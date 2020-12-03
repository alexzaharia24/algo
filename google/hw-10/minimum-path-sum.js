// https://leetcode.com/problems/minimum-path-sum/

function minPathSum(grid) {
    return minPathSumIterative(grid);
}

function minPathSumIterative(grid) {
    // Time: O(N) - N=nr of elements
    // Space: O(N)
    // State definition: dp[i][j] = min sum of path that ends in (i,j)
    // Recursion rule: dp[i][j] = min sum of path from up and path from left

    if (grid.length === 0) return 0;
    if (grid[0].length === 0) return 0;

    let dp = new Array(grid.length).fill().map(() => new Array(grid[0].length).fill(0));
    dp[0][0] = grid[0][0];
    // Initialize first row
    for (let col = 1; col < grid[0].length; col++) {
        dp[0][col] = dp[0][col - 1] + grid[0][col];
    }
    // Initialize first column
    for (let row = 1; row < grid.length; row++) {
        dp[row][0] = dp[row-1][0] + grid[row][0];
    }
    // Infer the rest of the elememnts using the recursion rule
    for (let i = 1; i < grid.length; i++) {
        for (let j = 1; j < grid[0].length; j++) {
            dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
        }
    }

    // console.log(dp);
    return dp[grid.length - 1][grid[0].length - 1];
}

function minPathSumRecursive(grid) {
    if (grid.length === 0) return 0;
    if (grid[0].length === 0) return 0;
    let sum;
    // sum = dfsNoMemoisation(0, 0, grid);

    let memory = {};
    sum = dfsWithMemoisation(0, 0, grid, memory);

    return sum;
}




function dfsWithMemoisation(row, col, grid, memory) {
    // Time: O(N) - N=number of elements
    // Space: O(N) memoization + recursion stack
    let neighbors = [
        { row: row, col: col + 1 }, // right
        { row: row + 1, col: col }, // down
    ]

    let localSum = Infinity;
    for (let neighbor of neighbors) {
        // console.log(`isPositionValid(${neighbor.row},${neighbor.col}): ${isPositionValid(neighbor.row, neighbor.col, grid)}`)
        if (isPositionValid(neighbor.row, neighbor.col, grid)) {
            // console.log(`valid neighbor row: ${neighbor.row}, col: ${neighbor.col}`)
            if (memory[`${neighbor.row},${neighbor.col}`] === undefined) {
                memory[`${neighbor.row},${neighbor.col}`] = dfsWithMemoisation(neighbor.row, neighbor.col, grid, memory);
            }

            localSum = Math.min(localSum, memory[`${neighbor.row},${neighbor.col}`]);
        }
    }
    if (localSum === Infinity) localSum = 0;
    return grid[row][col] + localSum;
}

function dfsNoMemoisation(row, col, grid) {
    // Time: O(n!) - exponential time since for each element we try to deduce all possible paths from it. (Basically backtracking)
    // Space: O(n) - recursion stack
    let neighbors = [
        { row: row, col: col + 1 }, // right
        { row: row + 1, col: col }, // down
    ]

    let localSum = Infinity;
    for (let neighbor of neighbors) {
        if (isPositionValid(neighbor.row, neighbor.col, grid)) {
            localSum = Math.min(localSum, dfsNoMemoisation(neighbor.row, neighbor.col, grid));
        }
    }
    if (localSum === Infinity) localSum = 0;
    return grid[row][col] + localSum;
}


function isPositionValid(row, col, grid) {
    let nrOfRows = grid.length;
    let nrOfCols = grid[0].length;
    return row >= 0 && row < nrOfRows && col >= 0 && col < nrOfCols;
}

console.log(minPathSum([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1]
]))

// console.log(minPathSum([
//     [5, 8, 0, 8, 1, 9, 2, 6, 0, 0, 4, 1, 4, 5, 8, 5, 1, 4, 5, 5, 6, 3, 4, 8, 5, 1, 2, 2, 9, 5, 5, 4, 8, 8, 8, 1, 1, 6, 5, 9],
//     [2, 9, 5, 3, 6, 4, 1, 9, 0, 0, 4, 0, 1, 8, 0, 1, 0, 1, 9, 1, 5, 8, 8, 0, 4, 2, 2, 3, 7, 9, 6, 8, 6, 1, 8, 5, 8, 2, 7, 4],
//     [4, 4, 3, 6, 4, 3, 3, 8, 5, 3, 0, 6, 9, 8, 7, 3, 6, 5, 3, 2, 2, 9, 5, 0, 9, 1, 4, 7, 8, 4, 4, 0, 0, 6, 6, 5, 2, 6, 8, 7],
//     [8, 9, 4, 3, 3, 2, 9, 6, 8, 6, 7, 0, 2, 3, 8, 4, 7, 9, 1, 5, 6, 8, 3, 4, 3, 6, 5, 5, 4, 3, 9, 1, 0, 3, 4, 9, 6, 7, 7, 5],
//     [7, 1, 2, 6, 5, 1, 1, 7, 6, 0, 8, 1, 4, 0, 2, 9, 5, 3, 7, 9, 7, 6, 4, 4, 8, 7, 8, 9, 7, 2, 6, 4, 6, 3, 7, 7, 1, 0, 3, 0],
    // [5,3,4,3,4,4,5,6,4,3,6,8,1,5,2,9,2,1,3,1,3,5,8,0,0,5,7,0,2,1,0,5,3,8,6,1,6,4,6,6],
    // [4,6,0,2,6,9,7,3,8,2,4,1,0,7,5,0,2,7,7,6,8,8,9,4,8,6,0,8,7,3,5,3,6,6,5,1,4,3,9,3],
    // [7,3,1,8,1,3,4,2,3,8,7,2,5,9,5,8,6,1,6,1,3,1,8,2,4,1,6,6,4,3,0,8,9,9,5,2,6,9,8,7],
    // [6,6,4,6,9,9,2,4,9,0,9,7,8,4,9,8,3,1,6,4,1,9,5,5,4,4,9,1,1,4,6,0,2,0,7,3,9,8,0,3],
    // [6,5,5,9,4,1,2,1,9,9,0,2,7,0,3,6,9,4,2,6,4,6,5,9,8,2,4,2,9,1,2,7,6,9,0,5,7,4,4,5],
    // [9,1,9,7,0,2,6,7,2,5,9,3,7,7,0,4,0,1,9,0,5,3,5,5,6,6,8,1,5,1,1,8,4,3,0,0,3,4,8,5],
    // [7,0,9,6,5,5,6,4,2,1,3,3,6,7,5,8,2,2,7,1,1,9,2,4,5,6,3,8,4,6,5,8,7,1,1,1,9,3,4,0],
    // [6,0,9,2,1,7,8,0,2,1,6,6,3,7,1,8,4,8,5,6,8,1,4,3,5,9,0,0,7,0,5,6,7,7,1,1,3,6,9,1],
    // [1,9,9,9,9,8,2,0,3,8,3,7,4,0,6,7,8,0,9,1,3,5,1,2,2,6,1,7,2,9,5,5,1,0,2,6,5,3,7,8],
    // [7,3,1,1,3,3,3,2,1,9,3,0,3,8,4,2,6,3,5,4,8,9,0,6,6,5,0,5,9,4,3,4,9,1,5,5,7,6,7,0],
    // [4,7,0,8,1,4,1,9,5,3,8,3,4,7,1,1,6,7,9,5,8,7,9,1,0,8,8,6,1,9,8,4,6,5,5,7,4,9,5,8],
    // [9,1,3,1,2,7,7,0,4,2,8,0,9,6,1,0,7,2,4,8,0,7,8,1,4,5,4,9,2,2,8,2,7,4,7,7,9,6,8,2],
    // [6,0,9,5,7,9,4,4,4,2,1,7,4,1,7,7,1,3,5,9,4,4,9,3,0,1,5,4,3,8,0,1,7,0,6,4,8,4,9,7],
    // [4,2,4,1,0,1,8,2,2,4,0,0,5,2,5,4,8,6,2,3,4,8,8,1,6,4,8,0,1,0,4,6,1,2,8,6,7,1,7,6],
    // [4,1,2,4,9,4,4,6,2,4,8,5,6,8,4,2,7,1,0,4,1,1,2,9,8,5,2,0,9,2,9,1,7,5,6,9,0,7,9,2],
    // [4,9,4,6,2,4,3,7,5,9,0,8,0,8,8,3,1,1,8,1,6,5,6,0,4,5,2,8,5,2,5,5,6,0,7,9,7,7,2,7],
    // [7,4,0,6,0,1,0,1,9,0,5,6,2,9,8,3,2,9,5,9,2,3,3,0,4,1,2,1,3,7,9,7,9,2,4,5,2,4,4,0],
    // [8,2,1,8,5,8,7,3,7,0,4,9,0,8,5,1,6,7,7,3,8,4,1,4,4,2,7,6,1,3,1,9,5,9,4,7,1,0,3,6],
    // [6,7,2,7,1,0,8,4,3,3,6,8,7,8,4,0,1,6,9,7,4,7,3,7,5,2,9,9,6,3,7,2,3,0,5,2,6,9,8,1],
    // [5,7,5,4,4,1,2,0,3,5,4,7,5,4,7,2,4,6,8,8,9,9,6,7,2,0,1,2,0,3,3,7,7,0,8,7,8,3,7,0],
    // [2,8,3,2,2,5,5,3,1,4,1,8,1,2,3,3,6,4,4,4,8,4,3,4,9,5,2,4,7,0,6,6,2,9,7,0,2,1,5,5],
    // [3,0,1,6,1,0,3,6,8,1,3,0,9,6,5,0,0,1,8,8,1,8,9,2,5,8,5,6,4,7,1,5,9,5,9,9,9,5,2,1],
    // [6,6,4,8,5,7,5,2,8,6,2,3,2,9,1,9,0,1,6,5,2,1,4,4,0,6,9,5,0,9,9,4,3,1,2,2,4,0,9,3],
    // [2,2,8,2,1,0,5,5,3,5,8,2,3,9,7,7,6,4,2,8,8,6,7,5,2,2,2,1,9,3,1,9,0,7,0,5,3,6,5,3],
    // [4,3,0,6,4,8,5,5,9,1,0,9,4,1,6,6,6,1,9,8,0,2,5,7,1,5,6,6,5,5,4,9,5,6,0,4,6,5,5,6],
    // [2,5,5,2,5,8,9,0,3,5,8,3,8,3,4,2,2,5,4,8,0,3,0,0,2,4,2,0,3,3,4,6,6,8,5,3,5,2,3,9],
    // [9,7,8,0,5,2,4,6,8,9,9,6,8,6,5,6,3,3,7,7,5,6,1,1,9,4,3,0,4,4,1,3,0,9,3,6,3,6,5,8],
    // [3,5,1,3,1,3,2,5,5,2,6,5,2,8,1,0,1,9,9,5,3,1,9,7,1,4,6,9,3,3,5,2,4,3,4,6,1,2,2,7],
    // [1,8,9,0,6,0,5,9,2,7,8,3,6,4,5,1,7,9,5,9,6,2,5,7,1,5,6,5,8,3,5,5,4,7,6,8,3,4,8,7],
    // [4,7,3,3,6,7,4,6,2,5,1,0,9,4,9,2,8,8,0,7,4,4,3,1,9,0,5,9,0,8,1,8,2,7,9,4,0,7,1,6],
    // [9,9,2,9,8,1,5,7,9,8,1,8,3,0,7,2,3,0,2,6,8,6,6,1,2,6,9,4,2,9,0,2,9,5,5,5,3,2,0,2],
    // [4,4,3,5,6,0,7,4,4,0,9,8,1,3,5,9,7,9,4,1,7,7,3,2,0,4,7,9,4,9,5,6,1,2,5,8,3,7,6,4],
    // [3,6,0,6,0,4,7,9,5,3,6,1,1,6,6,5,1,5,1,2,0,9,6,6,4,6,1,9,2,3,1,2,3,1,9,1,6,4,2,4],
    // [9,8,8,0,9,5,2,6,1,8,7,7,9,9,7,5,2,6,3,6,9,9,5,3,4,5,3,7,1,9,3,2,2,8,4,9,8,4,3,2],
    // [8,0,5,4,0,5,6,4,0,5,3,0,3,1,2,1,7,7,3,3,1,5,4,6,4,2,4,1,4,8,0,6,3,0,0,4,3,1,8,0],
// ]))
