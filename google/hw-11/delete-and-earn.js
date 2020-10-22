// https://leetcode.com/problems/delete-and-earn/

function deleteAndEarn(nums) {
    // Time: O(n^2)
    // Space: O(n)
    let maxGlobalPoints = 0;
    let values = {};

    for (let i = 0; i < nums.length; i++) {
        if (!(nums[i] in values)) {
            values[nums[i]] = [];
        }
        values[nums[i]].push(i);
    }

    let deleted = new Array(nums.length).fill(false);
    for (let i = 0; i < nums.length; i++) {
        // Loop is O(n) * O(n) = O(n^2)
        let points = dfs(i, deleted, nums, values);
        maxGlobalPoints = Math.max(maxGlobalPoints, points);
    }
    return maxGlobalPoints;
}

function dfs(idx, deleted, nums, values) {
    // Time: O(n)
    // Space: O(n)
    let maxLocalPoints = 0;
    deleted[idx] = true;
    let predecessors = values[nums[idx] - 1] || [];
    let successors = values[nums[idx] + 1] || [];
    // Perform deletion for current DFS
    let predecessorsDeleted = false, successorsDeleted = false;
    for (let p of predecessors) {
        if (!deleted[p]) {
            predecessorsDeleted = true;
            deleted[p] = true;
        }
    }
    for (let s of successors) {
        if (!deleted[s]) {
            successorsDeleted = true;
            deleted[s] = true;
        }
    }
    let canDeleteFurther = false;
    for (let i = 0; i < nums.length; i++) {
        // O(n) time
        if (!deleted[i]) {
            canDeleteFurther = true;
            let points = dfs(i, deleted, nums, values);
            maxLocalPoints = Math.max(maxLocalPoints, points);
        }
    }
    // Undo deletions for next DFS
    if (predecessorsDeleted) {
        for (let p of predecessors) {
            deleted[p] = false;
        }
    }

    if (successorsDeleted) {
        for (let s of successors) {
            deleted[s] = false;
        }
    }
    deleted[idx] = false;


    if (!canDeleteFurther) {
        return nums[idx];
    }
    return nums[idx] + maxLocalPoints;
}

console.log(deleteAndEarn([3, 4, 2]))
console.log(deleteAndEarn([2, 2, 3, 3, 3, 4]))