// https://leetcode.com/problems/target-sum/


function findTargetSumWays(nums, S) {
    // Time: O(m*n), where m=max possible sum, n=nr of elements, in this case m = 1000
    // Space: O(m*n)
    if (nums.length === 0) return 0;
    let dp = new Array(nums.length + 1).fill()
        .map(() => new Map());

    dp[1].set(nums[0], nums[0] === 0 ? 2 : 1);
    dp[1].set(-nums[0], -nums[0] === 0 ? 2 : 1);

    for (let i = 1; i <= nums.length; i++) {
        let nrOfElementsInSum = i + 1;
        for (let j = 0; j <= 1000; j++) {
            let value = (dp[nrOfElementsInSum - 1].get(j - nums[i]) || 0) + (dp[nrOfElementsInSum - 1].get(j + nums[i]) || 0);
            if (value > 0) {
                dp[nrOfElementsInSum].set(j, value);
                dp[nrOfElementsInSum].set(-j, value);
            }
        }
    }

    return dp[nums.length].get(S) || 0;
}

function findTargetSumWaysMap(nums, S) {

    if (nums.length === 0) return 0;
    let dp = new Map();

    let arrayPositive = new Array(nums.length + 1).fill(0);
    let num = nums[0];
    arrayPositive[1] = num === 0 ? 2 : 1;

    dp.set(num, arrayPositive);

    let arrayNegative = new Array(nums.length + 1).fill(0);
    if (num === 0) {
        arrayNegative[1] = 2;
    } else {
        arrayNegative[1] = 1;
    }
    dp.set(-num, arrayNegative);

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j <= 2000; j++) {
            // Positive sum
            recurrence(dp, nums, i, j);
            // Negative sum
            recurrence(dp, nums, i, -j);
        }
    }

    // console.log(dp);
    if (dp.get(S) !== undefined) {
        return dp.get(S)[nums.length];
    }
    return 0;
}

function recurrence(dp, nums, i, sum) {
    let numsInSum = i + 1;
    // two options: -nums[i] or +nums[i]

    // +nums[i] action
    let prevWaysArray = dp.get(sum - nums[i]); // The sum j - nums[i] was previously obtained
    let nrOfWays = 0;
    if (prevWaysArray !== undefined) {
        nrOfWays += prevWaysArray[numsInSum - 1]; // We can obtain the sum from the previous sum
    }

    // -nums[i] action
    prevWaysArray = dp.get(sum + nums[i]); // The sum was previously obtained
    if (prevWaysArray !== undefined) {
        nrOfWays += prevWaysArray[numsInSum - 1]; // We can obtain the sum from the previous sum
    }

    let ways;
    if (dp.get(sum) === undefined) {
        dp.set(sum, new Array(nums.length + 1).fill(0));
    }

    ways = dp.get(sum);
    ways[numsInSum] = nrOfWays;
    dp.set(sum, ways);
}

console.log(findTargetSumWays([1, 1, 1, 1, 1], 3));
// console.log(findTargetSumWays([0, 0, 0, 0, 0, 0, 0, 0, 1], 1));