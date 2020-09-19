// https://leetcode.com/problems/jump-game-iii/

function canReach(arr, start) {
    if (arr.length === 0) return false;

    let visited = new Array(arr.length).fill(false);
    return dfs(arr, visited, start, 0);
}

function dfs(arr, visited, idx, target) {
    // Time: O(n)
    // Space: O(n)
    if (idx < 0 || idx >= arr.length || visited[idx]) {
        return false;
    }
    visited[idx] = true;
    if (arr[idx] === target) return true;

    let left = idx - arr[idx], right = idx + arr[idx];
    return dfs(arr, visited, idx - arr[idx], target) || dfs(arr, visited, idx + arr[idx], target);
}

console.log(canReach([4, 2, 3, 0, 3, 1, 2], 0))
console.log(canReach([4, 2, 3, 0, 3, 1, 2], 5))
console.log(canReach([3, 0, 2, 1, 2], 2))