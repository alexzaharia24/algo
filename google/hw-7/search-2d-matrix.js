// https://leetcode.com/problems/search-a-2d-matrix-ii/

function searchMatrix(matrix, target) {
    // Time: O(n+m)
    // Space: O(1)
    // Start from top right corner. Starting from here we have the assurance that left neighbour is smaller than current node, and down neighbour is bigger

    if (matrix.length === 0) return false;
    let nrOfCols = matrix[0].length;
    let position = { row: 0, col: nrOfCols - 1 };

    while (isValidPosition(position.row, position.col, matrix)) {
        let value = matrix[position.row][position.col];
        if (value === target) return true;
        else if (target < value) {
            // Go left
            position = { row: position.row, col: position.col - 1 };
        } else {
            // Go down
            position = { row: position.row + 1, col: position.col };
        }
    }

    return false;
}

function isValidPosition(row, col, matrix) {
    let nrOfRows = matrix.length;
    let nrOfCols = matrix[0].length;
    return row >= 0 && row < nrOfRows && col >= 0 && col < nrOfCols;
}

console.log(searchMatrix([
    [1,   4,  7, 11, 15],
    [2,   5,  8, 12, 19],
    [3,   6,  9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
  ], 5))
  console.log(searchMatrix([
    [1,   4,  7, 11, 15],
    [2,   5,  8, 12, 19],
    [3,   6,  9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
  ], 20))