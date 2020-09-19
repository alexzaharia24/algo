// https://leetcode.com/problems/longest-substring-without-repeating-characters/

function lengthOfLongestSubstring(s) {
    if (s.length === 0) return 0;
    let i = 0, j = 1;
    let hash = {};
    let maxLength = 1;
    hash[s[i]] = true;

    while (j < s.length) {
        while (s[j] in hash) {
            delete hash[s[i]];
            i++;
        }

        hash[s[j]] = true;
        maxLength = Math.max(maxLength, j - i + 1);
        j++;
    }

    return maxLength;
}

console.log(lengthOfLongestSubstring("abcabcbb"))
console.log(lengthOfLongestSubstring("bbbbb"))
console.log(lengthOfLongestSubstring("pwwkew"))
console.log(lengthOfLongestSubstring(""))