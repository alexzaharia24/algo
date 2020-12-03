// https://leetcode.com/problems/is-subsequence/

function isSubsequence(s, t) {
    // Time: O(n)
    // Space: O(1)
    let i = 0, j = 0;
    if(s.length === 0) return true; // The empty string is always a subsequence
    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) {
            i++;
        }
        j++;
    }
    return i === s.length; // This means that "s" has all its letters in "t"
}

console.log(isSubsequence("abc", "ahbgdc"))
console.log(isSubsequence("axc", "ahbgdc"))