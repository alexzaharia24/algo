function visitNeighboursDfs(grid, row, col, visited) {
    // DFS
    // Possible Neighbours
    // grid[row - 1][col] - up
    // grid[row][col - 1] - left
    // grid[row + 1][col] - down
    // grid[row][col + 1] - right

    let neighbours = [
        { row: row - 1, col: col }, // up
        { row: row + 1, col: col }, // down
        { row: row, col: col - 1 }, // left
        { row: row, col: col + 1 }, // right
    ]

    neighbours.forEach((neighbour) => tryToVisit(grid, neighbour.row, neighbour.col, visited))
}

function visitNeighboursBfs(grid, row, col, visited) {
    let queue = [];
    let currentQueueSize = 0;

    queue.push({ row: row, col: col });
    while (queue.length > 0) {
        // currentQueueSize = queue.length;
        let node = queue.shift();

        let neighbours = [
            { row: node.row - 1, col: node.col }, // up
            { row: node.row + 1, col: node.col }, // down
            { row: node.row, col: node.col - 1 }, // left
            { row: node.row, col: node.col + 1 }, // right
        ]

        for (let n of neighbours) {
            tryToVisitNeighbourNextBfs(grid, n.row, n.col, visited, queue);
        }

        // while(currentQueueSize > 0) {
        //     currentQueueSize--;
        //     if (shouldVisit(grid, node.row, node.col, visited)) {
        //         visited[node.row][node.col] = 1;

        // let neighbours = [
        //     { row: row - 1, col: col }, // up
        //     { row: row + 1, col: col }, // down
        //     { row: row, col: col - 1 }, // left
        //     { row: row, col: col + 1 }, // right
        // ]

        //         // Add neighbours
        //         for (let neighbour of neighbours) {
        //             tryToVisitNeighbourNextBfs(grid, neighbour.row, neighbour.col, visited, queue);
        //         }

        //     }
        // }
    }

}

function tryToVisitNeighbourNextBfs(grid, row, col, visited, queue) {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) return;
    if (shouldVisit(grid, row, col, visited)) {
        visited[row][col] = 1;
        queue.push({ row: row, col: col })
    }

}


function tryToVisit(grid, row, col, visited) {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) return;

    if (shouldVisit(grid, row, col, visited)) {
        visit(grid, row, col, visited);
    }
}

function shouldVisit(grid, row, col, visited) {
    return visited[row][col] === 0 && grid[row][col] === '1';
}

function visit(grid, row, col, visited) {
    visited[row][col] = 1;
    visitNeighboursDfs(grid, row, col, visited);
}

function numIslands(grid) {
    // O(n^2) time
    // O(n^2) space

    let nrOfIslands = 0;
    let nrOfRows = grid.length;

    if (nrOfRows === 0) return 0;

    let nrOfColumns = grid[0].length;

    visited = new Array(nrOfRows).fill(null).map(row => new Array(nrOfColumns).fill(0));

    for (let row = 0; row < nrOfRows; row++) {
        for (let col = 0; col < nrOfColumns; col++) {
            if (shouldVisit(grid, row, col, visited)) {
                visitNeighboursBfs(grid, row, col, visited);
                nrOfIslands++;
            }
        }
    }

    return nrOfIslands;
}

let grid = [
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"]
]


/*

let grid = [
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"]
]

visited = [
    1 0 0 0 0
    1 0 0 0 0
    0 0 0 0 0
    0 0 0 0 0
]

nrOfIsland = 0

*/

console.log(numIslands(grid));

grid = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"]
]

console.log(numIslands(grid));
console.log(numIslands(grid));
