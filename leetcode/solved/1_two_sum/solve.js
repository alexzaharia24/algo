const twoSum = (nums, target) => {
    return twoSumOneFor(nums, target);
}

const twoSumTwoFors = (nums, target) => {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], i);
    }

    for (let i = 0; i < nums.length; i++) {
        const pairIndex = map.get(target - nums[i]);
        if (pairIndex && pairIndex !== i) {
            return [i, pairIndex];
        }
    }

    throw new Error("There must always be exactly one solution");
};

const twoSumOneFor = (nums, target) => {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const j = map.get(target - nums[i]);
        if (j != null) {
            return [j, i];
        }

        map.set(nums[i], i);
    }

    throw new Error("There must always be exactly one solution");
};


let nums = [2, 7, 11, 15], target = 9;
/* eslint-disable */
console.log(twoSum(nums, target));
nums = [3, 2, 4], target = 6
console.log(twoSum(nums, target));
nums = [3, 3], target = 6
console.log(twoSum(nums, target));
nums = [2, 5, 5, 11], target = 10
console.log(twoSum(nums, target));