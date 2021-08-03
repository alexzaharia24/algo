// 1.7 Rotate Matrix: Given an image represented by an NxN matrix, where each pixel in the image is 4
// bytes, write a method to rotate the image by 90 degrees. (an you do this in place?
// Hints: #51, #100

// O(NxN) time and space
function rotateMatrixWithNewMatrix(matrix) {
    let N = matrix.length;
    if (N === 0) return matrix;

    if (matrix[0].length !== N) {
        return null;
    }
    let newMatrix = new Array(N).fill().map(() => new Array(N));

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            newMatrix[j][N - i - 1] = matrix[i][j];
            // Or matrix[N-j-1][i] = newMatrix[i][j]
        }
    }
    console.log(newMatrix);
}

// O(NxN) time and O(1) space
function rotateMatrixInPlace(matrix) {
    let N = matrix.length;
    if (N === 0 || matrix[0].length !== N) return null;
    for (let level = 0; level < N / 2; level++) {
        for (let column = level; column < N - level - 1; column++) {
            // swap top element with right element
            [matrix[level][column], matrix[column][N - level - 1]] = [matrix[column][N - level - 1], matrix[level][column]];
            // swap top element with bottom element
            [matrix[level][column], matrix[N - level - 1][N - column - 1]] = [matrix[N - level - 1][N - column - 1], matrix[level][column]];
            // swap top element with left element
            [matrix[level][column], matrix[N - column - 1][level]] = [matrix[N - column - 1][level], matrix[level][column]];

            console.log(matrix);
        }
    }

    return matrix;
}


let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
console.log(rotateMatrixInPlace((matrix)));
console.log(rotateMatrixWithNewMatrix(([])));
console.log(rotateMatrixWithNewMatrix(([1])));