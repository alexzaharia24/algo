// https://leetcode.com/problems/word-search/

function exist(board, word) {
    // Time: Exponential
    // Space: O(n*m)
    let rows = board.length;
    let cols = board[0].length;
    let visited = new Array(rows).fill().map(() => new Array(cols).fill(false))

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            visited[i][j] = true;
            if (recursion(board, word, i, j, [board[i][j]], visited, rows, cols)) {
                return true;
            }
            visited[i][j] = false;
        }
    }
    return false;
}

function recursion(board, word, i, j, path, visited, rows, cols) {
    if (path.length === word.length) {
        return path.join("") === word;
    } else if (path.length > 0 && path[path.length - 1] !== word[path.length - 1]) {
        return false;
    }

    let neighbors = [
        { row: i - 1, col: j }, // UP
        { row: i, col: j + 1 }, // RIGHT
        { row: i + 1, col: j }, // DOWN
        { row: i, col: j - 1 } // LEFT
    ]

    for (let neighbor of neighbors) {
        if (isPositionValid(neighbor.row, neighbor.col, rows, cols) && !visited[neighbor.row][neighbor.col]) {
            visited[neighbor.row][neighbor.col] = true;
            path.push(board[neighbor.row][neighbor.col]);
            
            if(recursion(board, word, neighbor.row, neighbor.col, path, visited, rows, cols)) {
                return true;
            }

            visited[neighbor.row][neighbor.col] = false;
            path.pop();
        }
    }

    return false;
}

function isPositionValid(i, j, rows, cols) {
    return i >= 0 && i < rows && j >= 0 && j < cols;
}

console.log(exist(["a","b"], "ba"));