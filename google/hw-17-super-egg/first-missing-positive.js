// https://leetcode.com/problems/first-missing-positive/
function firstMissingPositive(nums) {
    return firstMissingPositiveModifyArray(nums);
}

function firstMissingPositiveModifyArray(nums) {
    let n = nums.length;
    for (let i = 0; i < nums.length; i++) { // O(n)
        while ((nums[i] !== i + 1) && nums[i] !== null) {
            if (nums[i] <= 0 || nums[i] > n) {
                nums[i] = null;
            } else {
                if (nums[nums[i] - 1] === nums[i]) nums[nums[i] - 1] = null;
                let aux = nums[i];
                nums[i] = nums[nums[i] - 1];
                nums[aux - 1] = aux;
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (nums[i] === null) return i + 1;
    }
    return n + 1;
}

function firstMissingPositiveNoMapOnlyOneMissing(nums) {
    let max = Math.max(...nums);
    let sumPositive = 0;

    for (let num of nums) {
        if (num > 0) sumPositive += num;
    }
    if (sumPositive === 0) return 1;
    let sumToMax = parseInt((max * (max + 1)) / 2);
    if (sumToMax === sumPositive) return max + 1;
    return sumToMax - sumPositive;
}

function firstMissingPositiveWithMap(nums) {
    // Time: O(N)
    // Space: O(N)
    let map = {};
    let max = Math.max(...nums);
    for (let num of nums) {
        map[num] = 1;
    }

    for (let i = 1; i <= max + 1; i++) {
        if (!map[i]) {
            return i;
        }
    }
    return 1;
}

console.log(firstMissingPositive([1, 2, 0]));
console.log(firstMissingPositive([3, 4, -1, 1]));
console.log(firstMissingPositive([7, 8, 9, 11, 12]));
console.log(firstMissingPositive([1, 1]));