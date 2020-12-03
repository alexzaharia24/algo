// https://leetcode.com/problems/search-insert-position/submissions/
function binarySearch(nums, target) {
    // O(logn) time
    // O(1) space
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        let middle = parseInt(left + (right - left) / 2);
        if (nums[middle] === target) return middle;
        else if (target < nums[middle]) {
            right = middle - 1;
        }
        else {
            left = middle + 1;
        }
    }

    return left;
}

function searchInsert(nums, target) {
    return binarySearch(nums, target);
}

console.log(searchInsert([1,3,5,6], 5));
console.log(searchInsert([1,3,5,6], 2));
console.log(searchInsert([1,3,5,6], 7));
console.log(searchInsert([1,3,5,6], 0));