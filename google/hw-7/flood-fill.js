// https://leetcode.com/problems/flood-fill/

function floodFill(image, sr, sc, newColor) {
    // BFS
    // Time: O(n*m)
    // Space: O(n*m)
    let nrOfRows = image.length;
    let nrOfCols = image[0].length;
    let result = [];

    for (let i = 0; i < nrOfRows; i++) {
        result.push(new Array(nrOfCols));
        for (let j = 0; j < nrOfCols; j++) {
            result[i][j] = image[i][j];
        }
    }

    let queue = [];
    let visited = new Array(nrOfRows).fill().map(() => new Array(nrOfCols).fill(false));
    queue.push({ row: sr, col: sc });
    visited[sr][sc] = true;
    result[sr][sc] = newColor;
    while (queue.length > 0) {
        let element = queue.shift();

        let neighbors = [
            { row: element.row - 1, col: element.col }, // up
            { row: element.row, col: element.col + 1 }, // right
            { row: element.row + 1, col: element.col }, // down
            { row: element.row, col: element.col - 1 }, // left
        ];

        for (let neighbor of neighbors) {
            let row = neighbor.row, col = neighbor.col;
            if (isNeighborValid(neighbor, image) && !visited[row][col] && image[row][col] === image[sr][sc]) {
                visited[row][col] = true;
                queue.push(neighbor);
                result[row][col] = newColor;
            }
        }
    }
    return result;
}

function isNeighborValid(neighbor, matrix) {
    let nrOfRows = matrix.length;
    let nrOfCols = matrix[0].length;

    let row = neighbor.row, col = neighbor.col;
    return row >= 0 && row < nrOfRows && col >= 0 && col < nrOfCols;
}

console.log(floodFill([[1,1,1],[1,1,0],[1,0,1]], 1,1,2));