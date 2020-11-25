// https://leetcode.com/problems/longest-increasing-path-in-a-matrix/

function longestIncreasingPath(matrix) {
    // Time: O(n*m)
    // Space: O(n*m)
    // dp[i][j] = max length of the subsequence ending in (i,j)
    // dp[i][j] = 1 + max of the lengths of its neighbors (up, right, down, left)
    let rows = matrix.length;
    if(rows === 0) return 0;
    let cols = matrix[0].length;
    let dp = new Array(rows).fill()
        .map(() => new Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            recursive(i, j, rows, cols, dp, matrix); // This is O(1) amortized
        }
    }

    let maxLength = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            maxLength = Math.max(maxLength, dp[i][j]);
        }
    }
    return maxLength;
}

function recursive(i, j, rows, cols, dp, matrix) {
    if (i < 0 || i >= rows || j < 0 || j >= cols) {
        return 0;
    }

    if (dp[i][j] !== 0) return dp[i][j];

    let maxLengthForPosition = 1;
    let neighbours = [
        { row: i - 1, col: j }, // UP
        { row: i, col: j + 1 }, // RIGHT
        { row: i + 1, col: j }, // DOWN
        { row: i, col: j - 1 }, // LEFT
    ]

    for (let neighbour of neighbours) {
        if (isPositionValid(neighbour.row, neighbour.col, rows, cols) && matrix[neighbour.row][neighbour.col] < matrix[i][j]) {
            maxLengthForPosition = Math.max(maxLengthForPosition, 1 + recursive(neighbour.row, neighbour.col, rows, cols, dp, matrix))
        }
    }
    dp[i][j] = maxLengthForPosition;
    return maxLengthForPosition;
}

function isPositionValid(i, j, rows, cols) {
    return i >= 0 && i < rows && j >= 0 && j < cols;
}

// TODO: TOPOLOGICAL SORT

// console.log(longestIncreasingPath([
//     [9, 9, 4],
//     [6, 6, 8],
//     [2, 1, 1]]
// ))

console.log(longestIncreasingPath(
    [
        [3, 4, 5],
        [3, 2, 6],
        [2, 2, 1]
    ]
))

