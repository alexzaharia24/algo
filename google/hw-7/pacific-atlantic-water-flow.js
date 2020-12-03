// https://leetcode.com/problems/pacific-atlantic-water-flow/

function pacificAtlantic(matrix) {
    if (matrix.length === 0) return [];
    let nrOfRows = matrix.length;
    let nrOfCols = matrix[0].length;
    let visitedPacific = generateMatrix(nrOfRows, nrOfCols, false);
    let visitedAtlantic = generateMatrix(nrOfRows, nrOfCols, false);
    let canReachPacific = generateMatrix(nrOfRows, nrOfCols, false);
    let canReachAtlantic = generateMatrix(nrOfRows, nrOfCols, false);

    canReachPacific[0][0] = true;
    canReachAtlantic[nrOfRows - 1][nrOfCols - 1] = true;

    bfs(matrix, visitedPacific, canReachPacific, { row: 0, col: 0 }, isPacificEdge);
    bfs(matrix, visitedAtlantic, canReachAtlantic, { row: nrOfRows - 1, col: nrOfCols - 1 }, isAtlanticEdge);

    let result = [];
    for (let i = 0; i < nrOfRows; i++) {
        for (j = 0; j < nrOfCols; j++) {
            if (canReachPacific[i][j] && canReachAtlantic[i][j]) {
                result.push([i, j]);
            }
        }
    }
    return result;
}

function bfs(matrix, visited, canReach, start, isEdge) {
    // Time: 5*O(n*m) = O(n*m)
    // Space: O(n*m)
    let queue = [];
    let idxQueue = 0;

    queue.push(start);
    while (idxQueue < queue.length) {
        let element = queue[idxQueue++]; // pop
        let neighbors = [
            { row: element.row - 1, col: element.col }, // up
            { row: element.row, col: element.col + 1 }, // right
            { row: element.row + 1, col: element.col }, // down
            { row: element.row, col: element.col - 1 }, // left
        ];

        for (let neighbor of neighbors) {
            let row = neighbor.row, col = neighbor.col;
            if (
                isNeighborValid(neighbor, matrix) &&
                !visited[row][col] &&
                (matrix[element.row][element.col] <= matrix[row][col] ||isEdge(matrix, row, col))
            ) {
                visited[row][col] = true;
                canReach[row][col] = true;
                queue.push(neighbor);
            }
        }
    }
}

function generateMatrix(nrOfRows, nrOfCols, defaultValue) {
    return new Array(nrOfRows).fill().map(() => new Array(nrOfCols).fill(defaultValue));
}

function isAtlanticEdge(matrix, row, col) {
    return row === matrix.length - 1 || col === matrix[0].length - 1;
}

function isPacificEdge(matrix, row, col) {
    return row === 0 || col === 0;
}

function isNeighborValid(neighbor, matrix) {
    let nrOfRows = matrix.length;
    let nrOfCols = matrix[0].length;

    let row = neighbor.row, col = neighbor.col;
    return row >= 0 && row < nrOfRows && col >= 0 && col < nrOfCols;
}

console.log(pacificAtlantic([[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]))