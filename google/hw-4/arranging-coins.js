// https://leetcode.com/problems/arranging-coins/

function arrangeCoins(n) {
    // ~O(sqrt(n)): 
    //      there are x steps on solving the problem => O(x) complexity
    // O(1) space
    let k = 1, rows = 0;
    while (n > 0) {
        n -= k;
        k++;
        if (n >= 0) rows++;
    }

    return rows;
}

function quadraticSolution(n) {
    // O(1) time
    // O(1) space
    return parseInt((-1 / 2) + Math.sqrt(1 + 4 * 2 * n) / 2);
}

function binarySearch(n) {
    // O(logn) time
    // O(1) space
    let left = 0, right = n;
    while (left <= right) {
        let middle = parseInt((left + right) / 2);
        let sum = (middle * (middle + 1)) / 2;
        if (sum === n) return middle;
        else if (sum > n) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }
    return right;
}

// console.log(arrangeCoins(6));
// console.log(arrangeCoins(9));
console.log(quadraticSolution(6));
console.log(quadraticSolution(9));
console.log(quadraticSolution(10));
console.log(binarySearch(6));
console.log(binarySearch(9));
console.log(binarySearch(10));
