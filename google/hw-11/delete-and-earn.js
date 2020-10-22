// https://leetcode.com/problems/delete-and-earn/

function deleteAndEarn(nums) {
    return deleteAndEarnDP(nums);
}

function deleteAndEarnDP(nums) {
    if (nums.length == 0) return 0;
    let values = [];
    let multiplicity = {};

    for (let i = 0; i < nums.length; i++) {
        if (!(nums[i] in multiplicity)) {
            values.push(nums[i]);
            multiplicity[nums[i]] = 1;
        } else {
            multiplicity[nums[i]]++;
        }
    }
    values = values.sort((a,b) => a-b);

    let dp = new Array(values.length).fill();
    // dp[i] is max nr of points up until position i
    dp[0] = values[0] * multiplicity[values[0]];
    let maxPoints = dp[0];
    for (let i = 1; i < values.length; i++) {
        let prevIndex1, prevIndex2;
        if (values[i - 1] !== (values[i] - 1)) {
            // if previous element is different than values[i]-1 then it was visited before this element => we can use its result
            prevIndex1 = i - 1;
            prevIndex2 = i - 2;
        } else {
            prevIndex1 = i - 2;
            prevIndex2 = i - 3;
        }
        dp[i] = Math.max(dp[prevIndex1] || 0, dp[prevIndex2] || 0) + (values[i] * multiplicity[values[i]]);
        maxPoints = Math.max(dp[i], maxPoints);
    }
    console.log(dp);
    return maxPoints;
}

function deleteAndEarnBrute(nums) {
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

// console.log(deleteAndEarn([3, 4, 2])) // 6 expected
// console.log(deleteAndEarn([2, 2, 3, 3, 3, 4])) // 9 expected
// console.log(deleteAndEarn([8, 10, 4, 9, 1, 3, 5, 9, 4, 10])) // 37 expected
console.log(deleteAndEarn([3,3,3,4,2])) // 9 expected