// https://leetcode.com/problems/minimum-size-subarray-sum/

function minSubArrayLen(s, nums) {
    return solveWithBinarySearch(s, nums);
}

function solveWithTwoPointers(s, nums) {
    // O(n) time
    // O(1) space
    if (nums.length === 0) return 0;
    let i = 0, j = 0, minLength = nums.length + 1;
    let sum = nums[i];
    while (j < nums.length) {
        while (sum >= s && i <= j) {
            minLength = Math.min(minLength, j - i + 1);
            sum -= nums[i];
            i++;
        }

        j++;
        sum += nums[j];
    }

    if (minLength === nums.length + 1) minLength = 0;
    return minLength;
}

function binarySearch(s, nums, start, partialSums) {
    let left = start, right = nums.length - 1;
    let result = -1;
    while (left <= right) {
        let middle = parseInt((left + right) / 2);
        let sum = getSum(start, middle, partialSums);
        // console.log(left, middle, sum);
        if (sum >= s) {
            right = middle - 1;
            result = middle;
        } else {
            left = middle + 1;
        }
    }
    return result;
}

function getSum(i, j, partialSums) {
    if (i === 0) return partialSums[j];
    return partialSums[j] - partialSums[i - 1];
}

function solveWithBinarySearch(s, nums) {
    // O(n*log(n)) time
    // O(n) space

    let minLength = nums.length + 1;
    let partialSums = [];
    partialSums[0] = nums[0];
    for (let i = 1; i < nums.length; i++) {
        partialSums[i] = partialSums[i - 1] + nums[i];
    }


    for (let i = 0; i < nums.length; i++) {
        let j = binarySearch(s, nums, i, partialSums); // the leftmost element that minimisez the subarray length which has sum >= s
        if (j === -1) break; // No possible subarray that meets the condition
        minLength = Math.min(minLength, j - i + 1);
    }

    if (minLength === nums.length + 1) minLength = 0;
    return minLength;
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
console.log(minSubArrayLen(3, [1, 1]));