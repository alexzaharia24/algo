// https://leetcode.com/problems/maximal-square/

function maximalSquare(matrix) {
    return maximalSquare2D(matrix);
}

function maximalSquare2D(matrix) {
    // dp[i][j] = max square size for which  (i,j) is the right-bottom end
    let rows = matrix.length;
    if (rows === 0) return 0;
    let cols = matrix[0].length;
    if (cols === 0) return 0;

    let maxPossibleSquareSize = Math.min(rows, cols);

    let dp = new Array(rows).fill()
        .map(() => new Array(cols).fill());

    // Mark size 1 squares
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            dp[i][j] = (matrix[i][j] === '1') ? 1 : 0;
        }
    }

    for (let k = 2; k <= maxPossibleSquareSize; k++) {
        for (let i = k - 1; i < rows; i++) {
            for (let j = k - 1; j < cols; j++) {
                if (dp[i][j] === k - 1 &&
                    getValueIfValidPosition2D(i - 1, j - 1, rows, cols, dp) >= k - 1 &&
                    getValueIfValidPosition2D(i - 1, j, rows, cols, dp) >= k - 1 &&
                    getValueIfValidPosition2D(i, j - 1, rows, cols, dp) >= k - 1
                ) {
                    dp[i][j] = k;
                }
            }
        }
    }

    let maxSquare = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (dp[i][j]) {
                maxSquare = Math.max(maxSquare, dp[i][j]);
            }
        }
    }

    return maxSquare * maxSquare;
}


function getValueIfValidPosition2D(i, j, rows, cols, dp) {
    if (i >= 0 && i < rows && j >= 0 && j < cols) {
        return dp[i][j];
    }
    return false;
}

function maximalSquare3D(matrix) {
    // Time: O(n*m*k), n=nr of rows, m = nr of cols, k = max btw n and m
    // Space: O(n*m*k)
    // dp[i][j][k] = true if (i,j) is 1 and is the right-bottom end of a square of size k
    let rows = matrix.length;
    if (rows === 0) return 0;
    let cols = matrix[0].length;
    if (cols === 0) return 0;

    let maxPossibleSquareSize = Math.min(rows, cols);

    let dp = new Array(rows).fill()
        .map(() => new Array(cols).fill()
            .map(() => new Array(maxPossibleSquareSize).fill(false)));

    // Mark size 1 squares
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            dp[i][j][1] = (matrix[i][j] === '1')
        }
    }

    for (let k = 2; k <= maxPossibleSquareSize; k++) {
        for (let i = k - 1; i < rows; i++) {
            for (let j = k - 1; j < cols; j++) {
                dp[i][j][k] =
                    getValueIfValidPosition3D(i, j, 1, rows, cols, dp) &&
                    getValueIfValidPosition3D(i - 1, j, k - 1, rows, cols, dp) &&
                    getValueIfValidPosition3D(i, j - 1, k - 1, rows, cols, dp) &&
                    getValueIfValidPosition3D(i - k + 1, j - k + 1, 1, rows, cols, dp)
            }
        }
    }

    let maxSquare = 0;
    for (let k = 1; k <= maxPossibleSquareSize; k++) {
        for (let i = k - 1; i < rows; i++) {
            for (let j = k - 1; j < cols; j++) {
                if (dp[i][j][k]) {
                    maxSquare = Math.max(maxSquare, k);
                }
            }
        }
    }

    return maxSquare * maxSquare;
}

function getValueIfValidPosition3D(i, j, k, rows, cols, dp) {
    if (i >= 0 && i < rows && j >= 0 && j < cols) {
        return dp[i][j][k];
    }
    return false;
}

console.log(maximalSquare(
    [["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]
)); // expected 4
console.log(maximalSquare(
    [["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "1", "1", "1"]]
)); // expected 9