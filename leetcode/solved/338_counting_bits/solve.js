// How to represent a number in binary
// const { decToBinaryString }  = require("../../../utils/binary/bit-manipulation");

const decToBinaryString = (n) => {
    const bits = []; // Most significant bit last

    while (n > 0) {
        const bit = n % 2;
        bits.push(bit);
        n = Math.floor(n / 2);
    }

    return bits.reverse().join('');
}

const countOnes = (binaryString) => {
    let ones = 0;

    for (const digit of binaryString) {
        if (digit % 2 === 1) {
            ones++;
        }
    }

    return ones;
}

// Go through each number from 1 to n
// for each number convert it to binary
// then count each 1 from the binary representation
// add it to the result array
//
// Time: O(nlogn)
// Space: O(n + logn)
const countBitsNaive = (n) => {
    const bitCounts = [];

    for (let i = 0; i <= n; i++) {
        const binaryString = decToBinaryString(i);
        const ones = countOnes(binaryString);

        bitCounts.push(ones);
    }

    return bitCounts;
}

// Time: O(1)
// Space: O(n)
// We only need dto run the recursive function twice because the cache will have the results
// for n/2 already
const countOnesWithCache = (n, cache) => {
    if (cache[n] !== undefined) return cache[n];

    if (n === 0) return 0;
    if (n === 1) return 1;

    if (n % 2 === 1) {
        return 1 + countOnesWithCache(Math.floor(n / 2), cache);
    }

    return countOnesWithCache(Math.floor(n / 2), cache)
}

// Time: O(n)
// Space: O(n)
const countBitsWithCache = (n) => {
    const cache = new Array(n+1);

    for (let i = 0; i <= n; i++) {
        const ones = countOnesWithCache(i, cache);
        cache[i] = ones;
    }

    return cache;
}

// Time: O(n)
// Space: O(n)
const countBitsDp = (n) => {
    const dp = new Array(n + 1);
    let offset = 1; // Powers of two

    dp[0] = 0; // No 1s for 0

    for (let i = 1; i <= n; i++) {
        if (offset * 2 === i) {
            offset = i;
        }

        dp[i] = 1 + dp[i - offset]; // e.g dp[4] = 1 + dp[0] = 1 + 0 = 1
    }

    return dp;
}

const countBits = (n) => {
    // Option 1
    // return countBitsNaive(n);

    // Option 2
    // return countBitsWithCache(n);

    // Option 3
    return countBitsDp(n);
}

console.log(countBits(10));
// console.log(decToBinaryString(85723));