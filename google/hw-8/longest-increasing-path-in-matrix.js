// https://leetcode.com/problems/longest-increasing-path-in-a-matrix/

function longestIncreasingPath(matrix) {
    return longestIncreasingPathBrute(matrix);
}

function isPositionValid(matrix, row, col) {
    let nrOfRows = matrix.length;
    let nrOfCols = matrix[0].length;

    return row >= 0 && row < nrOfRows && col >= 0 && col < nrOfCols;
}

function getRowFromNode(node, nrOfRows) { 
    if (nrOfRows === 1) return 0;
    return parseInt(node / nrOfRows);
}
function getColFromNode(node, nrOfCols) { 
    return node % nrOfCols;
}

function longestIncreasingPathBrute(matrix) {
    // Construct graph
    let adjacenyList = new Map();
    let nrOfRows = matrix.length;
    if (matrix.length === 0) return [];
    let nrOfCols = matrix[0].length;
    let nrOfNodes = nrOfRows * nrOfCols;

    for (let row = 0; row < nrOfRows; row++) {
        for (let col = 0; col < nrOfCols; col++) {
            // let node = { row: row, col: col };
            let node = row * nrOfRows + col;
            adjacenyList.set(node, []);
            let value = matrix[row][col];
            let neighbors = [
                { row: row - 1, col: col }, // up
                { row: row, col: col + 1 }, // right
                { row: row + 1, col: col }, // down 
                { row: row, col: col - 1 }, // left
            ]

            for (let neighbor of neighbors) {
                let neighborRow = neighbor.row, neighborCol = neighbor.col;
                if (isPositionValid(matrix, neighborRow, neighborCol) && value < matrix[neighborRow][neighborCol]) {
                    let currentNeighbors = adjacenyList.get(node);
                    currentNeighbors.push(neighborRow * nrOfRows + neighborCol);
                    adjacenyList.set(node, currentNeighbors);
                }
            }
        }
    }

    let maxLengthOfPath = 0;
    for (let row = 0; row < nrOfRows; row++) {
        for (let col = 0; col < nrOfCols; col++) {
            let visited = new Array(nrOfRows).fill().map(() => new Array(nrOfCols).fill(false));
            let lengthOfPath = dfs(row, col, adjacenyList, matrix, visited);
            maxLengthOfPath = Math.max(maxLengthOfPath, lengthOfPath);
            console.log(`row: ${row}, col: ${col}, length: ${lengthOfPath}`)
        }
    }

    return maxLengthOfPath;
}



function dfs(row, col, adjacenyList, matrix, visited) {
    let nrOfRows = matrix.length;
    let nrOfCols = matrix[0].length;
    visited[row][col] = true;
    let neighbors = adjacenyList.get(row * nrOfRows + col);
    if (neighbors.length === 0) return 1;
    let maxLength = 0;
    for (let neighbor of neighbors) {
        let neighborRow = getRowFromNode(neighbor, nrOfRows);
        let neighborCol = getColFromNode(neighbor, nrOfCols);
        if(!visited[neighborRow][neighborCol]) {
            let result = 1 + dfs(neighborRow, neighborCol, adjacenyList, matrix, visited);
            maxLength = Math.max(maxLength, result);
        }
        visited[neighborRow][neighborCol] = false;
    }
    return maxLength;
}


// console.log(longestIncreasingPath([
//     [9, 9, 4],
//     [6, 6, 8],
//     [2, 1, 1]
// ]));
// console.log(longestIncreasingPath([
//     [3, 4, 5],
//     [3, 2, 6],
//     [2, 2, 1]
// ]));
// console.log(longestIncreasingPathBrute([[2,8,6,0,4,14],[15,3,5,0,10,12],[10,13,14,5,11,16],[7,8,16,11,15,13],[19,10,7,13,0,11],[16,19,7,3,6,11],[7,2,5,9,0,19],[14,11,8,8,14,11],[4,5,10,4,2,12]]))

console.log(longestIncreasingPath([[7,8,9],[9,7,6],[7,2,3]]))

// graph.forEach((value, key) => {
//     console.log(`{row: ${key.row}, col: ${key.col}}: `, value)
// });