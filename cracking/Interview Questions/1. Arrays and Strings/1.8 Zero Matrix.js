// 1.8 Zero Matrix: Write an algorithm such that if an element in an MxN matrix is 0, its entire row and
// column are set to O.
// Hints: # 17, #74, #102

// O(N*M) time, O(N*M) space
function zeroMatrix(matrix) {
    let zeroElements = [];
    let N = matrix.length;
    if (N === 0) return null;
    let M = matrix[0].length;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (matrix[i][j] === 0) {
                zeroElements.push({ row: i, col: j });
            }
        }
    }

    for (let pos of zeroElements) {
        // zero elements on the row and column
        zeroRowAndCol(matrix, N, M, pos.row, pos.col);
    }
    return matrix;
}

function zeroRowAndCol(matrix, rows, cols, row, col) {
    for (let c = 0; c < cols; c++) {
        matrix[row][c] = 0;
    }
    for (let r = 0; r < rows; r++) {
        matrix[r][col] = 0;
    }
}

// O(N*M) time, O(N+M) space
function zeroMatrixWithOnlyRowsAndCols(matrix) {
    let zeroRows = new Map();
    let zeroCols = new Map();
    let N = matrix.length;
    if (N === 0) return null;
    let M = matrix[0].length;

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (matrix[i][j] === 0) {
                zeroRows.set(i, true);
                zeroCols.set(j, true);
            }
        }
    }

    for (let [row, _] of zeroRows) {
        for (let col = 0; col < M; col++) {
            matrix[row][col] = 0;
        }
    }
    for (let [col, _] of zeroCols) {
        for (let row = 0; row < M; row++) {
            matrix[row][col] = 0;
        }
    }
    return matrix;
}

// O(N*M) time, O(1) space
function zeroMatrixWithOnlyRowsAndColsNoExtraSpace(matrix) {
    let N = matrix.length;
    if (N === 0) return null;
    let M = matrix[0].length;


    let firstRowIsZero = false, firstColIsZero = false;

    for (let col = 0; col < M; col++) {
        if (matrix[0][col] === 0) {
            firstRowIsZero = true;
            break;
        }
    }

    for (let row = 0; row < N; row++) {
        if (matrix[row][0] === 0) {
            firstColIsZero = true;
            break;
        }
    }

    for (let i = 1; i < N; i++) {
        for (let j = 1; j < M; j++) {
            if (matrix[i][j] === 0) {
                matrix[0][j] = 0;
                matrix[i][0] = 0;
            }
        }
    }

    // Negate cols if there are 0s in the first row
    for (let col = 0; col < M; col++) {
        if (matrix[0][col] === 0) {
            negateCol(matrix, col, M);
        }
    }

    // Negate rows if there are 0s on the first column
    for (let row = 0; row < N; row++) {
        if (matrix[row][0] === 0) {
            negateRow(matrix, row, N);
        }
    }

    if (firstRowIsZero) {
        negateRow(matrix, 0, M);
    }
    if (firstColIsZero) {
        negateCol(matrix, 0, N);
    }

    return matrix;
}

function negateRow(matrix, row, cols) {
    for (let col = 0; col < cols; col++) {
        matrix[row][col] = 0;
    }
}

function negateCol(matrix, col, rows) {
    for (let row = 0; row < rows; row++) {
        matrix[row][col] = 0;
    }
}

console.log(zeroMatrix([
    [1, 0],
    [2, 3]]
));
console.log(zeroMatrix([
    [1, 0, 3],
    [3, 4, 5],
    [0, 7, 8]]
));

console.log(zeroMatrixWithOnlyRowsAndCols([
    [1, 0],
    [2, 3]]
));
console.log(zeroMatrixWithOnlyRowsAndCols([
    [1, 0, 3],
    [3, 4, 5],
    [0, 7, 8]]
));

console.log(zeroMatrixWithOnlyRowsAndColsNoExtraSpace([
    [1, 0],
    [2, 3]]
));
console.log(zeroMatrixWithOnlyRowsAndColsNoExtraSpace([
    [1, 0, 3],
    [3, 4, 5],
    [0, 7, 8]]
));