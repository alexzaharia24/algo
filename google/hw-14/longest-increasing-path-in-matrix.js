// https://leetcode.com/problems/longest-increasing-path-in-a-matrix/

function longestIncreasingPath(matrix) {
    return longestIncreasingPathIterative(matrix);
}

function longestIncreasingPathIterative(matrix) {
    // Time: O(n*m), n=rows, m=cols
    // Space: O(n*m)
    // Will need topo sort
    // dp[i][j] = max length of the subsequence ending in (i,j)
    // dp[i][j] = max length of dp[k][u]  + 1 where (k,u) is a node which comes before (i,j) in topo order and (i,j) can be reached from (k,u)

    let rows = matrix.length;
    if (rows === 0) return 0;
    let cols = matrix[0].length;
    let topoOrder = topoSortBFS(rows, cols, matrix);

    let dp = new Array(rows).fill()
        .map(() => new Array(cols).fill(1));


    for (let i = 0; i < topoOrder.length; i++) {
        for (let j = 0; j < i; j++) {
            let currentNode = topoOrder[i];
            let prevNode = topoOrder[j];
            if (isNeighbour(currentNode.row, currentNode.col, prevNode.row, prevNode.col, rows, cols, matrix)) {
                dp[currentNode.row][currentNode.col] = Math.max(dp[currentNode.row][currentNode.col], 1 + dp[prevNode.row][prevNode.col]);
            }
        }
    }

    let maxLength = 1;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            maxLength = Math.max(maxLength, dp[i][j]);
        }
    }
    return maxLength;
}

function topoSortBFS(rows, cols, matrix) {
    // Time: O(n + m), n=nr vertices, m=nr edges
    // Space: O(n + m)
    let inEdges = new Array(rows).fill() // inEdges[i] = nr of edges from any node to node (i,j)
        .map(() => new Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let neighbours = [
                { row: i - 1, col: j }, // UP
                { row: i, col: j + 1 }, // RIGHT
                { row: i + 1, col: j }, // DOWN
                { row: i, col: j - 1 }, // LEFT
            ]
            for (let neighbour of neighbours) {
                if (isPositionValid(neighbour.row, neighbour.col, rows, cols) && matrix[neighbour.row][neighbour.col] < matrix[i][j]) {
                    inEdges[i][j]++;
                }
            }
        }
    }

    let queue = []; // We will add nodes with inEdges[i][j] = 0 to the queue
    let queueIdx = 0;
    let order = []; // The topological order, which is the result

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (inEdges[i][j] === 0) {
                queue.push({ row: i, col: j }); // Add nodes with 0 in edges as starting points
            }
        }
    }

    while (queueIdx < queue.length) {
        let node = queue[queueIdx++]; // queue pop_front
        let neighbours = [
            { row: node.row - 1, col: node.col }, // UP
            { row: node.row, col: node.col + 1 }, // RIGHT
            { row: node.row + 1, col: node.col }, // DOWN
            { row: node.row, col: node.col - 1 }, // LEFT
        ]
        for (let neighbour of neighbours) {
            if (isPositionValid(neighbour.row, neighbour.col, rows, cols) && matrix[neighbour.row][neighbour.col] > matrix[node.row][node.col]) {
                inEdges[neighbour.row][neighbour.col]--; // Decrease the nr of in edges for the neighbours of 'node'
                if (inEdges[neighbour.row][neighbour.col] === 0) {
                    queue.push(neighbour); // Add to queue if there are no more incoming edges to the neighbour
                }
            }

        }
        order.push(node);

    }

    return order;
}

function isPositionValid(i, j, rows, cols) {
    return i >= 0 && i < rows && j >= 0 && j < cols;
}

function isNeighbour(i1, j1, i2, j2, rows, cols, matrix) {
    return isPositionValid(i2, j2, rows, cols) &&
        (
            (i2 === i1 - 1 && j2 === j1) || // UP
            (i2 === i1 && j2 === j1 + 1) || // RIGHT
            (i2 === i1 + 1 && j2 === j1) || // DOWN
            (i2 === i1 && j2 === j1 - 1)  // LEFT
        ) &&
        matrix[i2][j2] < matrix[i1][j1]
}

function longestIncreasingPathRecursive(matrix) {
    // Time: O(n*m)
    // Space: O(n*m)
    // dp[i][j] = max length of the subsequence ending in (i,j)
    // dp[i][j] = 1 + max of the lengths of its neighbors (up, right, down, left)
    let rows = matrix.length;
    if (rows === 0) return 0;
    let cols = matrix[0].length;
    let dp = new Array(rows).fill()
        .map(() => new Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            recursive(i, j, rows, cols, dp, matrix); // This is O(1) amortized
        }
    }

    let maxLength = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            maxLength = Math.max(maxLength, dp[i][j]);
        }
    }
    return maxLength;
}

function recursive(i, j, rows, cols, dp, matrix) {
    if (i < 0 || i >= rows || j < 0 || j >= cols) {
        return 0;
    }

    if (dp[i][j] !== 0) return dp[i][j];

    let maxLengthForPosition = 1;
    let neighbours = [
        { row: i - 1, col: j }, // UP
        { row: i, col: j + 1 }, // RIGHT
        { row: i + 1, col: j }, // DOWN
        { row: i, col: j - 1 }, // LEFT
    ]

    for (let neighbour of neighbours) {
        if (isPositionValid(neighbour.row, neighbour.col, rows, cols) && matrix[neighbour.row][neighbour.col] < matrix[i][j]) {
            maxLengthForPosition = Math.max(maxLengthForPosition, 1 + recursive(neighbour.row, neighbour.col, rows, cols, dp, matrix))
        }
    }
    dp[i][j] = maxLengthForPosition;
    return maxLengthForPosition;
}

console.log(longestIncreasingPath([
    [9, 9, 4],
    [6, 6, 8],
    [2, 1, 0]]
))

console.log(longestIncreasingPath(
    [
        [3, 4, 5],
        [3, 2, 6],
        [2, 2, 1]
    ]
))

console.log(longestIncreasingPath(
    [[7, 0, 8], [4, 7, 8], [4, 7, 4]]
))