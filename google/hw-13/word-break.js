// https://leetcode.com/problems/word-break/

function wordBreak(s, wordDict) {
    return wordBreakDP(s, wordDict);
}

function wordBreakDP(s, wordDict) {
    // Time: O(n^3) - n = length of s
    // Space: O(m) - m = nr of words in wordDict
    // dp[i] = true if the first i letters of s can be split into words from wordDict
    // dp[i] = true if we can add a word from wordDict to the end of an already split sequence, more specifically if there is a j such that the substring [j,i] is a word from wordDict and [0, j) is an already split sequence (dp[j-1] is true)

    if (s.length === 0 || wordDict.length === 0) return false;

    let dp = new Array(s.length).fill(false);
    let map = {};
    for (let word of wordDict) {
        map[word] = true;
    }

    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j <= i; j++) {
            let substring = s.substr(j, i - j+1) // O(n) time
            // console.log(substring);
            // if (substring in map && (j-1 < 0 || dp[j-1] === true)) {
            if(substring in map && (i - substring.length < 0 || dp[i-substring.length] === true)) {
                dp[i] = true;
            }
        }
    }

    return dp[s.length-1];
}

function wordBreakAllCombinations(s, wordDict) {
    let canSegment = false;
    for (let word of wordDict) {
        canSegment = canSegment || dfs(s, 0, wordDict, word);
    }
    return canSegment;
}

function dfs(s, idx, words, word) {
    // Time: O(w^n) - w=nr of words, n=nr of chars in s
    // Space: O(n) - recursion stack (depth of n for the call tree)
    if (idx === s.length) {
        return true;
    }

    if (s.substr(idx, word.length) === word) {
        // 'word' fits the substring
        let canSegment = false;
        for (let w of words) {
            canSegment = canSegment || dfs(s, idx + word.length, words, w);
        }
        return canSegment;
    }

    return false;
}

console.log(wordBreak("leetcode", ["leet", "code"]));
console.log(wordBreak("applepenapple", ["apple", "pen"]));
console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]));
