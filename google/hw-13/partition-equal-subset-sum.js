// https://leetcode.com/problems/partition-equal-subset-sum/

function canPartition(nums) {
    return canPartitionDP_2D(nums);
}

function canPartitionDP_2D(nums) {
    // Time: O(n*maxSum/2)
    // Space: O(n*maxSum/2)
    // dp[i][j] = true / false if the first i+1 elements have a sum of j. Same approach as DP_3D, just this time we need only one sum that will be equal to maxSum/2, since the other one is the complement of it. 
    // dp[i][j] = true if we can add the current number to the left or right partition of a previous result that was true, which is dp[i-1][j-nums[i]] (add to left partition) or dp[i-1][j] (add to right partition)
    // j can be seen as the sum of the left partition.

    if (nums.length === 0) return true;
    if (nums.length === 1) return false;

    let maxSum = 0;
    for (let x of nums) {
        maxSum += x;
    }
    if (maxSum % 2 === 1) return false;
    let dp = new Array(nums.length)
        .fill()
        .map(
            () => new Array(maxSum / 2 + 1)
                .fill(false)
        );

    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j <= maxSum / 2; j++) {
            let leftPartitionSum = false, rightPartitionSum = false;
            if (i - 1 < 0) {
                if (j === nums[i] || j === 0) {
                    dp[i][j] = true;
                }
            }
            else {
                if ((j - nums[i]) >= 0) leftPartitionSum = dp[i - 1][j - nums[i]]; // Verify if we can add the number to the left partition
                rightPartitionSum = dp[i - 1][j]; // Verify if we can add the number to the right partition and

                dp[i][j] = leftPartitionSum || rightPartitionSum;
            }

        }
    }

    return dp[nums.length - 1][maxSum / 2]; // Verify if we obtained the sums j === maxSum/2 which will guarantee that the left and the right partition will have the sum sum
}

function canPartitionDP_3D(nums) {
    // Time: O(n*maxSum*maxSum) - n=size of nums
    // Space: O(n*maxSum*maxSum)
    // (!) Space too large: O(n*maxSum*maxSum), n - size of nums, maxSum up to 2*10^4 => total space = 200 * 2 * 10^8 = 4 * 10 ^ 10  ~= 40GB. Won't fit in memory
    // dp[i][j][k] = true / false if we can obtain 2 sums from the first i+1 elements
    // dp[i][j][k] = dp[i][j-nums[i]][k] || dp[i][j][k-nums[i]] - if we can reach a sum j or k from j-nums[i] or k-nums[i] then we can reach these sums by adding nums[i] to the left partition or right partition

    if (nums.length === 0) return true;
    if (nums.length === 1) return false;

    let maxSum = 0;
    for (let x of nums) {
        maxSum += x;
    }
    if (maxSum % 2 === 1) return false;
    let dp = new Array(nums.length)
        .fill()
        .map(
            () => new Array(maxSum + 1)
                .fill()
                .map(() => new Array(maxSum + 1).fill(false))
        );

    for (let i = 0; i < nums.length; i++) {

        for (let j = 0; j <= maxSum; j++) {
            for (let k = 0; k <= maxSum; k++) {
                let leftPartitionSum = false, rightPartitionSum = false;
                if (i - 1 < 0) {
                    if ((j === nums[i] && k === 0) || (j === 0 && k === nums[i])) {
                        dp[i][j][k] = true;
                    }
                }
                else {
                    if ((j - nums[i]) >= 0) leftPartitionSum = dp[i - 1][j - nums[i]][k]; // Verify if we can obtain the j sum
                    if ((k - nums[i]) >= 0) rightPartitionSum = dp[i - 1][j][k - nums[i]]; // Verify if we can obtain the k sum

                    dp[i][j][k] = leftPartitionSum || rightPartitionSum;
                }

            }
        }
    }

    if (dp[nums.length - 1][maxSum / 2][maxSum / 2]) { // Verify if we obtained the sums j === k on the last "row", which includes all the elements from nums => We verify if there are two partitions that contain combined all the elements in nums and have the same sum
        return true;
    }
    return false;
}

console.log(canPartition([1, 1])); // true
console.log(canPartition([1, 5, 11, 5])); // true
console.log(canPartition([1, 10, 11])); // true
console.log(canPartition([1, 0, 1, 0])); // true
console.log(canPartition([1, 0, 1])); // true
console.log(canPartition([0, 0, 1])); // false
console.log(canPartition([3, 0])); // false
console.log(canPartition([1, 0])); // false