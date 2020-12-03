// https://leetcode.com/problems/search-in-rotated-sorted-array/

function binarySearchPivot(nums) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        let middle = parseInt((left + right) / 2);
        if (middle > 0 && nums[middle] < nums[middle - 1]) {
            return middle;
        } else if (nums[middle] > nums[nums.length - 1]) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return -1;
}

function binarySearchTarget(nums, start, end, target) {
    let left = start, right = end;
    while (left <= right) {
        let middle = parseInt((left + right) / 2);
        if (nums[middle] === target) return middle;
        else if (nums[middle] > target) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }

    return -1;
}

function search(nums, target) {
    // O (logn) time
    // O(1) space
    let pivot = binarySearchPivot(nums);
    if (pivot === -1) binarySearchTarget(nums, 0, nums.length - 1, target)

    let leftSearch = binarySearchTarget(nums, 0, pivot - 1, target);
    if (leftSearch !== -1) return leftSearch;

    let rightSearch = binarySearchTarget(nums, pivot, nums.length - 1, target);
    return rightSearch;

}

console.log(search([4,5,6,7,0,1,2], 0));
console.log(search([4,5,6,7,0,1,2], 3));