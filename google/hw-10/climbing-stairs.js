// https://leetcode.com/problems/climbing-stairs/

function climbStairs(n) {
    return climbStairsIterativeForwards(n);
}

function climbStairsRecursive(n) {
    // Time: O(n) 
    // Space: O(n)
    let memo = {};
    return dfs(0, n, memo);
}

function dfs(node, target, memo) {
    // Time: O(n) - which is actually 2n + 1 (deduced from call tree), each node will be called twice, and the second time the value for the node will be retrieved from the cache
    // Space: O(n) - recursion stack + memoisation
    if (node > target) return 0;
    if (node === target) return 1;
    let result1 = memo[node + 1] ?? dfs(node + 1, target, memo);
    let result2 = memo[node + 2] ?? dfs(node + 2, target, memo);
    memo[node] = result1 + result2;
    return memo[node];
}

function climbStairsIterativeBackwards(n) {
    // BACKWARDS DYNAMIC PROGRAMMING
    // Time: O(n)
    // Space: O(n) memoisation
    let memo = [];
    memo[0] = 1;
    memo[1] = 1;
    for (let i = 2; i <= n; i++) {
        memo[i] = memo[i - 2] + memo[i - 1];
    }
    return memo[n];
}

function climbStairsIterativeForwards(n) {
    // FORWARDS DYNAMIC PROGRAMMING
    // Time: O(n)
    // Space: O(n)
    let memo = new Array(n+1).fill(0);
    memo[0] = 1;
    for (let i = 0; i < n; i++) {
        memo[i + 1] += memo[i];
        memo[i + 2] += memo[i];
    }
    return memo[n];
}

console.log(climbStairs(5));