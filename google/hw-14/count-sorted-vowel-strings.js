// https://leetcode.com/problems/count-sorted-vowel-strings/

function countVowelStrings(n) {
    // Time: O(n) (O(5*n) for optimized sum and O(25*n) for additional for)
    // Space: O(n) (O(5*n) more precisely)
    // dp[i][j] = nr of strings with length i that end in letter j, where j btw [0, 4], and maps to ['a','e','i','o','u]
    // dp[i][j] = Sum of dp[i-1][k], where k is btw [0,j]. Since we can add a letter only after a lexicoraphically smaller letter.

    if (n === 0) return 0;
    let dp = new Array(n + 1).fill().map(() => new Array(5).fill(0));

    for (let i = 0; i <= 4; i++) {
        dp[1][i] = 1;
    }

    for (let i = 2; i <= n; i++) {
        for (let j = 0; j <= 4; j++) {
            // 0 = a, 1 = e, 2 = i, 3 = o, 4 = u

            /* Iterate through all previous strings with last letter smaller lexicographically
            let sumForJ = 0;
            for (let k = 0; k <= j; k++) {
                sumForJ += dp[i - 1][k];
            }
            dp[i][j] = sumForJ;
            */

            // We can observe that the sum can also be obtained directly from dp[i-1][j] + dp[i][j-1]
            if (i - 1 >= 0) dp[i][j] += dp[i - 1][j];
            if (j - 1 >= 0) dp[i][j] += dp[i][j - 1];
        }
    }

    let result = 0;
    // We add together all the obtained strings with length n
    for (let j = 0; j <= 4; j++) {
        result += dp[n][j];
    }

    return result;
}


console.log(countVowelStrings(1)); // expected: 5
console.log(countVowelStrings(2)); // expected: 15
console.log(countVowelStrings(3)); // expected: 15