// https://leetcode.com/problems/most-frequent-subtree-sum/

function findFrequentTreeSum(root) {
    // Time: O(n) 
    // Space: O(n) recursive stack + frequencies map
    let frequencies = {};
    let result = [];
    dfs(root, frequencies);
    let maxFrequency = 0;
    for (let sum in frequencies) {
        maxFrequency = Math.max(frequencies[sum], maxFrequency)
    }

    for (let sum in frequencies) {
        if (frequencies[sum] === maxFrequency) {
            result.push(sum);
        }
    }
    return result;
}

function dfs(node, frequencies) {
    // Time: O(n) 
    // Space: O(n) recursive stack + frequencies map
    if (node === null) return 0;
    let sum = node.val + dfs(node.left, frequencies) + dfs(node.right, frequencies);
    let currentFrequency = frequencies[sum] ?? 0;
    frequencies[sum] = currentFrequency + 1;

    return sum;
}