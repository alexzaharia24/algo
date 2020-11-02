// https://leetcode.com/problems/longest-common-subsequence/

function longestCommonSubsequence(text1, text2) {
    // Time: O(n*m) - where n = len(text1), m = len(text2)
    // Space: O(n*m)
    // dp[i][j] = length of longest common subsequence for the first i letters from text1 and first j letters from text2
    // dp[i][j] = dp[i-1][j-1] + 1 if there is a letter match at letters i-1 and j-1
    //          = max(dp[i-1][j], dp[i][j-1]) if there is no letter match. You take the max length so far
    if (text1.length === 0 || text2.length === 0) return 0;

    let dp = new Array(text1.length).fill().map(() => new Array(text2.length).fill(0));

    for (let i = 0; i < text1.length; i++) {
        for (let j = 0; j < text2.length; j++) {
            if (text1[i] === text2[j]) {
                let diagonal = 0;
                if (i - 1 >= 0 && j - 1 >= 0) {
                    diagonal = dp[i - 1][j - 1];
                }
                dp[i][j] = diagonal + 1;
            } else {
                let left = 0, top = 0;
                if (i - 1 >= 0) left = dp[i - 1][j];
                if (j - 1 >= 0) top = dp[i][j - 1];
                dp[i][j] = Math.max(left, top);
            }
        }
    }

    return dp[text1.length - 1][text2.length - 1];
}

// console.log(longestCommonSubsequence("abcde", "ace"));
// console.log(longestCommonSubsequence("abc", "abc"));
// console.log(longestCommonSubsequence("abc", "def"));
console.log(longestCommonSubsequence("ezupkr", "ubmrapg"));