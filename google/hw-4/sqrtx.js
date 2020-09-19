// https://leetcode.com/problems/sqrtx/

// function binarySearch(x) {
//     // O(logn) time
//     // O(1) space
//     if (x === 0 || x === 1) return x;
//     let left = 0, right = parseInt(x / 2) + 1;
//     while (left <= right) {
//         let middle = parseInt(left + (right - left) / 2);
//         let square = middle * middle;
//         let squareBefore = (middle - 1) * (middle - 1);
//         if (square === x) {
//             return middle;
//         } else if (squareBefore <= x && square > x) {
//             return middle - 1;
//         } else if (squareBefore > x) {
//             right = middle - 1;
//         } else if (square < x) {
//             left = middle + 1;
//         }
//     }

//     return -1;
// }

function binarySearch(x) {
    // O(logn) time
    // O(1) space
    if (x === 0 || x === 1) return x;
    let left = 0, right = x;
    while (left <= right) {
        let middle = parseInt((left + right ) /2);
        let square = middle * middle;
        if (square === x) {
            return middle;
        } else if (square < x) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return right;
}

function mySqrt(x) {
    return binarySearch(x);
}

console.log(mySqrt(4));
console.log(mySqrt(6));
console.log(mySqrt(8));
console.log(mySqrt(9));
console.log(mySqrt(15));