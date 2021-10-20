/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix) {
    return setZerosNoExtraSpace(matrix);
}

// Time: O(N*M), Extra space: O(N+M)
function setZerosExtraSpace(matrix) {
    let rows = matrix.length, cols = matrix[0].length;
    let zeroRows = new Array(rows).fill(false);
    let zeroCols = new Array(cols).fill(false);

    // Mark rows and cols that contain zeros
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === 0) {
                zeroRows[i] = true;
                zeroCols[j] = true;
            }
        }
    }

    // Make all the elements on rows and cols that have zero zero
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (zeroRows[i] || zeroCols[j]) {
                matrix[i][j] = 0;
            }
        }
    }

    return matrix;
}

// Time: O((N*M)*(N+M)), Extra space: O(1)
function setZerosNoExtraSpace(matrix) {
    let rows = matrix.length, cols = matrix[0].length;

    // Mark elements with null on rows and cols that there is at least one 0
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === 0) {
                // We use null to differentiate from 0
                replaceValueOnRowAndColExcept(matrix, i, j, null, 0);
            }
        }
    }

    // Replace the nulls with 0s
    replaceValue(matrix, null, 0);

    return matrix;
}


function replaceValueOnRowAndColExcept(matrix, row, col, value, exceptValue) {
    for (let i = 0; i < matrix.length; i++) {
        if(matrix[i][col] !== exceptValue) matrix[i][col] = value;
    }
    for (let j = 0; j < matrix[0].length; j++) {
        if(matrix[row][j] !== exceptValue) matrix[row][j] = value;
    }
    return matrix;
}

function replaceValue(matrix, oldValue, newValue) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === oldValue) {
                matrix[i][j] = newValue;
            }
        }
    }

    return matrix;
}

// let matrix = [
//     [1, 1, 1],
//     [1, 0, 1],
//     [1, 1, 1],
// ]
// console.log(setZerosNoExtraSpace(matrix));
// console.log(setZerosNoExtraSpace([
//     [0, 1, 2, 0],
//     [3, 4, 5, 2],
//     [1, 3, 1, 5]]
// ));
