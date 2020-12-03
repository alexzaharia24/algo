function isCornerValid({ row, col }, nrOfRows, nrOfCols) {
    return row >= 0 && row < nrOfRows && col >= 0 && col < nrOfCols;
}

function areCornersValid(topLeft, topRight, bottomLeft, bottomRight, matrix) {
    let nrOfRows = matrix.length, nrOfCols = 0;
    if(nrOfRows > 0) {
        nrOfCols = matrix[0].length;
    }
    return isCornerValid(topLeft, nrOfRows, nrOfCols) &&
        isCornerValid(topRight, nrOfRows, nrOfCols) &&
        isCornerValid(bottomLeft, nrOfRows, nrOfCols) &&
        isCornerValid(bottomRight, nrOfRows, nrOfCols);
}

function binarySearchMatrix(matrix, target, topLeft, topRight, bottomLeft, bottomRight, visited) {
    let nrOfRows = bottomRight.row - topLeft.row + 1;
    let nrOfCols = topRight.col - topLeft.col + 1;

    if (!areCornersValid(topLeft, topRight, bottomLeft, bottomRight, matrix)) return false;


    let middleRow = parseInt((topLeft.row + bottomRight.row) / 2);
    let middleCol = parseInt((topLeft.col + bottomRight.col) / 2);

    let middleElem = matrix[middleRow][middleCol];
    if (visited[middleElem]) return false;
    if (middleElem === target) return true;
    visited[middleElem] = true;

    let topLeftRectangle = {
        topLeft: topLeft,
        topRight: { row: topRight.row, col: middleCol },
        bottomLeft: { row: middleRow, col: bottomLeft.col },
        bottomRight: { row: middleRow, col: middleCol }
    }

    let topRightRectangle = {
        topLeft: { row: topLeft.row, col: middleCol + 1 },
        topRight: topRight,
        bottomLeft: { row: middleRow, col: middleCol + 1 },
        bottomRight: { row: middleRow, col: bottomRight.col }
    }

    let bottomLeftRectangle = {
        topLeft: { row: middleRow + 1, col: bottomLeft.col },
        topRight: { row: middleRow + 1, col: middleCol },
        bottomLeft: bottomLeft,
        bottomRight: { row: bottomLeft.row, col: middleCol }
    }

    let bottomRightRectangle = {
        topLeft: { row: middleRow + 1, col: middleCol + 1 },
        topRight: { row: middleRow + 1, col: topRight.col },
        bottomLeft: { row: bottomLeft.row, col: middleCol + 1 },
        bottomRight: bottomRight
    }

    let topLeftResult = false, bottomRightResult = false;

    if (middleElem > target) {
        topLeftResult = binarySearchMatrix(
            matrix, target,
            topLeftRectangle.topLeft,
            topLeftRectangle.topRight,
            topLeftRectangle.bottomLeft,
            topLeftRectangle.bottomRight,
            visited
        );
    } else {
        bottomRightResult = binarySearchMatrix(
            matrix, target,
            bottomRightRectangle.topLeft,
            bottomRightRectangle.topRight,
            bottomRightRectangle.bottomLeft,
            bottomRightRectangle.bottomRight,
            visited
        );
    }

    let topRightResult = binarySearchMatrix(
        matrix, target,
        topRightRectangle.topLeft,
        topRightRectangle.topRight,
        topRightRectangle.bottomLeft,
        topRightRectangle.bottomRight,
        visited
    );

    let bottomLeftResult = binarySearchMatrix(
        matrix, target,
        bottomLeftRectangle.topLeft,
        bottomLeftRectangle.topRight,
        bottomLeftRectangle.bottomLeft,
        bottomLeftRectangle.bottomRight,
        visited
    );


    return topLeftResult || topRightResult || bottomLeftResult || bottomRightResult;
}


function searchMatrix(matrix, target) {
    let nrOfRows = matrix.length;
    if (nrOfRows === 0) return false;
    let nrOfCols = matrix[0].length;
    let visited = {};


    return binarySearchMatrix(
        matrix, target,
        { row: 0, col: 0 },
        { row: 0, col: nrOfCols - 1 },
        { row: nrOfRows - 1, col: 0 },
        { row: nrOfRows - 1, col: nrOfCols - 1 },
        visited
    )
}

// console.log(
//     searchMatrix([
//         [1, 4, 7, 11, 15],
//         [2, 5, 8, 12, 19],
//         [3, 6, 9, 16, 22],
//         [10, 13, 14, 17, 24],
//         [18, 21, 23, 26, 30]
//     ], 5)
// )

console.log(searchMatrix([[-1, 3]], 3))
console.log(searchMatrix([[5,6,10,14],[6,10,13,18],[10,13,18,19]], 14))