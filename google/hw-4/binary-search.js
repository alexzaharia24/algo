// https://leetcode.com/problems/binary-search/
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

    return -1;
}

function search(nums, target) {
    return binarySearch(nums, target);
}

console.log(binarySearch([-1,0,3,5,9,12], 9))
console.log(binarySearch([-1,0,3,5,9,12], 2))