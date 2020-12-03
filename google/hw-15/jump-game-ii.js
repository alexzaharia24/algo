// https://leetcode.com/problems/jump-game-ii/

function jump(nums) {
    return jumpLinearCleanFromCocio(nums);
}

function jumpLinearCleanFromCocio(nums) {
    // Time: O(n)
    // Space: O(1)
    let cost = 0;
    let intervalStart = 0;
    let intervalEnd = 0;
    while (intervalEnd < nums.length - 1) {
        cost++;
        let newIntervalEnd = intervalEnd + 1;
        for (let i = intervalStart; i <= intervalEnd; i++) {
            newIntervalEnd = Math.max(newIntervalEnd, i + nums[i]);
        }
        intervalStart = intervalEnd + 1;
        intervalEnd = newIntervalEnd;
    }

    return cost;
}

function jumpLinear(nums) {
    // Time: O(n)
    // Space: O(n)
    // Idea: at a given point you have acess to an interval withing the array with a given cost. 
    // For array [2,3,1,1,4]:
    // You start with interval I=[0,0] and cost=0
    // at i=0: you have access to interval I = [1, 2] with cost = 1
    // at i=1: I=[3,4], cost=2. From i=1 we actually have access to [2,4], but for position 2 we would have cost of 2, but from i=1 we have access to position 2 with cost 1, so we exclude it from the current interval. We want to minimize costs to pozitions.
    // We stop the algo since we can reach the end position. It will have cost=2

    let I = [0, 0];
    if (nums.length === 1) return 0;

    let costLimits = []; // For ea ch cost remember the upper limit for which this cost applies to (the max position we can reach with this cost)
    costLimits.push(0);
    let currentCostLimitIdx = 0;

    for (let i = 0; (i < nums.length - 1) && (nums.length - 1 > I[1]); i++) {
        if (i > costLimits[currentCostLimitIdx]) { // Move to next cost if the current one does not apply anymore
            currentCostLimitIdx++;
        }
        if (nums[i] === 0) continue;
        let newInterval = [i + 1, i + nums[i]];
        let newCost = currentCostLimitIdx + 1;
        if (newInterval[1] <= I[1]) continue; // If new interval enclosed in current interval, ignore it
        if (newInterval[0] <= I[1]) // If new interval has a portion enclosed in current interval, ignore that portion and take the rest with new cost
            I = [I[1] + 1, newInterval[1]];
        else I = newInterval; // If new interval disjoint from the current interval then consider it completely with new cost
        costLimits[newCost] = I[1]; // Set upper limit for new cost
    }

    return costLimits.length - 1;
}

function jumpDP(nums) {
    // Time: O(n^2)
    // Space: O(n)
    // dp[i] = length of min path from beginning to position i
    // dp[i+1] = Math.min(dp[i] + 1, dp[i]) if dp[i] !== Inf

    let dp = new Array(nums.length).fill(Infinity);
    dp[0] = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        if (dp[i] !== Infinity) { // this position can be reached
            for (let j = i + 1; (j <= i + nums[i]) && j < nums.length; j++) {
                dp[j] = Math.min(dp[i] + 1, dp[j]);
            }
        }
    }
    return dp[nums.length - 1];
}


// console.log(jump([2, 3, 1, 1, 4]));
console.log(jump([7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3]))