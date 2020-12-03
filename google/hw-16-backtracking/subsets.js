// https://leetcode.com/problems/subsets/

function subsets(nums) {
    let powerSet = [[]];
    generateSubsets(nums, 0, [], powerSet);
    return powerSet;
}

function generateSubsets(nums, idx, subset, powerSet) {
    // Time: Exponential (close to O(n!)) = O(nr of subsets)
    // Space: Same
    if (subset.length > 0) {
        powerSet.push([...subset]);
    }
    for (let i = idx; i < nums.length; i++) {
        subset.push(nums[i]);
        generateSubsets(nums, i+1, subset, powerSet);
        subset.pop();
    }
}

console.log(subsets([1,2,3,4]))