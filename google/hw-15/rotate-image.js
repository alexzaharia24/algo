// https://leetcode.com/problems/rotate-image/

function rotate(matrix) {
    return rotateCocioSolutionSimple(matrix);
}

function rotateMySolution(matrix) {
    // Time: O(n*n)
    // Space: O(1)
    let n = matrix.length;
    if (n <= 1) return matrix;

    // We will have 4 points for swapping: p1 ... p4
    let p1, p2, p3, p4;
    // Swap at every iteration in the following order: p1 with p2, p1 with p3, p3 with p4
    // Then update the points
    // Repeat until p1[1] < n, for n/2 levels (going a level deeper each iteration)
    for (let level = 0; level < n / 2; level++) {
        p1 = [level, level];
        p2 = [level, n - 1 - level];
        p3 = [n - 1 - level, level];
        p4 = [n - 1 - level, n - 1 - level];

        while (p1[1] < n - 1 - level) {
            [matrix[p1[0]][p1[1]], matrix[p2[0]][p2[1]]] = [matrix[p2[0]][p2[1]], matrix[p1[0]][p1[1]]];
            [matrix[p1[0]][p1[1]], matrix[p3[0]][p3[1]]] = [matrix[p3[0]][p3[1]], matrix[p1[0]][p1[1]]];
            [matrix[p3[0]][p3[1]], matrix[p4[0]][p4[1]]] = [matrix[p4[0]][p4[1]], matrix[p3[0]][p3[1]]];

            p1 = [p1[0], p1[1] + 1];
            p2 = [p2[0] + 1, p2[1]];
            p3 = [p3[0] - 1, p3[1]];
            p4 = [p4[0], p4[1] - 1];
        }
    }

    return matrix;
}

function rotateCocioSolutionSimple(matrix) {
    let n = matrix.length;
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n - i - 1; j++) {
            let aux = matrix[j][n - i - 1]; // Remember rightmost corner
            matrix[j][n - i - 1] = matrix[i][j];
            matrix[i][j] = matrix[n - j - 1][i];
            matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
            matrix[n - i - 1][n - j - 1] = aux;
        }
    }
    return matrix;
}

console.log(rotate([[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]))