// https://leetcode.com/problems/counting-bits/

function countBits(num) {
    return countBitsWithLSB(num);
}

function countBitsWithLSB(num) {
    // Time: O(num)
    // Space: O(num)
    // dp[i] = nr of 1s for i
    // dp[i] = nr of 1s for dp[i/2] + 1 if i odd and 0 if even. i/2 will have the same numbers of 1s as i
    let dp = new Array(num + 1).fill(0);
    dp[0] = 0;
    for (let i = 1; i <= num; i++) {
        dp[i] = dp[Math.floor(i / 2)] + i % 2;
    }
    return dp;
}

function countBitsWithPowersOfTwo(num) {
    // Time: O(n)
    // Space: O(n)
    // dp[i] = nr of 1s for number i
    // dp[i]    = 1 if i is a power of 2
    //          = dp[lastPowerOfTwo] (which is always 1) + dp[i-lastPowerOfTwo] - we make the observation that a number can be composed as the sum of the last power of two + a smaller number, which is equal to current number minus last power of two, and this property is kept for the numbers of 1 as well
    if (num === 0) return [0];
    let dp = new Array(num + 1).fill(0);
    let nextPowerOfTwo = 2;
    let lastPowerOfTwo = 1;

    dp[0] = 0;
    dp[1] = 1;
    for (let i = 2; i <= num; i++) {
        if (i === nextPowerOfTwo) {
            dp[i] = 1;
            lastPowerOfTwo = nextPowerOfTwo;
            nextPowerOfTwo *= 2;
        } else {
            dp[i] = dp[lastPowerOfTwo] + dp[i - lastPowerOfTwo];
        }
    }
    return dp;
}

console.log(countBits(2));
console.log(countBits(7));