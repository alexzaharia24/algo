// https://leetcode.com/problems/01-matrix/

function updateMatrix(matrix) {
    return solveWithMultipleStartNodes(matrix);
}

function solveWithMultipleStartNodes(matrix) {
    // Time: O(n*m)
    let nrOfRows = matrix.length;
    let nrOfCols = matrix[0].length;

    let zeros = [];
    for (let i = 0; i < nrOfRows; i++) {
        for (let j = 0; j < nrOfCols; j++) {
            if (matrix[i][j] === 0) {
                zeros.push({ row: i, col: j, distance: 0 })
            }
        }
    }

    return bfsWithMultipleStarts(matrix, zeros);
}

function bfsWithMultipleStarts(matrix, starts) {
    // Time: O(V+E) = O(n*m + 4*n*m) = O(n*m)
    // Space: O(n*m)
    let result = new Array(matrix.length).fill().map(() => Array(matrix[0].length).fill(-1));
    let visited = new Array(matrix.length).fill().map(() => Array(matrix[0].length).fill(false));
    let queue = [];

    // Mark zeros as visited and add them to queue
    for (let start of starts) {
        visited[start.row][start.col] = true;
        queue.push(start);
    }

    while (queue.length > 0) {
        let element = queue.shift();
        let value = matrix[element.row][element.col];

        let neighbors = [
            { row: element.row - 1, col: element.col, distance: element.distance + 1 }, // up
            { row: element.row, col: element.col + 1, distance: element.distance + 1 }, // right
            { row: element.row + 1, col: element.col, distance: element.distance + 1 }, // down
            { row: element.row, col: element.col - 1, distance: element.distance + 1 }, // left
        ];

        if (value === 0) {
            result[element.row][element.col] = 0;
        }
        for (let neighbor of neighbors) {
            if (isNeighborValid(neighbor, matrix) && !visited[neighbor.row][neighbor.col]) {
                // Get the min distance from the neighbors. It is guaranteed that at least 1 neighbor will have the distance set since the 1s will be visited after all 0s have been visited
                visited[neighbor.row][neighbor.col] = true;
                queue.push(neighbor);
                result[neighbor.row][neighbor.col] = result[element.row][element.col] + 1;

            }
        }
    }

    return result;
}

function solveWithBrute(matrix) {
    // Time: O(n^2 * m^2) = O(n*m) * O(n*m)
    let result = new Array(matrix.length).fill().map(() => Array(matrix[0].length).fill(0));

    let nrOfRows = matrix.length;
    let nrOfCols = matrix[0].length;
    for (let i = 0; i < nrOfRows; i++) {
        for (let j = 0; j < nrOfCols; j++) {
            if (matrix[i][j] === 1) {
                result[i][j] = bfsBrute(matrix, i, j);;
            }
        }
    }

    return result;
}

function bfsBrute(matrix, row, col) {
    // Time: O(V + E) = O((n*m) + 4*n*m) = O(n*m)
    // Space: O(n*m)
    let visited = new Array(matrix.length).fill().map(() => Array(matrix[0].length).fill(false));
    let queue = [];
    queue.push({ row, col, distance: 0 });
    visited[row][col] = true;
    while (queue.length > 0) {
        let element = queue.shift();
        let value = matrix[element.row][element.col];
        if (value === 0) return element.distance; // 0 is the searched value
        let neighbors = [
            { row: element.row - 1, col: element.col, distance: element.distance + 1 }, // up
            { row: element.row, col: element.col + 1, distance: element.distance + 1 }, // right
            { row: element.row + 1, col: element.col, distance: element.distance + 1 }, // down
            { row: element.row, col: element.col - 1, distance: element.distance + 1 }, // left
        ];
        for (let neighbor of neighbors) {
            if (isNeighborValid(neighbor, matrix) && !visited[neighbor.row][neighbor.col]) {
                visited[neighbor.row][neighbor.col] = true;
                queue.push(neighbor);
            }
        }
    }

}

function isNeighborValid(neighbor, matrix) {
    let nrOfRows = matrix.length;
    let nrOfCols = matrix[0].length;

    let row = neighbor.row, col = neighbor.col;
    return row >= 0 && row < nrOfRows && col >= 0 && col < nrOfCols;
}

console.log(updateMatrix(
    [[0, 0, 0], [0, 1, 0], [1, 1, 1]])
)