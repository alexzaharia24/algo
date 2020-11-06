// https://leetcode.com/problems/perfect-squares/

function numSquares(n) {
    return numSquaresSimple(n);
}

function numSquaresSimple(n) {
    // Time: O(n*sqrt(n)) - there are sqrt(n) perfect squares up to n
    // Space: O(n)
    // dp[i] = min nr of squares that give the sum i
    // dp[i] = min between the sum of (dp[k] + its complement dp[i-k], where k = smaller perfect square than i)

    if (n === 0) return 0;
    let dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        for (let squareRoot = 1; squareRoot * squareRoot <= i; squareRoot++) { // O(sqrt(n)) time
            dp[i] = Math.min(dp[i], dp[i - squareRoot * squareRoot] + 1) // dp[i] = 1 if i is a perfect square
        }
    }

    return dp[n];
}

function numSquaresOptimized(n) {
    // Time: O(n*sqrt(n)) - there are sqrt(n) perfect squares up to n
    // Space: O(n)
    // dp[i] = min nr of squares that give the sum i
    // dp[i] = min between the sum of (dp[k] + its complement dp[i-k], where k = smaller perfect square than i)

    if (n === 0) return 0;
    let dp = new Array(n + 1).fill(0);
    dp[0] = 0;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        let squareRootI = Math.floor(Math.sqrt(i));
        if (i === (squareRootI * squareRootI)) {
            dp[i] = 1;
        } else {
            let minNrOfSquares = Infinity;
            for (let squareRoot = 1; squareRoot <= squareRootI; squareRoot++) { // O(sqrt(n)) time
                let square = squareRoot * squareRoot;
                let nrOfSquares = dp[square] + dp[i - square];
                minNrOfSquares = Math.min(nrOfSquares, minNrOfSquares);
            }
            dp[i] = minNrOfSquares;
        }
    }

    return dp[n];
}

console.log(numSquares(12)); // expected 3
console.log(numSquares(17)); // expected 2
console.log(numSquares(2)); // expected 2
console.log(numSquares(13)); // expected 2
console.log(numSquares(32)); // expected 2
console.log(numSquares(31)); // expected 4
console.log(numSquares(48)); // expected 3