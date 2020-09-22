// https://leetcode.com/problems/as-far-from-land-as-possible/

function maxDistance(grid) {
    return maxDistanceBFS(grid);
}

function maxDistanceBrute(grid) {
    // Time: O(|nrOfLandCells} * |nrOfWaterCells|) ~= O(n^2) n - nr of nodes
    // Space: O(n^2)
    let nrOfRows = grid.length;
    let nrOfCols = grid[0].length;
    let waterCells = [];
    let landCells = [];

    for (let row = 0; row < nrOfRows; row++) {
        for (let col = 0; col < nrOfCols; col++) {
            let cell = { row: row, col: col };
            if (grid[row][col] === 0) {
                waterCells.push(cell);
            } else {
                landCells.push(cell);
            }
        }
    }

    if (waterCells.length === 0 || landCells.length === 0) return -1;

    let maxDistanceForAll = 0;
    for (let waterCell of waterCells) {
        let x0 = waterCell.row, y0 = waterCell.col;
        let minDistanceForThisWaterCell = Infinity;
        for (let landCell of landCells) {
            let x1 = landCell.row, y1 = landCell.col;
            let distance = Math.abs(x0 - x1) + Math.abs(y0 - y1);
            minDistanceForThisWaterCell = Math.min(distance, minDistanceForThisWaterCell);
        }
        maxDistanceForAll = Math.max(minDistanceForThisWaterCell, maxDistanceForAll);
    }

    return maxDistanceForAll;
}

function maxDistanceBFS(grid) {
    // Time: O(n + m) - n = nr of nodes, m = nr of edges
    // Space: O(n) - n = nr of nodes
    let nrOfRows = grid.length;
    let nrOfCols = grid[0].length;
    let nrOfNodes = nrOfRows * nrOfCols;
    let queue = [];
    let idxQueue = 0;
    let visited = createMatrix(nrOfRows, nrOfCols, false);
    let distances = createMatrix(nrOfRows, nrOfCols, 0);

    for (let row = 0; row < nrOfRows; row++) {
        for (let col = 0; col < nrOfCols; col++) {
            let cell = { row: row, col: col };
            if (grid[row][col] === 1) {
                queue.push(cell);
                visited[row][col] = true;
            }
        }
    }

    // Verify if no water or land cells
    if (queue.length === 0 || queue.length === nrOfNodes) {
        return -1;
    }

    let maxDist = 0;
    while (idxQueue < queue.length) {
    console.log(queue);
        let cell = queue[idxQueue++];
        let neighbors = [
            { row: cell.row - 1, col: cell.col }, // up
            { row: cell.row, col: cell.col + 1 }, // right
            { row: cell.row + 1, col: cell.col }, // down
            { row: cell.row, col: cell.col - 1 }, // left
        ]

        for (let neighbor of neighbors) {
            if (isCellValid(nrOfRows, nrOfCols, neighbor.row, neighbor.col) && !visited[neighbor.row][neighbor.col]) {
                console.log(neighbor)
                distances[neighbor.row][neighbor.col] = distances[cell.row][cell.col] + 1;
                maxDist = Math.max(distances[neighbor.row][neighbor.col], maxDist);
                visited[neighbor.row][neighbor.col] = true;
                queue.push(neighbor);
            }
        }
    }
    return maxDist;
}

function isCellValid(nrOfRows, nrOfCols, row, col) {
    return row >= 0 && row < nrOfRows && col >= 0 && col < nrOfCols;
}


function createMatrix(nrOfRows, nrOfCols, value) {
    return new Array(nrOfRows).fill().map(() => new Array(nrOfCols).fill(value));
}

console.log(maxDistance([[1, 0, 1], [0, 0, 0], [1, 0, 1]]))