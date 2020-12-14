// https://leetcode.com/problems/subsets-ii/

function subsetsWithDup(nums) {
    // Time: exponential = O(nr of subsets). The sorting is neglijable
    // Space: same
    let subsets = {};
    nums.sort()
    generateSubsets(nums, 0, [], subsets);

    return Object.values(subsets);
}

function generateSubsets(nums, idx, subset, subsets) {
    subsets[subset] = [...subset];
    if (idx > nums.length) return;

    for (let i = idx; i < nums.length; i++) {
        subset.push(nums[i]);
        generateSubsets(nums, i + 1, subset, subsets);
        subset.pop();
    }
}

console.log(subsetsWithDup([4, 4, 4, 1, 4]));

function x(n) {
    let subsets = [];
    for (let i = 1; i < (1 << n); i++) {
        let curr = [];
        for (let j = 0; j < n; j++) {
            if ((1 << j) & i) {
                curr.push(j + 1);
            }
        }
        subsets.push(curr);
    }
    return subsets;
}

console.log(x(5))